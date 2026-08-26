#!/usr/bin/env python3

"""
Extract move objects from a compiled Showdown/Cobblemon moves.js file
and write them as individual Cobblemon datapack move-effect files.

Input example:

    const Moves = {
      abyssallure: {
        num: 3000,
        accuracy: 100,
        ...
      },
      acesplay: {
        ...
      }
    };

Output:

    output/
      abyssallure.js
      acesplay.js

Each output file contains:

{
  accuracy: 100,
  basePower: 70,
  ...
}

This matches the format documented by Cobblemon:
https://wiki.cobblemon.com/index.php/Datapackable_Move_Effects
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path


# ---------------------------------------------------------------------------
# JavaScript parsing helpers
# ---------------------------------------------------------------------------

def find_matching_brace(text: str, opening: int) -> int:
    """
    Find the closing } matching the { at `opening`.

    Handles:
      - strings
      - escaped characters
      - // comments
      - /* */ comments
      - nested objects
      - nested functions
    """

    if text[opening] != "{":
        raise ValueError("opening must point at '{'")

    depth = 0
    i = opening
    in_string = None
    in_line_comment = False
    in_block_comment = False
    escaped = False

    while i < len(text):
        char = text[i]
        next_char = text[i + 1] if i + 1 < len(text) else ""

        # Line comment
        if in_line_comment:
            if char == "\n":
                in_line_comment = False
            i += 1
            continue

        # Block comment
        if in_block_comment:
            if char == "*" and next_char == "/":
                in_block_comment = False
                i += 2
                continue
            i += 1
            continue

        # String
        if in_string:
            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == in_string:
                in_string = None

            i += 1
            continue

        # Start comment
        if char == "/" and next_char == "/":
            in_line_comment = True
            i += 2
            continue

        if char == "/" and next_char == "*":
            in_block_comment = True
            i += 2
            continue

        # Start string
        if char in ('"', "'", "`"):
            in_string = char
            i += 1
            continue

        # Braces
        if char == "{":
            depth += 1

        elif char == "}":
            depth -= 1

            if depth == 0:
                return i

        i += 1

    raise ValueError("Could not find matching closing brace")


def find_moves_object(text: str) -> tuple[int, int]:
    return find_data_object(text, "Moves")

def find_abilities_object(text: str) -> tuple[int, int]:
    return find_data_object(text, "Abilities")

def load_data_entries(
        input_file: Path,
        object_name: str,
):
    """
    Load entries from a JavaScript data object such as
    Moves or Abilities.
    """

    text = input_file.read_text(
        encoding="utf-8"
    )

    start, end = find_data_object(
        text,
        object_name,
    )

    data_object = text[start:end + 1]

    return find_top_level_properties(
        data_object
    )


def find_data_object(text: str, object_name: str) -> tuple[int, int]:
    """
    Find:

        const <object_name> = {
            ...
        };

    Returns the opening and closing brace positions.
    """

    pattern = re.compile(
        rf"\b(?:const|let|var)\s+{re.escape(object_name)}\s*=\s*\{{"
    )

    match = pattern.search(text)

    if not match:
        raise ValueError(
            f"Could not find `{object_name}` object"
        )

    opening = text.find("{", match.start())

    closing = find_matching_brace(
        text,
        opening,
    )

    return opening, closing

def find_top_level_properties(object_text: str):
    """
    Extract top-level properties from a JavaScript object.

    Supports property names in both forms:

        tackle: {
            ...
        }

    and:

        "10000000voltthunderbolt": {
            ...
        }

    Also handles nested objects, strings, comments, and functions.
    """

    properties = []

    content = object_text[1:-1]
    length = len(content)
    i = 0

    while i < length:

        # ------------------------------------------------------------
        # Skip whitespace, commas and comments
        # ------------------------------------------------------------

        while i < length:
            if content[i].isspace() or content[i] == ",":
                i += 1
                continue

            # // comment
            if (
                    content[i] == "/"
                    and i + 1 < length
                    and content[i + 1] == "/"
            ):
                i += 2

                while i < length and content[i] != "\n":
                    i += 1

                continue

            # /* comment */
            if (
                    content[i] == "/"
                    and i + 1 < length
                    and content[i + 1] == "*"
            ):
                i += 2

                while i + 1 < length:
                    if (
                            content[i] == "*"
                            and content[i + 1] == "/"
                    ):
                        i += 2
                        break

                    i += 1

                continue

            break

        if i >= length:
            break

        # ------------------------------------------------------------
        # Parse property name
        # ------------------------------------------------------------

        if content[i] in ('"', "'", "`"):
            quote = content[i]
            i += 1

            name_chars = []
            escaped = False

            while i < length:
                char = content[i]

                if escaped:
                    name_chars.append(char)
                    escaped = False

                elif char == "\\":
                    escaped = True

                elif char == quote:
                    i += 1
                    break

                else:
                    name_chars.append(char)

                i += 1

            name = "".join(name_chars)

        else:
            start = i

            while i < length and (
                    content[i].isalnum()
                    or content[i] in "_-$"
            ):
                i += 1

            name = content[start:i]

        if not name:
            raise ValueError(
                "Could not parse property name near:\n"
                + content[
                    max(0, i - 150):
                    min(length, i + 150)
                ]
            )

        # ------------------------------------------------------------
        # Find colon
        # ------------------------------------------------------------

        while i < length and content[i].isspace():
            i += 1

        if i >= length or content[i] != ":":
            raise ValueError(
                f"Expected ':' after property `{name}`"
            )

        i += 1

        # ------------------------------------------------------------
        # Find opening brace
        # ------------------------------------------------------------

        while i < length and content[i].isspace():
            i += 1

        if i >= length or content[i] != "{":
            raise ValueError(
                f"Expected '{{' after property `{name}`"
            )

        opening = i
        closing = find_matching_brace(
            content,
            opening,
        )

        move_object = content[
            opening:closing + 1
        ]

        properties.append(
            (name, move_object)
        )

        i = closing + 1

    return properties

# ---------------------------------------------------------------------------
# JavaScript transformations
# ---------------------------------------------------------------------------

def remove_comments(text: str) -> str:
    """
    Remove JavaScript comments while preserving strings.

    Cobblemon's documentation specifies that datapack effect files
    should not contain comments.
    """

    output = []

    i = 0
    length = len(text)

    in_string = None
    escaped = False

    while i < length:
        char = text[i]
        next_char = text[i + 1] if i + 1 < length else ""

        if in_string:
            output.append(char)

            if escaped:
                escaped = False
            elif char == "\\":
                escaped = True
            elif char == in_string:
                in_string = None

            i += 1
            continue

        if char in ('"', "'", "`"):
            in_string = char
            output.append(char)
            i += 1
            continue

        # // comment
        if char == "/" and next_char == "/":
            i += 2

            while i < length and text[i] != "\n":
                i += 1

            continue

        # /* comment */
        if char == "/" and next_char == "*":
            i += 2

            while i + 1 < length:
                if text[i] == "*" and text[i + 1] == "/":
                    i += 2
                    break
                i += 1

            continue

        output.append(char)
        i += 1

    return "".join(output)

def build_num_lookup(moves):
    lookup = {}

    for move_id, move_object in moves:
        num = get_num(move_object)

        if num is not None:
            lookup[move_id] = num

    return lookup


def is_inherited(move_object: str) -> bool:
    return bool(
        re.search(
            r'\binherit\s*:\s*true\b',
            move_object,
        )
    )

def remove_inherit_true(move_object: str) -> str:
    pattern = re.compile(
        r"""
        (?m)
        ^[ \t]*inherit[ \t]*:[ \t]*true[ \t]*,[ \t]*\n?
        """,
        re.VERBOSE,
    )

    return pattern.sub("", move_object)

def build_num_lookup(moves):
    """
    Build:

        move_id -> num

    from a set of move definitions.
    """

    lookup = {}

    for move_id, move_object in moves:
        num = get_num(move_object)

        if num is not None:
            lookup[move_id] = num

    return lookup

def get_num(move_object: str) -> int | None:
    """
    Extract the `num` field from a move object.
    """

    match = re.search(
        r'\bnum\s*:\s*(-?\d+)',
        move_object,
    )

    if not match:
        return None

    return int(match.group(1))

def remove_inherit_true(move_object: str) -> str:
    """
    Remove `inherit: true` from the object while preserving `num`.

    Example:

        {
          inherit: true,
          num: 3897,
          flags: { ... }
        }

    becomes:

        {
          num: 3897,
          flags: { ... }
        }
    """

    pattern = re.compile(
        r"""
        (?m)
        ^[ \t]*inherit[ \t]*:[ \t]*true[ \t]*,[ \t]*\n?
        """,
        re.VERBOSE,
    )

    return pattern.sub("", move_object)

def remove_move_name_property(
    move_object: str,
    move_id: str,
) -> str:
    """
    Currently we KEEP the `name` property.

    Cobblemon's documentation specifically shows `name` as part of
    the datapackable move object, so this function exists mainly as
    an explicit place to change behavior later if needed.
    """

    return move_object


def format_move(move_object: str) -> str:
    """
    Format the extracted object as a standalone Cobblemon JS effect.
    """

    move_object = remove_comments(move_object)
    move_object = move_object.strip()

    # Normalize trailing whitespace.
    lines = [line.rstrip() for line in move_object.splitlines()]

    # Remove unnecessary leading/trailing blank lines.
    while lines and not lines[0].strip():
        lines.pop(0)

    while lines and not lines[-1].strip():
        lines.pop()

    return "{\n" + "\n".join(lines[1:-1]) + "\n}\n"


def validate_filename(move_id: str) -> None:
    """
    Cobblemon allows only:
        a-z
        0-9
        -
        _
    """

    if not re.fullmatch(r"[a-z0-9_-]+", move_id):
        raise ValueError(
            f"Invalid move ID `{move_id}`. "
            "Expected only a-z, 0-9, '-' or '_'."
        )


# ---------------------------------------------------------------------------
# Main extraction
# ---------------------------------------------------------------------------

def extract_abilities(
        input_file: Path,
        num_source_file: Path,
        output_directory: Path,
        *,
        overwrite: bool = False,
) -> None:

    # ================================================================
    # Load modified abilities
    # ================================================================

    abilities = load_data_entries(
        input_file,
        "Abilities",
    )

    # ================================================================
    # Load original abilities
    # ================================================================

    print(
        f"Reading ability num source: "
        f"{num_source_file}"
    )

    original_abilities = load_data_entries(
        num_source_file,
        "Abilities",
    )

    # ================================================================
    # Build ability ID -> num lookup
    # ================================================================

    num_lookup = build_num_lookup(
        original_abilities
    )

    print(
        f"Loaded {len(num_lookup)} ability numbers "
        f"from {num_source_file}"
    )

    # ================================================================
    # Create output directory
    # ================================================================

    output_directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    print(
        f"Found {len(abilities)} modified abilities."
    )

    # ================================================================
    # Write abilities
    # ================================================================

    for ability_id, ability_object in abilities:

        validate_filename(ability_id)

        inherited = is_inherited(
            ability_object
        )

        if inherited:

            num = num_lookup.get(
                ability_id
            )

            if num is None:
                print(
                    f"WARNING: {ability_id} has "
                    f"inherit: true but no num was "
                    f"found in {num_source_file}"
                )

                ability_object = (
                    remove_inherit_true(
                        ability_object
                    )
                )

            else:

                ability_object = (
                    remove_inherit_true(
                        ability_object
                    )
                )

                ability_object = ability_object.replace(
                    "{",
                    f"{{\n  num: {num},",
                    1,
                )

                print(
                    f"  {ability_id}: "
                    f"inherited -> num {num}"
                )

        output = format_move(
            ability_object
        )

        destination = (
                output_directory /
                f"{ability_id}.js"
        )

        if (
                destination.exists()
                and not overwrite
        ):
            print(
                f"SKIP  {ability_id}: "
                f"{destination} already exists"
            )
            continue

        destination.write_text(
            output,
            encoding="utf-8",
        )

        print(
            f"WRITE {destination}"
        )


def extract_moves(
    input_file: Path,
    num_source_file: Path,
    output_directory: Path,
    *,
    overwrite: bool = False,
) -> None:

    # ================================================================
    # Read modified moves
    # ================================================================

    moves = load_data_entries(
        input_file,
        "Moves",
    )

    num_moves = load_data_entries(
        num_source_file,
        "Moves",
    )

    # ================================================================
    # Build move ID -> num lookup
    # ================================================================

    num_lookup = build_num_lookup(num_moves)

    print(
        f"Loaded {len(num_lookup)} move numbers "
        f"from {num_source_file}"
    )

    # ================================================================
    # Output
    # ================================================================

    output_directory.mkdir(
        parents=True,
        exist_ok=True,
    )

    print(f"Found {len(moves)} modified moves.")

    for move_id, move_object in moves:

        validate_filename(move_id)

        inherited = is_inherited(move_object)

        # ------------------------------------------------------------
        # Inherited move
        # ------------------------------------------------------------

        if inherited:

            num = num_lookup.get(move_id)

            if num is None:
                print(
                    f"WARNING: {move_id} has inherit: true "
                    f"but no num was found in {num_source_file}"
                )

                # Still remove inherit and write the file.
                move_object = remove_inherit_true(
                    move_object
                )

            else:
                # Remove inherit:true
                move_object = remove_inherit_true(
                    move_object
                )

                # Add the original move number.
                move_object = move_object.replace(
                    "{",
                    f"{{\n  num: {num},",
                    1,
                )

                print(
                    f"  {move_id}: inherited -> num {num}"
                )

        # ------------------------------------------------------------
        # Normal move
        # ------------------------------------------------------------

        else:
            # Nothing special required.
            pass

        # ------------------------------------------------------------
        # Format
        # ------------------------------------------------------------

        output = format_move(move_object)

        destination = (
            output_directory /
            f"{move_id}.js"
        )

        if destination.exists() and not overwrite:
            print(
                f"SKIP  {move_id}: "
                f"{destination} already exists"
            )
            continue

        destination.write_text(
            output,
            encoding="utf-8",
        )

        print(f"WRITE {destination}")

# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description=(
            "Convert Showdown data into "
            "Cobblemon datapack files."
        )
    )

    subparsers = parser.add_subparsers(
        dest="type",
        required=True,
    )

    # ================================================================
    # Moves
    # ================================================================

    moves_parser = subparsers.add_parser(
        "moves",
        help="Convert moves",
    )

    moves_parser.add_argument(
        "input",
        type=Path,
    )

    moves_parser.add_argument(
        "num_source",
        type=Path,
    )

    moves_parser.add_argument(
        "output",
        type=Path,
    )

    moves_parser.add_argument(
        "--overwrite",
        action="store_true",
    )

    # ================================================================
    # Abilities
    # ================================================================

    abilities_parser = subparsers.add_parser(
        "abilities",
        help="Convert abilities",
    )

    abilities_parser.add_argument(
        "input",
        type=Path,
    )

    abilities_parser.add_argument(
        "num_source",
        type=Path,
    )

    abilities_parser.add_argument(
        "output",
        type=Path,
    )

    abilities_parser.add_argument(
        "--overwrite",
        action="store_true",
    )

    args = parser.parse_args()

    if args.type == "moves":

        extract_moves(
            args.input,
            args.num_source,
            args.output,
            overwrite=args.overwrite,
        )

    elif args.type == "abilities":

        extract_abilities(
            args.input,
            args.num_source,
            args.output,
            overwrite=args.overwrite,
        )

if __name__ == "__main__":
    main()

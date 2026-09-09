import pathlib, re
root = pathlib.Path(r'C:\Users\Stijn\Desktop\Showdown-modifications\common\src\main\resources\data\cobblemon\moves')

def strip_strings_and_comments(text):
    out = []
    i = 0
    n = len(text)
    in_str = None
    esc = False
    line_comment = False
    block_comment = False
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ''
        if in_str:
            if esc:
                esc = False
            elif c == '\\':
                esc = True
            elif c == in_str:
                in_str = None
            out.append(' ')
            i += 1
            continue
        if line_comment:
            if c == '\n':
                line_comment = False
                out.append('\n')
            i += 1
            continue
        if block_comment:
            if c == '*' and nxt == '/':
                block_comment = False
                i += 2
                continue
            if c == '\n':
                out.append('\n')
            i += 1
            continue
        if c == '/' and nxt == '/':
            line_comment = True
            i += 2
            continue
        if c == '/' and nxt == '*':
            block_comment = True
            i += 2
            continue
        if c in ('"', "'", '`'):
            in_str = c
            out.append(' ')
            i += 1
            continue
        out.append(c)
        i += 1
    return ''.join(out)

for p in sorted(root.glob('*.js')):
    text = p.read_text(encoding='utf-8')
    cleaned = strip_strings_and_comments(text)
    # find function bodies
    for m in re.finditer(r'([A-Za-z_$][A-Za-z0-9_$]*)\s*\(([^)]*)\)\s*\{', cleaned):
        name, params = m.group(1), m.group(2)
        body_start = m.end()
        depth = 1
        j = body_start
        while j < len(cleaned):
            if cleaned[j] == '{':
                depth += 1
            elif cleaned[j] == '}':
                depth -= 1
                if depth == 0:
                    body = cleaned[body_start:j]
                    break
            j += 1
        else:
            continue
        params_names = {part.strip().split('=')[0].strip() for part in params.split(',') if part.strip()}
        decls = set(re.findall(r'\b(?:const|let|var)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b', body))
        if 'move' in re.findall(r'\bmove\b', body) and 'move' not in params_names and 'move' not in decls:
            print(p.name, 'method:', name, 'params:', params)
            print('  body excerpt:', body[:200].replace('\n', ' '))

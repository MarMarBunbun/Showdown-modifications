{
    onModifyPriority(priority, pokemon, target, move) {
      if (move.flags["sound"] || move.type === "Sound") {
        return priority + 1;
      }
    },
    flags: {},
    name: "Freestyle",
    rating: 4,
    num: 3222
}

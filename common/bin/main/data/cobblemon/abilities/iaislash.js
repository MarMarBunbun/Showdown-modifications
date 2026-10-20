{
    onModifyPriority(priority, pokemon, target, move) {
      if (move.flags["slicing"]) {
        return priority + 1;
      }
    },
    flags: {},
    name: "Iai Slash",
    rating: 4,
    num: 3220
}

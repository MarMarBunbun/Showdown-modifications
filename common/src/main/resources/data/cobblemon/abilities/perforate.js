{
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Ghost"] = true;
      }
    },
    name: "Perforate",
    rating: 3,
    num: 3110
}

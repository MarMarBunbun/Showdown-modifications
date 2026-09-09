{
    onModifyCritRatio(critRatio, user, target, move) {
      if (!move) return critRatio;
      if (move.type === "Fire" || move.flags["slicing"]) {
        return critRatio + 2;
      }
      return critRatio;
    },

    onTryMove(pokemon, target, move) {
      if (move.category === "Status") {
        this.add('-fail', pokemon, 'move: From Beginning to End');
        return false;
      }
    },
    flags: {},
    name: "From Beginning to End",
    rating: 1.5,
    num: 3225
}

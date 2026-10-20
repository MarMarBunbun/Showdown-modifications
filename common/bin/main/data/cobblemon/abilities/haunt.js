{
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Ghost"] = true;
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "psychout" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Haunt", "[of] " + target);
      }
    },
    flags: {},
    name: "Haunt",
    rating: 3,
    num: 3075
}

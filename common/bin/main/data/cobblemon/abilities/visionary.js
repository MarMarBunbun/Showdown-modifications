{
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Psychic"] = true;
        move.ignoreImmunity["Normal"] = true;
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Psych Out" && boost.spa) {
        delete boost.spa;
        this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Visionary", "[of] " + target);
      }
    },
    name: "Visionary",
    rating: 3,
    num: 3162
}

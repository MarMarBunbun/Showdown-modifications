{
    onTryAddVolatile(status, pokemon) {
      if (status.id === "flinch")
        return null;
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Iron Will", "[of] " + target);
      }
    },
    flags: { breakable: 1 },
    name: "Iron Will",
    rating: 1,
    num: 3185
}

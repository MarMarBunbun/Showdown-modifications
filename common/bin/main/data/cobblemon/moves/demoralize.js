{
    num: 3096,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Demoralize",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onTryHit(target) {
      if (target.getAbility().isPermanent || target.ability === "defeatist") {
        return false;
      }
    },
    onHit(pokemon) {
      const oldAbility = pokemon.setAbility("defeatist");
      if (oldAbility) {
        this.add("-ability", pokemon, "Defeatist", "[from] move: Demoralize");
        return;
      }
      return oldAbility;
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
}

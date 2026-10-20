{
    num: 3066,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Construction Blocks",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, mustpressure: 1 },
    sideCondition: "constructionblocks",
    condition: {

      onSideStart(side) {
        this.add("-sidestart", side, "move: Construction Blocks");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("constructionblocks")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Plastic",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
}

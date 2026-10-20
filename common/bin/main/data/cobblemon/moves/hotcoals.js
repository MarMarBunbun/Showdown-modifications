{
    num: 3828,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hot Coals",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, mustpressure: 1 },
    sideCondition: "hotcoals",
    condition: {

      onSideStart(side) {
        this.add("-sidestart", side, "move: Hot Coals");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("hotcoals")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Fire",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
}

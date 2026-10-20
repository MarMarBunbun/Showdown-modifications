{
    num: 3441,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Velvet Scales",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1 },
    sideCondition: "velvetscales",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Velvet Scales");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        this.add("-activate", pokemon, "move: Velvet Scales");
        this.boost({ def: -1, spd: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove("velvetscales"));
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Dragon",
    zMove: { boost: { atk: 1 } },
    contestType: "Tough"
}

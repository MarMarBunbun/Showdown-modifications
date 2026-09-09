{
    num: 3342,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Scorched Ashes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1 },
    sideCondition: "scorchedashes",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Scorched Ashes");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        this.add("-activate", pokemon, "move: Scorched Ashes");
        this.boost({ atk: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove("scorchedashes"));
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Fire",
    zMove: { boost: { atk: 1 } },
    contestType: "Tough"
}

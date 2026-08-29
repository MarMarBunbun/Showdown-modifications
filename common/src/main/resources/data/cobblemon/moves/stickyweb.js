{
	flags: { reflectable: 1, metronome: 1 },
	condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Sticky Web");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        this.add("-activate", pokemon, "move: Sticky Web");
        this.boost({ spe: -1 }, pokemon, pokemon.side.foe.active[0], this.dex.getActiveMove("stickyweb"));
      }
    },
  num: 564,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Sticky Web",
  pp: 20,
  priority: 0,
  sideCondition: "stickyweb",
  secondary: null,
  target: "foeSide",
  type: "Bug",
  zMove: { boost: { spe: 1 } },
  contestType: "Tough",
}

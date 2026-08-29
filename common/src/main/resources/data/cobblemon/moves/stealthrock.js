{
	sideCondition: "stealthrock",
    condition: {

      onSideStart(side) {
        this.add("-sidestart", side, "move: Stealth Rock");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
  num: 446,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Stealth Rock",
  pp: 20,
  priority: 0,
  flags: { reflectable: 1, metronome: 1, mustpressure: 1 },
  secondary: null,
  target: "foeSide",
  type: "Rock",
  zMove: { boost: { def: 1 } },
  contestType: "Cool",
}

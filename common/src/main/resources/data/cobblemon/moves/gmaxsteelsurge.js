{
  num: 1,
	flags: {},
	condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: G-Max Steelsurge");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        const steelHazard = this.dex.getActiveMove("Stealth Rock");
        steelHazard.type = "Steel";
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(steelHazard), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    }
}

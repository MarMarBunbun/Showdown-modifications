{
  num: 446,
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
    }
}

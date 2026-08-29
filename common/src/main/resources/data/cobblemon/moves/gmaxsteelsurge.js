{
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
    },
  num: 1e3,
  accuracy: true,
  basePower: 10,
  category: "Physical",
  isNonstandard: "Gigantamax",
  name: "G-Max Steelsurge",
  pp: 5,
  priority: 0,
  isMax: "Copperajah",
  self: {
      onHit(source) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("gmaxsteelsurge");
        }
      }
    },
  secondary: null,
  target: "adjacentFoe",
  type: "Steel",
  contestType: "Cool",
}

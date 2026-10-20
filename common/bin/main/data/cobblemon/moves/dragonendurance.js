{
    num: 3111,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Dragon Endurance",
    pp: 15,
    priority: 0,
    flags: { nonsky: 1 },
    pseudoWeather: "dragonendurance",
    condition: {
      duration: 5,
      onFieldStart(field, source) {
        this.add("-fieldstart", "move: Dragon Endurance", "[of] " + source);
      },
      onBasePowerPriority: 1,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Electric" || move.type === "Fire" || move.type === "Grass" || move.type === "Water") {
          this.debug("dragon endurance weaken");
          return this.chainModify([1352, 4096]);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 3,
      onFieldEnd() {
        this.add("-fieldend", "move: Dragon Endurance");
      }
    },
    secondary: null,
    target: "all",
    type: "Dragon",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
}

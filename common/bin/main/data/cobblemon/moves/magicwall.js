{
    num: 3242,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Magic Wall",
    pp: 15,
    priority: 0,
    flags: { nonsky: 1, magic: 1 },
    pseudoWeather: "magicwall",
    condition: {
      duration: 5,
      onFieldStart(field, source) {
        this.add("-fieldstart", "move: Magic Wall", "[of] " + source);
      },
      onBasePowerPriority: 1,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Dragon" || move.type === "Fighting" || move.type === "Dark" || move.type === "Bug") {
          this.debug("magic wall weaken");
          return this.chainModify([1352, 4096]);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 3,
      onFieldEnd() {
        this.add("-fieldend", "move: Magic Wall");
      }
    },
    secondary: null,
    target: "all",
    type: "Fairy",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
}

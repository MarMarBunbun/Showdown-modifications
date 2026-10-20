{
    num: 3387,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Sound Barrier",
    pp: 15,
    priority: 0,
    flags: { nonsky: 1 },
    pseudoWeather: "soundbarrier",
    condition: {
      duration: 5,
      onFieldStart(field, source) {
        this.add("-fieldstart", "move: Sound Barrier", "[of] " + source);
      },
      onBasePowerPriority: 1,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Flying" || move.type === "Water" || move.type === "Fairy") {
          this.debug("sound barrier weaken");
          return this.chainModify([1352, 4096]);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 3,
      onFieldEnd() {
        this.add("-fieldend", "move: Sound Barrier");
      }
    },
    secondary: null,
    target: "all",
    type: "Sound",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
}

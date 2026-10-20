{
	flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1, legendary: 1 },
  num: 558,
  accuracy: 100,
  basePower: 100,
  category: "Special",
  name: "Fusion Flare",
  pp: 5,
  priority: 0,
  onBasePower(basePower, pokemon) {
      if (this.lastSuccessfulMoveThisTurn === "fusionbolt") {
        this.debug("double power");
        return this.chainModify(2);
      }
    },
  secondary: null,
  target: "normal",
  type: "Fire",
  contestType: "Beautiful",
}

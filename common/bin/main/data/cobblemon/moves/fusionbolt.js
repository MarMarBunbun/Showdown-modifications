{
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 },
  num: 559,
  accuracy: 100,
  basePower: 100,
  category: "Physical",
  name: "Fusion Bolt",
  pp: 5,
  priority: 0,
  onBasePower(basePower, pokemon) {
      if (this.lastSuccessfulMoveThisTurn === "fusionflare") {
        this.debug("double power");
        return this.chainModify(2);
      }
    },
  secondary: null,
  target: "normal",
  type: "Electric",
  contestType: "Cool",
}

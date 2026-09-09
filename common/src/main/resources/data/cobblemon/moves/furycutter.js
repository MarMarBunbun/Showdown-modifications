{
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, blade: 1 },
  num: 210,
  accuracy: 95,
  basePower: 40,
  category: "Physical",
  name: "Fury Cutter",
  pp: 20,
  priority: 0,
  condition: {
      duration: 2,
      onStart() {
        this.effectState.multiplier = 1;
      },
      onRestart() {
        if (this.effectState.multiplier < 4) {
          this.effectState.multiplier <<= 1;
        }
        this.effectState.duration = 2;
      }
    },
  secondary: null,
  target: "normal",
  type: "Bug",
  contestType: "Cool",
}

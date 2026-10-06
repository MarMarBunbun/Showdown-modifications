{
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
  num: 660,
  accuracy: 100,
  basePower: 90,
  category: "Physical",
  name: "First Impression",
  pp: 10,
  priority: 2,
  onTry(source) {
      if (source.activeMoveActions > 1) {
        this.hint("First Impression only works on your first turn out.");
        return false;
      }
    },
  secondary: null,
  target: "normal",
  type: "Bug",
  contestType: "Cute",
}

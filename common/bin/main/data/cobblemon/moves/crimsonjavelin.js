{
    num: 3753,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Crimson Javelin",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyPriority(priority, source, target, move) {
      if (target?.status) {
        return priority + 1;
      }
	},
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
}

{
    num: 3898,
    accuracy: 100,
    basePower: 160,
    category: "Physical",
    name: "Overcharge",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onHit(target, source) {
      source.trySetStatus("par", source);
    },
    secondary: null,
    target: "normal",
    type: "Electric"
}

{
    num: 3202,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Groom Guard",
    pp: 15,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spd: 3
    },
	onHit(target, source, move) {
      if (move.isZ) {
        source.side.addSideCondition("safeguard");
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    contestType: "Cute"
}

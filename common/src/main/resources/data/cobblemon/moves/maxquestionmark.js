{
    num: 3708,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Questionmark",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        const stats = ["atk", "def", "spa", "spd", "spe"];
		const statToLower = this.sample(stats);
		for (const pokemon of source.foes()) {
          this.boost({ [statToLower]: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Questionmark",
    contestType: "Cool"
}

{
    num: 3779,
    accuracy: 100,
    basePower: 155,
    category: "Physical",
    name: "Kablow!",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
	onHit(target, source, move) {
      if (!move.hasSheerForce) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
		  side.addSideCondition("toxicspikes");
        }
      }
    },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Steel",
    contestType: "Beautiful"
}

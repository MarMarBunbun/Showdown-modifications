{
    num: 3231,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Knight's Vow",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, distance: 1, bypasssub: 1, magic: 1 },
	self: {
      volatileStatus: "followme",
	  sideCondition: "luckychant"
    },
    onHit(target, source) {
      this.add("-activate", source, "move: Knight's Bow");
      let success = false;
      const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
      for (const ally of allies) {
        if (ally !== source)
          continue;
        if (ally.cureStatus())
          success = true;
      }
      return success;
    },
    target: "allyTeam",
    type: "Fairy",
    zMove: { effect: "heal" },
    contestType: "Beautiful"
}

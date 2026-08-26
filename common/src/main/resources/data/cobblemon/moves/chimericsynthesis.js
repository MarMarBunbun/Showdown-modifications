{
    num: 3740,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Chimeric Synthesis",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
	onHit(target, user) {

      if (!user.hasType("Blood")) {
        this.add("-fail", user, "move: Chimeric Synthesis");
        return null;
      }

      const newType = target.getTypes()[0];


      if (user.hasType(newType)) {
        this.add("-fail", user, "move: Chimeric Synthesis");
        return null;
      }


      if (!user.setType(newType)) {
        return false;
      }
      this.add("-start", user, "typechange", newType);


      const targetStats = target.baseStoredStats || target.storedStats || target.stats;
      if (!targetStats) return;

      const statMap = {
        atk: "atk",
        spa: "spa",
        def: "def",
        spd: "spd"
      };

      let highestStat = "atk";
      let highestValue = -1;

      for (const stat of Object.keys(statMap)) {
        const val = targetStats[stat];
        if (val > highestValue) {
          highestValue = val;
          highestStat = statMap[stat];
        }
      }


      this.boost({ [highestStat]: 1 }, user);
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
}

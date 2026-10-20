{
    num: 3026,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Basilisk's Glare",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, magic: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Rock" || !target.setType("Rock")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Rock");
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
}

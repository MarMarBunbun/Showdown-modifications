{
    num: 3486,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Plastic Seal",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Plastic" || !target.setType("Plastic")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Plastic");
    },
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
}

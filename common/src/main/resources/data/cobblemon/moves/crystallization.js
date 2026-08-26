{
    num: 3079,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Crystallization",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Crystal" || !target.setType("Crystal")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Crystal");
    },
    secondary: null,
    target: "normal",
    type: "Crystal",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
}

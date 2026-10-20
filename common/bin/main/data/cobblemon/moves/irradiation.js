{
    num: 3813,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Irradiation",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Nuclear" || !target.setType("Nuclear")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Nuclear");
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
}

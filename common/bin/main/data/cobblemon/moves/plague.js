{
    num: 3292,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Plague",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Bug" || !target.setType("Bug")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Bug");
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
}

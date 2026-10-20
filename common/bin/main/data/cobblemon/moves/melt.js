{
    num: 3695,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Melt",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
	onHit(target) {
      const newTypes = target.types.map(type => {

        if (type === "Ice") return "Water";

        if (type === "Steel") return "Normal";

        if (type === "Plastic") return "Poison";

        return type;
      });


      if (newTypes.join() === target.types.join()) {
        this.add("-fail", target);
        return null;
      }

      target.setType(newTypes);
      this.add("-start", target, "typechange", newTypes.join("/"));
	},
    secondary: null,
    target: "normal",
    type: "Fire",
    zMove: { boost: { spa: 1 } },
    contestType: "Tough"
}

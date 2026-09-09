{
    num: 3357,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shadow Hold",
    pp: 5,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    onHit(target, source, move) {
      return target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Shadow",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
}

{
    num: 3444,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Viscosity Slam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
}

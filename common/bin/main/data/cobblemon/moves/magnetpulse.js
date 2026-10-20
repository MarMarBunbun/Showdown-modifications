{
    num: 3247,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Magnet Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
    secondary: {
      chance: 30,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Tough"
}

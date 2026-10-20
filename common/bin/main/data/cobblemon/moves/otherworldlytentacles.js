{
    num: 3569,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Otherworldly Tentacles",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    onHit(target, source, move) {
      target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Tough"
}

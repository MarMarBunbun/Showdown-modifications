{
    num: 3264,
    accuracy: 90,
    basePower: 105,
    category: "Physical",
    name: "Move Mountains",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, legendary: 1 },
    self: {
      onHit(source) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("stealthrock");
        }
      }
    },
    secondary: null,

    target: "normal",
    type: "Rock"
}

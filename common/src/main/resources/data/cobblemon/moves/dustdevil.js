{
    num: 3128,
    accuracy: 80,
    basePower: 90,
    category: "Special",
    name: "Dust Devil",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1, powder: 1 },
    onEffectiveness(typeMod, target, type, move) {
      if (move.type !== "Ground")
        return;
      if (!target)
        return;
      if (!target.runImmunity("Ground")) {
        if (target.hasType("Flying"))
          return 0;
      }
    },
    ignoreImmunity: { "Ground": true },
    secondary: null,
    target: "normal",
    type: "Ground",
    zMove: { basePower: 180 },
    contestType: "Beautiful"
}

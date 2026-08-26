{
    num: 3680,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Regal Fang",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
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

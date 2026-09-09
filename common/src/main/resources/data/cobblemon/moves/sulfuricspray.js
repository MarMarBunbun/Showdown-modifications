{
    num: 3407,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Sulfuric Spray",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      if (move.type !== "Poison")
        return;
      if (!target)
        return;
      if (!target.runImmunity("Poison")) {
        if (target.hasType("Steel"))
          return 0;
      }
    },
    ignoreImmunity: { "PoOison": true },
    secondary: null,
    target: "normal",
    type: "POison",
    zMove: { basePower: 180 },
    contestType: "Beautiful"
}

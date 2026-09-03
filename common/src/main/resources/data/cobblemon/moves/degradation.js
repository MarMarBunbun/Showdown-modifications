{
    num: 3850,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Degradation",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Steel")
        return 1;
    },
	onHit(target, source, move) {
      if (!target.hasType("Steel")) return;
      if (this.randomChance(3, 10)) {
        if (target.status) return;
        const ignoreImmunity = move.id === "degradation";
        const canBePoisoned = ignoreImmunity || target.runStatusImmunity("psn");
        if (canBePoisoned) {
          target.setStatus("psn", source, move, ignoreImmunity);
        }
      }
    },
    flags: { protect: 1, mirror: 1 },
    ignoreImmunity: { "Poison": true, "Steel": true },
    secondary: null,
    target: "normal",
    type: "Poison",
    zMove: { basePower: 130},
    maxMove: { basePower: 130 },
    contestType: "Tough"
}

{
    num: 3536,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Rocket Drill Kick",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Steel", type);
    },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
}

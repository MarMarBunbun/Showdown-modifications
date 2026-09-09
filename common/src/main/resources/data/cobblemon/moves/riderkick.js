{
    num: 3460,
    accuracy: 90,
    basePower: 130,
    category: "Physical",
    name: "Rider Kick",
    pp: 10,
    priority: 0,
    flags: { recharge: 1, contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
	self: {
      volatileStatus: "mustrecharge"
    },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fighting", type);
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Cool"
}

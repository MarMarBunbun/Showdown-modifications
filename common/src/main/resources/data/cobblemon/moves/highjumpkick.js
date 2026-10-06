{
	flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
  num: 136,
  accuracy: 90,
  basePower: 130,
  category: "Physical",
  name: "High Jump Kick",
  pp: 10,
  priority: 0,
  hasCrashDamage: true,
  onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
  secondary: null,
  target: "normal",
  type: "Fighting",
  contestType: "Cool",
}

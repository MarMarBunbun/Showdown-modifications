{
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
  num: 853,
  accuracy: 90,
  basePower: 120,
  category: "Physical",
  name: "Axe Kick",
  pp: 10,
  priority: 0,
  hasCrashDamage: true,
  onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
  secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
  target: "normal",
  type: "Fighting",
}

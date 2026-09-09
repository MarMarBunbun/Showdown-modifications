{
    num: 3461,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Mighty Kick",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1, kick: 1 },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Fire"
}

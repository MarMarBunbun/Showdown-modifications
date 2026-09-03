{
    num: 3462,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Rising Impact",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
    hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
}

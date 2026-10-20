{
    num: 3468,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Light Touch",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onDamagePriority: -20,
    onDamage(damage, target, source, effect) {
      if (damage >= target.hp)
        return target.hp - 1;
    },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
}

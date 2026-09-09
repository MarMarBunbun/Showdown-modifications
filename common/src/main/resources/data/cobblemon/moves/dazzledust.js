{
    num: 3089,
    accuracy: 95,
    basePower: 0,
    damageCallback(pokemon, target) {
      return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
    },
    category: "Special",
    name: "Dazzle Dust",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, powder: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
}

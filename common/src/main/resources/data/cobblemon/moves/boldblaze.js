{
    num: 3668,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Bold Blaze",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, target) {
      if (target.hp * 2 <= target.maxhp) {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Tough"
}

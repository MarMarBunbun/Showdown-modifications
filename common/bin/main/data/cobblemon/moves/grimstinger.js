{
    num: 3201,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Grim Stinger",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, target) {
      if (target.status === "slp") {
        return this.chainModify(3);
      }
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
}

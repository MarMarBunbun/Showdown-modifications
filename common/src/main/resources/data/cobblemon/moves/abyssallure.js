{
    num: 3000,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Abyssal Lure",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        this.boost({ spa: 2 }, pokemon, pokemon, move);
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
}

{
    num: 3768,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Soul Rend",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, magic: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        this.boost({ atk: 1, spe: 1 }, pokemon, pokemon, move);
    },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Cool"
}

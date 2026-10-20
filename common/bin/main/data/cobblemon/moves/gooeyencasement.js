{
    num: 3773,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Gooey Encasement",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        this.boost({ def: 1, spd: 1 }, pokemon, pokemon, move);
    },
    secondary: null,
    target: "normal",
    type: "Slime",
    contestType: "Cool"
}

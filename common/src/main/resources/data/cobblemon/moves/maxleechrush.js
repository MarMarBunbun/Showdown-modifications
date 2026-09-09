{
    num: 3713,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Leechrush",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(target, source, move) {
        for (const pokemon of source.alliesAndSelf()) {
          this.heal(pokemon.maxhp / 6, pokemon, source, move);
        }
      }
    },
    target: "adjacentFoe",
    type: "Blood",
    contestType: "Cool"
}

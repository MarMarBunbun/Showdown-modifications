{
    num: 3208,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hawthorns",
    pp: 15,
    priority: 0,
    flags: { snatch: 1, mirror: 1 },
    sideCondition: "hawthorns",
    condition: {
      onSideStart(side) {
        this.add('-sidestart', side, 'move: Hawthorns');
      },
      onResidualOrder: 5,
      onResidual(side) {
        for (const pokemon of side.active) {
          if (pokemon && !pokemon.fainted) {
            this.heal(pokemon.baseMaxhp / 16, pokemon);
          }
        }
      },
      onSideEnd(side) {
        this.add('-sideend', side, 'move: Hawthorns');
      },
    },
    secondary: null,
    target: "allySide",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
}

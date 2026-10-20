{
    name: "Frost Orb",
    spritenum: 3176,
    fling: {
      basePower: 30,
      status: "fbt"
    },
    onResidualOrder: 28,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      pokemon.trySetStatus("fbt", pokemon);
    },
    num: 3176,
    gen: 4
}

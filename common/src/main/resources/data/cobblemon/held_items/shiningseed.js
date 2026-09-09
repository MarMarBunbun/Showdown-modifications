{
    name: "Shining Seed",
    spritenum: 3174,
    fling: {
      basePower: 10
    },
    onStart(pokemon) {
      if (!pokemon.ignoringItem() && this.field.isTerrain("shiningterrain")) {
        pokemon.useItem();
      }
    },
    onTerrainChange(pokemon) {
      if (this.field.isTerrain("shiningterrain")) {
        pokemon.useItem();
      }
    },
    boosts: {
      spd: 1
    },
    num: 3174,
    gen: 7
}

{
    name: "Snowy Seed",
    spritenum: 3172,
    fling: {
      basePower: 10
    },
    onStart(pokemon) {
      if (!pokemon.ignoringItem() && this.field.isTerrain("snowyterrain")) {
        pokemon.useItem();
      }
    },
    onTerrainChange(pokemon) {
      if (this.field.isTerrain("snowyterrain")) {
        pokemon.useItem();
      }
    },
    boosts: {
      spd: 1
    },
    num: 3172,
    gen: 7
}

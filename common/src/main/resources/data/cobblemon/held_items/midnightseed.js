{
    name: "Midnight Seed",
    spritenum: 3173,
    fling: {
      basePower: 10
    },
    onStart(pokemon) {
      if (!pokemon.ignoringItem() && this.field.isTerrain("midnightterrain")) {
        pokemon.useItem();
      }
    },
    onTerrainChange(pokemon) {
      if (this.field.isTerrain("midnightterrain")) {
        pokemon.useItem();
      }
    },
    boosts: {
      def: 1
    },
    num: 3173,
    gen: 7
}

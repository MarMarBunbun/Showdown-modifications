{
    onModifyCritRatio(relayVar, source, target, move) {
      if (this.field.isTerrain("grassyterrain")) {
        return relayVar + 2;
      }
    },
    flags: { breakable: 1 },
    name: "Jungle Fury",
    rating: 0.5,
    num: 3239
}

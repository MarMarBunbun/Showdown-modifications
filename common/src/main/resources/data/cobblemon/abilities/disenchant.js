{
    onTryHit(target, source, move) {
      if (move.type === "Fairy") {
        this.add("-immune", target, "[from] ability: Disenchant");
        return null;
      }
    },
    name: "Disenchant",
    rating: 2,
    num: 3047
}

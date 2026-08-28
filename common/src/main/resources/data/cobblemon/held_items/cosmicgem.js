{
    name: "Cosmic Gem",
    spritenum: 3111,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Cosmic" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3111,
    gen: 5,
    isNonstandard: "Past"
}

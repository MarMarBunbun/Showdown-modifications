{
    name: "Crystal Gem",
    spritenum: 3112,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Crystal" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3112,
    gen: 5,
    isNonstandard: "Past"
}

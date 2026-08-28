{
    name: "Wind Gem",
    spritenum: 3119,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Wind" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3119,
    gen: 5,
    isNonstandard: "Past"
}

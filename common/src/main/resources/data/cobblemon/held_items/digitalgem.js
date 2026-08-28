{
    name: "Digital Gem",
    spritenum: 3113,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Digital" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3113,
    gen: 5,
    isNonstandard: "Past"
}

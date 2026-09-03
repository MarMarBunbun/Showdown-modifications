{
    name: "Plastic Gem",
    spritenum: 3116,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Plastic" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3116,
    gen: 5,
    isNonstandard: "Past"
}

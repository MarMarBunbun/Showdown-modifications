{
    name: "Blood Gem",
    spritenum: 3121,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Blood" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3121,
    gen: 5,
    isNonstandard: "Past"
}

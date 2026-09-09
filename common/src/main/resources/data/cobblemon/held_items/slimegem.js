{
    name: "Slime Gem",
    spritenum: 3117,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Slime" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3117,
    gen: 5,
    isNonstandard: "Past"
}

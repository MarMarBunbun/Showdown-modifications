{
    name: "Light Gem",
    spritenum: 3114,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Light" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3114,
    gen: 5,
    isNonstandard: "Past"
}

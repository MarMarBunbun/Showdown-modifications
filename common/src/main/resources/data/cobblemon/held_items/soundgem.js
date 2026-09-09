{
    name: "Sound Gem",
    spritenum: 3118,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Sound" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3118,
    gen: 5,
    isNonstandard: "Past"
}

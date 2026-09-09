{
    name: "Shadow Gem",
    spritenum: 3109,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Shadow" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3109,
    gen: 5,
    isNonstandard: "Past"
}

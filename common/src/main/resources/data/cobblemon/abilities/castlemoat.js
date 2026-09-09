{
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Castle Moat");
        }
        return null;
      }
    },
    isBreakable: true,
    name: "Castle Moat",
    rating: 3,
    num: 3027
}

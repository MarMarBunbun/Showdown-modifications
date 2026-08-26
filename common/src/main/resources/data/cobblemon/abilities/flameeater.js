{
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Flame Eater");
        }
        return null;
      }
    },
    isBreakable: true,
    name: "Flame Eater",
    rating: 3.5,
    num: 3064
}

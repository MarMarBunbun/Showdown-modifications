{
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.boost({ atk: 1 })) {
          this.add("-immune", target, "[from] ability: Levin skin");
        }
        return null;
      }
    },
    isBreakable: true,
    name: "Levin Skin",
    rating: 3,
    num: 3096
}

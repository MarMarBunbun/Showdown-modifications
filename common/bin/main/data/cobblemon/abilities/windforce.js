{
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Flying" || move.type === "Wind") {
        if (!this.boost({ spe: 1 })) {
          this.add("-immune", target, "[from] ability: Wind Force");
        }
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (source === this.effectState.target || !target.isAlly(source))
        return;
      if (move.type === "Flying" || move.type === "Wind") {
        this.boost({ spe: 1 }, this.effectState.target);
      }
    },
    isBreakable: true,
    name: "Wind Force",
    rating: 3,
    num: 3165
}

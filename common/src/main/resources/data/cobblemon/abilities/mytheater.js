{
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fairy") {
        if (!this.boost({ spd: 1 })) {
          this.add("-immune", target, "[from] ability: Myth Eater");
        }
        return null;
      }
    },
	onAllyTryHitSide(target, source, move) {
      if (source === this.effectState.target || !target.isAlly(source))
        return;
      if (move.type === "Fairy") {
        this.boost({ spd: 1 }, this.effectState.target);
      }
    },
    flags: { breakable: 1 },
    name: "Myth Eater",
    rating: 3,
    num: 3226
}

{
    onTryHit(target, source, move) {
      if (move.type === "Water") {
        this.add("-immune", target, "[from] ability: Crystal Case");
        return null;
      }
    },
	onDamagingHit(damage, target, source, move) {
      if (["Fire"].includes(move.type)) {
        this.boost({ spa: 2 });
      }
    },
	onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fire") {
        return this.chainModify(1.5);
      }
    },
    isBreakable: true,
    name: "Crystal Case",
    rating: 3,
    num: 3043
}

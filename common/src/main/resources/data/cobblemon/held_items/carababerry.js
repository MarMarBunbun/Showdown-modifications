{
    name: "Caraba Berry",
    spritenum: 3152,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Light"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Light" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3152,
    gen: 4
}

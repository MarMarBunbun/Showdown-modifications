{
    name: "Valum Berry",
    spritenum: 3151,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Digital"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Digital" && target.getMoveHitData(move).typeMod > 0) {
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
    num: 3151,
    gen: 4
}

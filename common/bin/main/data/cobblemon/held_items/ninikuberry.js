{
    name: "Niniku Berry",
    spritenum: 3148,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Shadow"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Shadow" && target.getMoveHitData(move).typeMod > 0) {
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
    num: 3148,
    gen: 4
}

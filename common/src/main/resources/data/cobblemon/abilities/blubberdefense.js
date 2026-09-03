{
    onSourceModifyDamage(damage, source, target, move) {
      if (target.hp >= target.maxhp) {
        this.debug("Blubber Defense weaken");
        return this.chainModify(0.5);
      }
    },
    isBreakable: true,
    name: "blubber Defense",
    rating: 3.5,
    num: 3020
}

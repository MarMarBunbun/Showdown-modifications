{
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
	onSourceModifyDamage(damage, source, target, move) {
      let mod = 1;
      if (move.type === "Fire")
        mod *= 2;
      if (move.flags["contact"])
        mod /= 2;
      return this.chainModify(mod);
    },
    isBreakable: true,
    name: "Barbed Nest",
    rating: 3.5,
    num: 3014
}

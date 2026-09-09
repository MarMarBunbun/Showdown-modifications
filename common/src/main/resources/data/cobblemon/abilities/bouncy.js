{
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        const damageDealt = Math.floor(damage / 3);
		this.damage(damageDealt, source, target);
      }
    },
    name: "Bouncy",
    rating: 2.5,
    num: 3021
}

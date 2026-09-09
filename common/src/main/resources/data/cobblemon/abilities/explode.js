{
    name: "Explode",
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {

      if (damage >= target.hp) {
        this.add("-ability", target, "Explode");
        this.actions.useMove("Explosion", target);
      }
    },
	rating: 4,
    num: 3058
}

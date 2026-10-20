{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("slp", target);
        }
      }
    },
    name: "Sandman",
    rating: 1.5,
    num: 3127
}

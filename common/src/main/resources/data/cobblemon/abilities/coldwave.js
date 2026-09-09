{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(15, 100)) {
          source.trySetStatus("frz", target);
        }
      }
    },
    name: "Cold Wave",
    rating: 1.5,
    num: 3033
}

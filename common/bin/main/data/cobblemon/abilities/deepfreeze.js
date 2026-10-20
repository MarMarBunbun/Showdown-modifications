{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("frz", target);
        }
      }
    },
    name: "Deep Freeze",
    rating: 1.5,
    num: 3044
}

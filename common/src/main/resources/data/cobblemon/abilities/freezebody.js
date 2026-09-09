{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("fbt", target);
        }
      }
    },
    flags: {},
    name: "Freeze Body",
    rating: 2,
    num: 3208
}

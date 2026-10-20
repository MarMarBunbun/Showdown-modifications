{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(10, 10)) {
          source.addVolatile("trapped", target);
        }
      }
    },
  name: "Event Horizon",
  rating: 1.5,
  num: 3057,
}

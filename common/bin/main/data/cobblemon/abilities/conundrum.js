{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.addVolatile("confusion", this.effectState.target);
        }
      }
    },
    name: "Conundrum",
    rating: 1.5,
    num: 3040
}

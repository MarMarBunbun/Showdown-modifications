{
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        this.add("-ability", target, "Empathy");
        this.boost({ spa: -1, atk: -1 }, source, target, null, true);
      }
    },
    name: "Empathy",
    rating: 2,
    num: 3053
}

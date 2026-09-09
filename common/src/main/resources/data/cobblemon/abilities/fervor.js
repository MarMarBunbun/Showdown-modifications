{
    onStart(target) {
      target.addVolatile("fervor");
    },
    condition: {
      noCopy: true,
      onSourceDamagingHit(damage, target, source, move) {
        if (this.checkMoveMakesContact(move, source, target)) {
          this.boost({ spe: 1 }, source);
          source.removeVolatile("fervor");
        }
      }
    },
    flags: {},
    name: "Fervor",
    rating: 2,
    num: 3236
}

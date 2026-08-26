{
    num: 3011,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Asteroid Belt",
    pp: 10,
    flags: { noassist: 1, failcopycat: 1 },
    volatileStatus: "asteroidbelt",
    condition: {
      duration: 5,
      onTryHit(target, source, move) {
        if (this.checkMoveMakesContact(move, source, target)) {
          this.damage(source.baseMaxhp / 8, source, target);
        }
        return this.NOT_FAIL;
      },
	  onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(1, 10)) {
          source.trySetStatus("frz", target);
        }
      }
    }
    },
    secondary: null,
    target: "self",
    type: "Rock",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
}

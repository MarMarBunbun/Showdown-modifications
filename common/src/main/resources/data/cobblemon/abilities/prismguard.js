{
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (!move.flags.contact && move.category !== "Status") {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    name: "Prism Guard",
    rating: 2.5,
    num: 3118
}

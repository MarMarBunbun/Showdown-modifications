{
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Physical") {
        this.boost({ atk: 1 });
      }
    },
    flags: {},
    name: "Infuriate",
    rating: 2.5,
    num: 3212
}

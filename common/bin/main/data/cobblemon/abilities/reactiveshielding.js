{
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Physical") {
        this.add("-ability", target, "Reactive Shielding");
        this.boost({ def: 1, spd: -1 }, target);
      } else if (move.category === "Special") {
        this.add("-ability", target, "Reactive Shielding");
        this.boost({ spd: 1, def: -1 }, target);
      }
    },
    flags: {},
    name: "Reactive Shielding",
    rating: 2.5,
    num: 3210
}

{
    onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      if (this.checkMoveMakesContact(move, target, source)) {
        if (this.randomChance(3, 10)) {
          target.trySetStatus("par", source);
        }
      }
    },
    flags: {},
    name: "Static Touch",
    rating: 2,
    num: 3221
}

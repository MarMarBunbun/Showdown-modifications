{
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "slp") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    name: "Deep Sleep",
    rating: 4,
    num: 3045
}

{
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "fbt") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    flags: {},
    name: "Frost Heal",
    rating: 4,
    num: 3180
}

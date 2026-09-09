{
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "psn" || effect.id === "tox" || effect.id === "bgt") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    flags: {},
    name: "Poison Heal",
    rating: 4,
    num: 90
}

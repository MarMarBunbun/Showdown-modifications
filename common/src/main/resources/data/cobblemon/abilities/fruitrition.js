{
    onTryHealPriority: 19,
    onTryHeal(damage, target, source, effect) {
      if (source === target) {
        this.debug("Fruitrition boost");
        return this.chainModify([3277, 4096]);
      }
    },
    name: "Fruitrition",
    rating: 3.5,
    num: 3070
}

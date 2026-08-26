{
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella")) return;
      if (effect.id === "sunnyday") {
        this.heal(target.baseMaxhp / 16);
      }
      else if (effect.id === "desolateland") {
        this.heal(target.baseMaxhp / 10);
      }
    },
    flags: {},
    name: "Healing Sun",
    rating: 2,
    num: 3238
}

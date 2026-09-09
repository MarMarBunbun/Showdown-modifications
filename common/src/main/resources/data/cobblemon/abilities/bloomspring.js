{
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "pollenstorm") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Bloomspring",
    rating: 1.5,
    num: 3019
}

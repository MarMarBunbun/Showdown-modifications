{
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "fairydust") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Druidry",
    rating: 1.5,
    num: 3049
}

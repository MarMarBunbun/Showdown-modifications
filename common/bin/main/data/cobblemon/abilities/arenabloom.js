{
    onStart(source) {
      this.field.setWeather("pollenstorm");
    },
	onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "pollenstorm") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Arena Bloom",
    rating: 4,
    num: 3191
}

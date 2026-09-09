{
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "smog") {
        this.heal(target.baseMaxhp / 8);
      }
    },
	onImmunity(type, pokemon) {
      if (type === "smog")
        return false;
    },
    flags: {},
    name: "Carbon Capture",
    rating: 1.5,
    num: 3025
}

{
    onStart(source) {
      this.field.setWeather("snow");
    },
    onWeather(target, source, effect) {
      if (effect.id === "hail" || effect.id === "snow") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	flags: {},
    name: "Hee-Ho",
    rating: 69,
    num: 3080,
}

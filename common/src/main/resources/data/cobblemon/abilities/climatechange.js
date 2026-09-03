{
    onStart(source) {
      const weathers = [
        "acidrain", "battleaura", "cursedwinds", "darkness", "duststorm",
        "dragonforce", "eclipse", "fairydust", "fallout", "fog",
        "hail", "magnetosphere", "pheromones", "pollenstorm", "psychicfield",
        "raindance", "sandstorm", "shadowyaura", "smog", "snow",
        "sunnyday", "thunderstorm"
      ];
      const randomWeather = this.sample(weathers);
      this.field.setWeather(randomWeather);
      this.add(`-weather`, randomWeather, `[from] ability: Climate Change`, `[of] ${source}`);
	},
	onImmunity(type, pokemon) {
      if (type === "sandstorm" || type === "hail" || type === "acidrain" || type === "fallout" || type === "shadowyaura" || type === "cursedwinds" || type === "smog")
        return false;
    },
    name: "climatechange",
    rating: 4,
    num: 3031
}

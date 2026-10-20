{
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella")) return;
        const weatherId = effect.id;
      if (weatherId === "sunnyday" || weatherId === "desolateland") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    name: "phototroph",
    rating: 1.5,
    num: 3113
}

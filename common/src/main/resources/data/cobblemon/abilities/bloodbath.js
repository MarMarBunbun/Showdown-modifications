{
    onResidualOrder: 5,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      if (pokemon.status && ["darkness"].includes(pokemon.effectiveWeather())) {
        this.debug("bloodbath");
        this.add("-activate", pokemon, "ability: Bloodbath");
        pokemon.cureStatus();
      }
    },
    flags: {},
    name: "Bloodbath",
    rating: 1.5,
    num: 3084
}

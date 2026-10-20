{
    onStart(pokemon) {
      const side = pokemon.side;
      const tailwind = side.sideConditions["tailwind"];
      if (!tailwind) {
        this.add("-activate", pokemon, "ability: Wind Turbine");
        side.addSideCondition("tailwind", pokemon);
      }
    },
    name: "Wind Turbine",
    rating: 4,
    num: 3166
}

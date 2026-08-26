{
    onStart(pokemon) {
      const side = pokemon.side;
      const lightscreen = side.sideConditions["lightscreen"];
      if (!lightscreen) {
        this.add("-activate", pokemon, "ability: Vibrant Hue");
        side.addSideCondition("lightscreen", pokemon);
      }
    },
    name: "Vibrant Hue",
    rating: 4,
    num: 3161
}

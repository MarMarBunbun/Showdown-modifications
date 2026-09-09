{
    onStart(pokemon) {
      const side = pokemon.side;
      const reflect = side.sideConditions["reflect"];
      if (!reflect) {
        this.add("-activate", pokemon, "ability: Prismatic Hue");
        side.addSideCondition("reflect", pokemon);
      }
    },
    name: "Prismatic Hue",
    rating: 4,
    num: 3117
}

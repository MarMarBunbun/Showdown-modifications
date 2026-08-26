{
    onStart(pokemon) {
      const side = pokemon.side;
      const mist = side.sideConditions["mist"];
      if (!mist) {
        this.add("-activate", pokemon, "ability: Hazy Surge");
        side.addSideCondition("mist", pokemon);
      }
    },
    name: "Hazy Surge",
    rating: 4,
    num: 3078
}

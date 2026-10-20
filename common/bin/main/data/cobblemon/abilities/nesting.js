{
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "pheromones") {

        const hasBugTeammate = target.side.pokemon.some(pokemon => pokemon.hasType("Bug") && !pokemon.fainted);
        if (hasBugTeammate) {
          this.heal(target.baseMaxhp / 8);
        } else {
          this.heal(target.baseMaxhp / 16);
        }
      }
    },
    flags: {},
    name: "Nesting",
    rating: 1.5,
    num: 3105
}

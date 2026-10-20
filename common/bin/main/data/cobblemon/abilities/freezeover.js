{
    onStart(source) {
      if (source.hasItem("icyrock")) {
        for (const action of this.queue) {
          if (action.choice === 'runPrimal' && action.pokemon === source && source.species.id === 'kyogre') return;
          if (action.choice !== 'runSwitch' && action.choice !== 'runPrimal') break;
        }
        this.field.setWeather("hail");
      }
    },
    onWeatherChange(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Croacrozen" || pokemon.transformed) return;
      const weather = pokemon.effectiveWeather();
      if (weather === "hail" || weather === "snow") {
        pokemon.formeChange("Croacrozen-Frozen", this.effect, false, "[msg]");
      } else {
        pokemon.formeChange("Croacrozen", this.effect, false, "[msg]");
      }
	},
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
    name: "Freeze Over",
    rating: 2,
    num: 3248
}

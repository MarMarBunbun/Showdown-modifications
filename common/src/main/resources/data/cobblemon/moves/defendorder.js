{
  num: 455,
	onModifyMove(move, pokemon) {
      if (["pheromones"].includes(pokemon.effectiveWeather()))
        move.boosts = { def: 2, spd: 2 };
    }
}

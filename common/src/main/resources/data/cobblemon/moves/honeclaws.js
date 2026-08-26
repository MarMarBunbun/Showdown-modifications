{
  num: 468,
	onModifyMove(move, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather()))
        move.boosts = { atk: 2, accuracy: 2 };
    }
}

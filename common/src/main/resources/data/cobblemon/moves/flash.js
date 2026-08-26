{
  num: 148,
	flags: { protect: 1, reflectable: 1, mirror: 1, hm: 1 },
	onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
        move.boosts = { accuracy: -2 };
    }
}

{
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
  num: 149,
  accuracy: 100,
  basePower: 0,
  damageCallback(pokemon) {
      return this.random(50, 151) * pokemon.level / 100;
    },
  category: "Special",
  isNonstandard: "Past",
  name: "Psywave",
  pp: 15,
  priority: 0,
  secondary: null,
  target: "normal",
  type: "Psychic",
  contestType: "Clever",
}

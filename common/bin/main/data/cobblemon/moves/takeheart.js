{
	flags: { snatch: 1, metronome: 1, legendary: 1 },
  num: 850,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Take Heart",
  pp: 15,
  priority: 0,
  onHit(pokemon) {
      const success = !!this.boost({ spa: 1, spd: 1 });
      return pokemon.cureStatus() || success;
    },
  secondary: null,
  target: "self",
  type: "Psychic",
}

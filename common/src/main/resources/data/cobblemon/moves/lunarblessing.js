{
	flags: { snatch: 1, heal: 1, metronome: 1, legendary: 1 },
  num: 849,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Lunar Blessing",
  pp: 5,
  priority: 0,
  onHit(pokemon) {
      const success = !!this.heal(this.modify(pokemon.maxhp, 0.25));
      return pokemon.cureStatus() || success;
    },
  secondary: null,
  target: "allies",
  type: "Psychic",
}

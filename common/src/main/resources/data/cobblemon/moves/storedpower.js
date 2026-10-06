{
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
  num: 500,
  accuracy: 100,
  basePower: 20,
  basePowerCallback(pokemon, target, move) {
      const bp = move.basePower + 20 * pokemon.positiveBoosts();
      this.debug("BP: " + bp);
      return bp;
    },
  category: "Special",
  name: "Stored Power",
  pp: 10,
  priority: 0,
  secondary: null,
  target: "normal",
  type: "Psychic",
  zMove: { basePower: 160 },
  maxMove: { basePower: 130 },
  contestType: "Clever",
}

{
	flags: { protect: 1, mirror: 1, legendary: 1 },
  num: 820,
  accuracy: 100,
  basePower: 150,
  basePowerCallback(pokemon, target, move) {
      const bp = move.basePower * pokemon.hp / pokemon.maxhp;
      this.debug("BP: " + bp);
      return bp;
    },
  category: "Special",
  name: "Dragon Energy",
  pp: 5,
  priority: 0,
  secondary: null,
  target: "allAdjacentFoes",
  type: "Dragon",
}

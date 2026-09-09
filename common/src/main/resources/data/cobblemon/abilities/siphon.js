{
    onModifyMove(move) {
      if (move.flags["contact"] && this.randomChance(3, 10)) {
        if (!move.drain) {
          move.drain = [1, 2];
        }
      }
    },
	name: "Siphon",
	rating: 2,
	num: 3139
}

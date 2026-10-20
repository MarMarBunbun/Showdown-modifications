{
    onModifyMove(move) {
      if (move.flags["contact"]) {
        if (!move.drain) {
          move.drain = [1, 8];
        }
      }
    },
	name: "vampiric",
	rating: 2,
	num: 3160
}

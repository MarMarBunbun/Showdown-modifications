{
    onModifyMove(move) {
      if (move.flags["bite"]) {
        if (!move.drain) {
          move.drain = [1, 8];
        }
      }
    },
	name: "Bloodthirst",
	rating: 2,
	num: 3018
}

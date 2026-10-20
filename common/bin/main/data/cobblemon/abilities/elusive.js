{
    onModifyMove(move) {
      if (move.category === "Status" && this.randomChance(5, 10)) {

        move.self = move.self || {};
        move.self.boosts = move.self.boosts || {};
        move.self.boosts.evasion = 1;
	  }
    },
	name: "Elusive",
	rating: 2,
	num: 3052
}

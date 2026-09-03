{
    onModifyMovePriority: -5,
	onModifyMove(move, attacker, defender) {
      if (move.type === "Steel") {

        if (defender.hasType("Ghost") || defender.hasType("Dark")) {
          move.onEffectiveness = function(typeMod, target, type) {
            if (type === "Ghost" || type === "Dark") {
              return 1;
            }
          };
        }
      }
    },
    flags: {},
    name: "Silver Lining",
    rating: 3,
    num: 3170
}

{
	onModifyAtkPriority: 5,
	onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Electric") {
        this.debug("Voltaic Spirit boost");
        return this.chainModify(1.5);
      }
	},
	onModifySpAPriority: 5,
	onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Electric") {
        this.debug("Voltaic Spirit boost");
        return this.chainModify(1.5);
      }
	},
	flags: {},
	name: "Voltaic Spirit",
	rating: 3.5,
	num: 3246
}

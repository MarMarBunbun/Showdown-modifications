{
	onModifyAtkPriority: 5,
	onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Electric" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Overcharge boost");
        return this.chainModify(1.5);
      }
	},
	onModifySpAPriority: 5,
	onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Electric" && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Overcharge boost");
        return this.chainModify(1.5);
      }
	},
	flags: {},
	name: "Overcharge",
	rating: 2,
	num: 3252
}

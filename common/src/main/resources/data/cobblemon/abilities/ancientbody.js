{
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Normal" || move.type === "Fire" || move.type === "Poison" || move.type === "Flying" || move.type === "Crystal" || move.type === "Nuclear" || move.type === "Plastic") {
        this.debug("Ancient Body weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Normal" || move.type === "Fire" || move.type === "Poison" || move.type === "Flying" || move.type === "Crystal" || move.type === "Nuclear" || move.type === "Plastic") {
        this.debug("Ancient Body weaken");
        return this.chainModify(0.5);
      }
    },
	onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Rock") {
        this.debug("Ancient Body boost");
        return this.chainModify([4915, 4096]);
      }
    },
	onSourceBasePowerPriority: 17,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Water" || move.type === "Grass" || move.type === "Fighting" || move.type === "Ground" || move.type === "Steel" || move.type === "Shadow") {
        return this.chainModify(2);
      }
    },
	onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: { breakable: 1 },
    name: "Ancient Body",
    rating: 3.5,
    num: 3009
}

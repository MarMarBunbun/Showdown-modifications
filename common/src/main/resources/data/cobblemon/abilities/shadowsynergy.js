{
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Shadow Synergy boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Shadow Synergy boost");
        return this.chainModify(1.5);
      }
    },
    name: "Shadow Synergy",
    rating: 3.5,
    num: 3136
}

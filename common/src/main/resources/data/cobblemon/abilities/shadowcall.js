{
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Shadow Call boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Shadow Call boost");
        return this.chainModify(1.5);
      }
    },
    name: "Shadow Call",
    rating: 3.5,
    num: 3134
}

{
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Psychic" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Psycho Call boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Psychic" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Psycho Call boost");
        return this.chainModify(1.5);
      }
    },
    name: "Psycho Call",
    rating: 3.5,
    num: 3119
}

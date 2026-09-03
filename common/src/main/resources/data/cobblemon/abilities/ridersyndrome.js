{
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.flags["Kick"] && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Rider Syndrome boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.flags["Kick"] && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Rider Syndrome boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Rider Syndrome",
    rating: 1.5,
    num: 3179
}

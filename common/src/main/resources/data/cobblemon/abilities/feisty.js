{
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon) {

      const opponentLevel = pokemon.side.foe.active[0].level;
      if (opponentLevel > pokemon.level) {
        return this.chainModify(1.5);
      }
    },
    name: "Feisty",
    rating: 5,
    num: 3061
}

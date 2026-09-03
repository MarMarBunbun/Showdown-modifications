{
    onModifyPriority(priority, pokemon, target, move) {

      const highNoonActive = pokemon.battle.getAllActive().some(p =>
        p.getAbility().id === "highnoon"
      );
      if (highNoonActive) {
        return;
      }
      if (pokemon.activeMoveActions === 0) {
        return priority + 4;
      }
    },
    flags: {},
    name: "Quick Charge",
    rating: 1.5,
    num: 3213
}

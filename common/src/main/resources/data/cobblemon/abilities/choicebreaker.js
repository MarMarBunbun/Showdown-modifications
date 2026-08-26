{
    onStart(pokemon) {
      const bannedItems = ["choicescarf", "choiceband", "choicespecs"];
      const item = pokemon.getItem();
      if (bannedItems.includes(item.id)) {
        this.add("-activate", pokemon, "ability: Choice Breaker", item.name);
      }
    },
    onResidual(pokemon) {
      const bannedItems = ["choicescarf", "choiceband", "choicespecs"];
      const item = pokemon.getItem();
      if (bannedItems.includes(item.id) && pokemon.volatiles["choicelock"]) {
        delete pokemon.volatiles["choicelock"];
      }
    },
    onModifyMove(move, pokemon) {
      const bannedItems = ["choicescarf", "choiceband", "choicespecs"];
      const item = pokemon.getItem();
      if (bannedItems.includes(item.id)) {
        move.isChoice = false;
      }
    },
    onDamage(damage, target, source, effect) {
      if (
        effect && effect.id === "lifeorb" &&
        target.getItem().id === "lifeorb"
      ) {
        return false;
      }
    },
	flags: {},
    name: "Choice Breaker",
    rating: 1,
    num: 3227
}

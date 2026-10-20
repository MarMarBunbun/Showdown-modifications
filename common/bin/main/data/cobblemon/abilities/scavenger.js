{
    onSourceAfterFaint(length, pokemon, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.heal(pokemon.baseMaxhp / 4);
      }
    },
    name: "Scavenger",
    rating: 3.5,
    num: 3130
}

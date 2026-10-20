{
    onModifyAtk(atk, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
	onModifySpa(spa, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
	onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "darkness") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: {},
    name: "Bloodlust",
    rating: 3,
    num: 3017
}

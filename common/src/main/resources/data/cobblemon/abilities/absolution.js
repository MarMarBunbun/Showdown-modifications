{
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon) {
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
    name: "Absolution",
    rating: 2,
    num: 3000
}

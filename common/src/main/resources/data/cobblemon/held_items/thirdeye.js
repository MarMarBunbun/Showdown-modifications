{
    name: "Third Eye",
    fling: {
      basePower: 20
    },
    spritenum: 3014,
    onStart(pokemon) {
      for (const target of pokemon.foes()) {
        if (target.ability) {
          this.add("-item", target, target.getAbility().name, "[from] item: X-Ray Specs", "[of] " + pokemon, "[identify]");
        }
      }
    },
    num: 3014,
    gen: 9,
    isNonstandard: "Past"
}

{
    onStart(pokemon) {
      const target = pokemon.side.foe.active[0];
      if (!target || !target.isActive) return;
      if (!target.hasType("Fairy")) {
        target.addType("Fairy");
        this.add(
          "-start", target, "typeadd", "Fairy", "[from] ability: Polymorphism"
        );
      }
    },
	flags: {},
    name: "Polymorphism",
    rating: 3.5,
    num: 3230
}

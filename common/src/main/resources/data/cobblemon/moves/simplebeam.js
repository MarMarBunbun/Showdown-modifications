{
	flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, beam: 1 },
  num: 493,
  accuracy: 100,
  basePower: 0,
  category: "Status",
  name: "Simple Beam",
  pp: 15,
  priority: 0,
  onTryHit(target) {
      if (target.getAbility().flags["cantsuppress"] || target.ability === "simple" || target.ability === "truant") {
        return false;
      }
    },
  onHit(pokemon) {
      const oldAbility = pokemon.setAbility("simple");
      if (oldAbility) {
        this.add("-ability", pokemon, "Simple", "[from] move: Simple Beam");
        return;
      }
      return oldAbility;
    },
  secondary: null,
  target: "normal",
  type: "Normal",
  zMove: { boost: { spa: 1 } },
  contestType: "Cute",
}

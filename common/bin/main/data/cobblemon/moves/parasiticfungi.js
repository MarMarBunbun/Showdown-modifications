{
    num: 3282,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Parasitic Fungi",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onEffectiveness(typeMod, target, type) {
      if (type === "Normal" || type === "Bug")
        return 1;
    },
	volatileStatus: "parasiticfungi",
    condition: {
      duration: 5,
	  noCopy: true,
      onStart(pokemon) {
        this.add("-start", pokemon, "Parasitic Fungi");
      },
      onResidualOrder: 13,
      onResidual(pokemon) {
        const residualDamage = (pokemon.hasType(["Normal", "Bug"])) ? pokemon.baseMaxhp / 8 : pokemon.baseMaxhp / 16;
          this.damage(residualDamage, pokemon);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Parasitic Fungi");
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass"
}

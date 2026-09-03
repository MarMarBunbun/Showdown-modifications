{
	onHit(target, pokemon, move) {
      if (pokemon.baseSpecies.baseSpecies === "Meloetta" && !pokemon.transformed) {
        move.willChangeForme = true;
      }
    },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!move.willChangeForme) return;
      const id = pokemon.species.id;

      if (id === "meloettapirouette") {
        pokemon.formeChange("Meloetta", this.effect, false, "[msg]");
        return;
      }
      if (id === "meloetta") {
        pokemon.formeChange("Meloetta-Pirouette", this.effect, false, "[msg]");
        return;
      }

      if (id === "meloettasoprano") {
        pokemon.formeChange("Meloetta-Acoustic", this.effect, false, "[msg]");
        return;
      }
      if (id === "meloettaacoustic") {
        pokemon.formeChange("Meloetta-Soprano", this.effect, false, "[msg]");
        return;
      }
	},
	flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, legendary: 1 },
  num: 547,
  accuracy: 100,
  basePower: 75,
  category: "Special",
  name: "Relic Song",
  pp: 10,
  priority: 0,
  secondary: {
      chance: 10,
      status: "slp"
    },
  target: "allAdjacentFoes",
  type: "Normal",
  contestType: "Beautiful",
}

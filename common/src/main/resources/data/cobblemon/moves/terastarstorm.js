{
	flags: { protect: 1, mirror: 1, noassist: 1, failcopycat: 1, failmimic: 1, legendary: 1 },
  num: 906,
  accuracy: 100,
  basePower: 120,
  category: "Special",
  name: "Tera Starstorm",
  pp: 5,
  priority: 0,
  onModifyType(move, pokemon) {
      if (pokemon.species.name === "Terapagos-Stellar") {
        move.type = "Stellar";
        if (pokemon.terastallized && pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true)) {
          move.category = "Physical";
        }
      }
    },
  onModifyMove(move, pokemon) {
      if (pokemon.species.name === "Terapagos-Stellar") {
        move.target = "allAdjacentFoes";
      }
    },
  noSketch: true,
  secondary: null,
  target: "normal",
  type: "Normal",
}

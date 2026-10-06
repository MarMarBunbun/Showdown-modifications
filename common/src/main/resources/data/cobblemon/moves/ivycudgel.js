{
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 },
  num: 904,
  accuracy: 100,
  basePower: 100,
  category: "Physical",
  name: "Ivy Cudgel",
  pp: 10,
  priority: 0,
  critRatio: 2,
  onPrepareHit(target, source, move) {
      if (move.type !== "Grass") {
        this.attrLastMove("[anim] Ivy Cudgel " + move.type);
      }
    },
  onModifyType(move, pokemon) {
      switch (pokemon.species.name) {
        case "Ogerpon-Wellspring":
        case "Ogerpon-Wellspring-Tera":
          move.type = "Water";
          break;
        case "Ogerpon-Hearthflame":
        case "Ogerpon-Hearthflame-Tera":
          move.type = "Fire";
          break;
        case "Ogerpon-Cornerstone":
        case "Ogerpon-Cornerstone-Tera":
          move.type = "Rock";
          break;
      }
    },
  secondary: null,
  target: "normal",
  type: "Grass",
}

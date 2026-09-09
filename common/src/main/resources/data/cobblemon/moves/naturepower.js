{
    num: 267,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Nature Power",
    pp: 20,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1 },
    onTryHit(target, pokemon) {
      let move = "triattack";
      if (this.field.isTerrain("electricterrain")) {
        move = "thunderbolt";
      } else if (this.field.isTerrain("grassyterrain")) {
        move = "energyball";
      } else if (this.field.isTerrain("mistyterrain")) {
        move = "moonblast";
      } else if (this.field.isTerrain("psychicterrain")) {
        move = "psychic";
      } else if (this.field.isTerrain("snowyterrain")) {
        move = "icebeam";
      } else if (this.field.isTerrain("midnightterrain")) {
        move = "darkpulse";
      } else if (this.field.isTerrain("shiningterrain")) {
        move = "flamethrower";
      }
      this.actions.useMove(move, pokemon, target);
      return null;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
}

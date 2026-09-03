{
    num: 293,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Camouflage",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, metronome: 1 },
    onHit(target) {
      let newType = "Normal";
      if (this.field.isTerrain("electricterrain")) {
        newType = "Electric";
      } else if (this.field.isTerrain("grassyterrain")) {
        newType = "Grass";
      } else if (this.field.isTerrain("mistyterrain")) {
        newType = "Fairy";
      } else if (this.field.isTerrain("psychicterrain")) {
        newType = "Psychic";
      } else if (this.field.isTerrain("snowyterrain")) {
        newType = "Ice";
      } else if (this.field.isTerrain("midnightterrain")) {
        newType = "Dark";
      } else if (this.field.isTerrain("shiningterrain")) {
        newType = "Fire";
      }
      if (target.getTypes().join() === newType || !target.setType(newType))
        return false;
      this.add("-start", target, "typechange", newType);
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { evasion: 1 } },
    contestType: "Clever"
}

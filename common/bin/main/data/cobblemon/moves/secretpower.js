{
    num: 290,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    isNonstandard: "Past",
    name: "Secret Power",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onModifyMove(move, pokemon) {
      if (this.field.isTerrain(""))
        return;
      move.secondaries = [];
      if (this.field.isTerrain("electricterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "par"
        });
      } else if (this.field.isTerrain("grassyterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "slp"
        });
      } else if (this.field.isTerrain("mistyterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spa: -1
          }
        });
      } else if (this.field.isTerrain("psychicterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      } else if (this.field.isTerrain("snowyterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      } else if (this.field.isTerrain("midnightterrain")) {
        move.secondaries.push({
          chance: 30,
          volatileStatus: "flinch"
        });
      } else if (this.field.isTerrain("shiningterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "brn"
        });
      }
    },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Normal",
    contestType: "Clever"
}

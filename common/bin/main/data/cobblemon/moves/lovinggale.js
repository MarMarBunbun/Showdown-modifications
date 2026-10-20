{
    num: 3849,
    accuracy: 50,
    basePower: 120,
    category: "Special",
    name: "Loving Gale",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onTryMove(source, target, move) {

      if (source.battle.field.isWeather("pheromones")) {
        move.accuracy = 70;
      }
    },
	onAfterHit(target, source, move) {
      if (!target.gender || !source.gender) return;
      if ((target.gender === "M" && source.gender === "F") || (target.gender === "F" && source.gender === "M")) {
        this.add("-activate", source, "lovinggalesuccess", "[from] Love Charm");
        if (source.status) {
          source.cureStatus();
          this.add("-activate", source, "[from] move: lovinggale");
        }
        this.boost({def: 1, spd: 1}, source);
        if (!target.volatiles["attract"]) {
          target.addVolatile("attract", source);
        }
      }
      else if (target.gender === source.gender) {
        this.add("-activate", source, "lovinggalesame", "[from] Love Charm");
      }
    },
    onMoveFail(target, source, move) {
      if (!target.gender || !source.gender) return;
      if ((target.gender === 'M' && source.gender === 'F') || (target.gender === 'F' && source.gender === 'M')) {
        this.add('-activate', source, 'lovinggalefail', '[from] Love Charm');
        this.boost({def: -1, spd: -1}, source);
      }
    },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fairy", type);
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
}

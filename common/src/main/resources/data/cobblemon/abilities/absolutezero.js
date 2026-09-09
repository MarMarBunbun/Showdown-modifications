{
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    onModifyMovePriority: -2,
    onModifyMove(move, attacker, defender) {
      if (this.field.isWeather("snow") || this.field.isWeather("hail")) {
        if (move.secondaries) {
          for (const secondary of move.secondaries) {
            if (secondary.status === "frz" || secondary.status === "fbt") {
              if (secondary.chance) {
                this.debug("Doubling status chance for freeze/frostbite during Hail/Snow");
                secondary.chance *= 2;
              }
            }
          }
        }
        if (move.self?.chance && (move.self.status === "frz" || move.self.status === "fbt")) {
          this.debug("Doubling self status chance for freeze/frostbite during Hail/Snow");
          move.self.chance *= 2;
        }
      }
    },
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Ice" && (this.field.isWeather("snow") || this.field.isWeather("hail"))) {
        this.debug('Absolute Zero ice power boost in Snow');
        return this.chainModify([5325, 4096]);
      }
    },
    flags: {},
    name: "Absolute Zero",
    rating: 3.5,
    num: 3190
}

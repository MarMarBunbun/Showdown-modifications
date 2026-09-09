{
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (this.field.isWeather(["sandstorm", "duststorm"])) {
        if (move.type === "Rock" || move.type === "Ground" || move.type === "Steel") {
          this.debug("Sand Force boost");
          return this.chainModify([5325, 4096]);
        }
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Sand Force",
    rating: 2,
    num: 3126
}

{
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Copper State");
        }
        return null;
      }
    },
    onSourceBasePowerPriority: 17,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Water") {
        return this.chainModify(2);
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "thunderstorm") {
        this.heal(target.baseMaxhp / 8);
      } else if (effect.id === "raindance" || effect.id === "primordialsea" || effect.id === "acidrain") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: { breakable: 1 },
    name: "Copper State",
    rating: 3,
    num: 3171
}

{
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Nuclear") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Rad Sipper");
        }
        return null;
      }
    },
	onAllyTryHitSide(target, source, move) {
      if (source === this.effectState.target || !target.isAlly(source))
        return;
      if (move.type === "Nuclear") {
        this.boost({ spa: 1 }, this.effectState.target);
      }
    },
	onImmunity(type, pokemon) {
      if (type === "fallout")
        return false;
    },
	onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "fallout") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: { breakable: 1 },
    name: "Rad Sipper",
    rating: 3.5,
    num: 3121
}

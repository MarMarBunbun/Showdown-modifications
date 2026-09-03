{
    onTryHit(pokemon, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon, "[from] ability: To Be");
		this.boost({spe: 1}, pokemon);
        return null;
      }
    },
    onDamagePriority: -30,
    onDamage(damage, target, source, effect) {
      if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === "Move") {
        this.add("-ability", target, "To Be");
		this.boost({spe: 1}, target);
        return target.hp - 1;
      }
    },
    flags: { breakable: 1 },
    name: "To be",
    rating: 3,
    num: 3204
}

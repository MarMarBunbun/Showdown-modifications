{
    onTryHit(pokemon, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon, "[from] ability: Resolute");
        return null;
      }
    },
    onDamagePriority: -30,
    onDamage(damage, target, source, effect) {
      if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === "Move") {
        this.add("-ability", target, "Resolute");
        return target.hp - 1;
      }
    },
    isBreakable: true,
    name: "Resolute",
    rating: 3,
    num: 3124
}

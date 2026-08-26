{
    num: 3328,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Special",
    name: "Reprisal",
    pp: 10,
    priority: -4,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
}

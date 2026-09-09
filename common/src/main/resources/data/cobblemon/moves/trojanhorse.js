{
    num: 3436,
    accuracy: 100,
    basePower: 40,
    basePowerCallback(pokemon, target, move) {
      if (target.beingCalledBack || target.switchFlag) {
        this.debug("Trojan Horse damage boost");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    isNonstandard: "Past",
    name: "Trojan Horse",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    beforeTurnCallback(pokemon) {
      for (const side of this.sides) {
        if (side.hasAlly(pokemon))
          continue;
        side.addSideCondition("pursuit", pokemon);
        const data = side.getSideConditionData("pursuit");
        if (!data.sources) {
          data.sources = [];
        }
        data.sources.push(pokemon);
      }
    },
    onModifyMove(move, source, target) {
      if (target?.beingCalledBack || target?.switchFlag)
        move.accuracy = true;
    },
    onTryHit(target, pokemon) {
      target.side.removeSideCondition("pursuit");
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Clever"
}

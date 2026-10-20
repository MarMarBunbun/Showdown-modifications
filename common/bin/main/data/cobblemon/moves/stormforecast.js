{
    num: 3403,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Storm Forecast",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        duration: 3,
        move: "stormforecast",
        source,
        moveData: {
          id: "stormforecast",
          name: "Storm Forecast",
          accuracy: 100,
          basePower: 120,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Electric"
        }
      });
      this.add("-start", source, "move: Storm Forecast");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Clever"
}

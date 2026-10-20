{
    num: 3497,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Plastic Explosive",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        duration: 3,
        move: "plasticexplosive",
        source,
        moveData: {
          id: "plasticexplosive",
          name: "Plastic Explosive",
          accuracy: 100,
          basePower: 120,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Plastic"
        }
      });
      this.add("-start", source, "move: Plastic Explosive");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Clever"
}

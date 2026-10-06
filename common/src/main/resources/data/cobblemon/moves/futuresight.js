{
	flags: { allyanim: 1, metronome: 1, futuremove: 1, magic: 1 },
  num: 248,
  accuracy: 100,
  basePower: 120,
  category: "Special",
  name: "Future Sight",
  pp: 10,
  priority: 0,
  ignoreImmunity: true,
  onTry(source, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        duration: 3,
        move: "futuresight",
        source,
        moveData: {
          id: "futuresight",
          name: "Future Sight",
          accuracy: 100,
          basePower: 120,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, metronome: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Psychic"
        }
      });
      this.add("-start", source, "move: Future Sight");
      return this.NOT_FAIL;
    },
  secondary: null,
  target: "normal",
  type: "Psychic",
  contestType: "Clever",
}

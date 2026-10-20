{
	flags: { metronome: 1, futuremove: 1, legendary: 1 },
  num: 353,
  accuracy: 100,
  basePower: 140,
  category: "Special",
  name: "Doom Desire",
  pp: 5,
  priority: 0,
  onTry(source, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: "doomdesire",
        source,
        moveData: {
          id: "doomdesire",
          name: "Doom Desire",
          accuracy: 100,
          basePower: 140,
          category: "Special",
          priority: 0,
          flags: { metronome: 1, futuremove: 1 },
          effectType: "Move",
          type: "Steel"
        }
      });
      this.add("-start", source, "Doom Desire");
      return this.NOT_FAIL;
    },
  secondary: null,
  target: "normal",
  type: "Steel",
  contestType: "Beautiful",
}

{
	flags: { snatch: 1, dance: 1, heal: 1, metronome: 1, legendary: 1 },
  num: 461,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Lunar Dance",
  pp: 10,
  priority: 0,
  selfdestruct: "ifHit",
  slotCondition: "lunardance",
  condition: {
      onSwap(target) {
        if (!target.fainted && (target.hp < target.maxhp || target.status || target.moveSlots.some((moveSlot) => moveSlot.pp < moveSlot.maxpp))) {
          target.heal(target.maxhp);
          target.clearStatus();
          for (const moveSlot of target.moveSlots) {
            moveSlot.pp = moveSlot.maxpp;
          }
          this.add("-heal", target, target.getHealth, "[from] move: Lunar Dance");
          target.side.removeSlotCondition(target, "lunardance");
        }
      }
    },
  secondary: null,
  target: "self",
  type: "Psychic",
  contestType: "Beautiful",
}

{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      const isIceType = attacker.hasType("Ice");
	  const targetFrostbitten = defender.status === "fbt";
	  const isBiteMove = move.flags && move.flags["bite"];
	  if (isIceType && targetFrostbitten && isBiteMove) {
        this.debug("Frostjaw boost");
		return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Boreal Instinct",
    rating: 3.5,
    num: 3181
}

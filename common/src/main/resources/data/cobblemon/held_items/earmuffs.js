{
    name: "Earmuffs",
    spritenum: 3176,
    fling: {
      basePower: 10
    },
	onSourceBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"] || move.type === "Sound") {
        return this.chainModify(0.5);
      }
    },
    num: 3176,
    gen: 9
}

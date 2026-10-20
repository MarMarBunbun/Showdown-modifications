{
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"]) {
        this.debug("Sound Boost boost");
        return this.chainModify(1.3);
      }
    },
    name: "Sound Boost",
    rating: 3.5,
    num: 3146
}

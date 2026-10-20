{
    num: 3098,
    accuracy: 100,
    basePower: 130,
    category: "Special",
    name: "Detox",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onTry(source) {
      return source.status === "psn" || source.status === "tox";
    },
	onHit(target, source, move) {
      const success = source.cureStatus();
      if (success) {
        this.add('-clearstatus', source, source.status);
      }
      return success;
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Cute"
}

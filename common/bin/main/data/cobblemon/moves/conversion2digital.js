{
    num: 3514,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Conversion 2 Digital",
    pp: 30,
    priority: 0,
    flags: { bypasssub: 1, metronome: 1 },
    onHit(target, source) {
      if (!target.lastMoveUsed) {
        return false;
      }
      const possibleTypes = [];
      const attackType = target.lastMoveUsed.type;
      for (const type of this.dex.types.names()) {
        if (source.hasType(type))
          continue;
        const typeCheck = this.dex.types.get(type).damageTaken[attackType];
        if (typeCheck === 2 || typeCheck === 3) {
          possibleTypes.push(type);
        }
      }
      if (!possibleTypes.length) {
        return false;
      }
      const randomType = this.sample(possibleTypes);
      if (!source.setType(randomType))
        return false;
      this.add("-start", source, "typechange", randomType);
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { effect: "heal" },
    contestType: "Beautiful"
}

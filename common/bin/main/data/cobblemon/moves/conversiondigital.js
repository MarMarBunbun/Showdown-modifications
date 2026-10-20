{
    num: 3513,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Conversion Digital",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    onHit(target) {
      const type = this.dex.moves.get(target.moveSlots[0].id).type;
      if (target.hasType(type) || !target.setType(type))
        return false;
      this.add("-start", target, "typechange", type);
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Beautiful"
}

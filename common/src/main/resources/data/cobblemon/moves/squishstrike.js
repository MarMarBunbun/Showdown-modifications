{
    num: 3770,
    accuracy: 90,
    basePower: 30,
    category: "Physical",
    name: "Squish Strike",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyMove(move, source) {
      const hpRatio = source.hp / source.maxhp;
      if (hpRatio > 0.75) {
        move.multihit = 1;
      } else if (hpRatio > 0.5) {
        move.multihit = 2;
      } else if (hpRatio > 0.25) {
        move.multihit = 3;
      } else {
        move.multihit = 4;
      }
    },
    target: "normal",
    type: "Slime",
    maxMove: { basePower: 130 },
    contestType: "Tough"
}

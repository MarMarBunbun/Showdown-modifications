{
    num: 3764,
    accuracy: 95,
    basePower: 60,
    category: "Special",
    name: "Sigil Transfer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
    onTry(source) {
      const userSide = source.side;
      const foeSide = source.side.foe;
      if (!userSide.sideConditions["bloodsigil"] && !foeSide.sideConditions["bloodsigil"]) {
        this.add("-fail", source, "move: Sigil Transfer");
        return false;
      }
    },
    onModifyMove(move, source) {
      const userSide = source.side;
      const foeSide = source.side.foe;

      let totalSigils = 0;
      if (userSide.sideConditions["bloodsigil"]) totalSigils += 1;
      if (foeSide.sideConditions["bloodsigil"]) totalSigils += 1;


      if (totalSigils > 1) {
        move.multihit = totalSigils;
      }
    },
    onAfterMove(source) {
      const userSide = source.side;
      const foeSide = source.side.foe;

      if (userSide.sideConditions["bloodsigil"]) {
        userSide.removeSideCondition("bloodsigil");
      }
      if (foeSide.sideConditions["bloodsigil"]) {
        foeSide.removeSideCondition("bloodsigil");
      }
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
}

{
    num: 3106,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Divine Call",
    pp: 10,
    priority: 0,
    flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
    onHit(target, source, effect) {
      const moves = this.dex.moves.all().filter(move => (
        (![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
        (!move.isNonstandard || move.isNonstandard === "Unobtainable") &&
        move.flags["legendary"]
      ));
      let randomMove = "";
      if (moves.length) {
        moves.sort((a, b) => a.num - b.num);
        randomMove = this.sample(moves).id;
      }
      if (!randomMove) return false;
      source.side.lastSelectedMove = this.toID(randomMove);
      this.actions.useMove(randomMove, target);
    },
    callsMove: true,
    secondary: null,
    target: "self",
    type: "Cosmic",
    contestType: "Beautiful",
}

{
    num: 3056,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Channel",
    pp: 10,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
	onHit(target, source, effect) {
      const ghostMoves = this.dex.moves.all().filter((move) =>
      move.type === "Ghost" &&
        (![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
        !move.realMove && !move.isZ && !move.isMax &&
        (!move.isNonstandard || move.isNonstandard === "Unobtainable") &&
        !effect.noMetronome.includes(move.name)
      );
      let randomGhostMove = "";
      if (ghostMoves.length) {
        ghostMoves.sort((a, b) => a.num - b.num);
        randomGhostMove = this.sample(ghostMoves).id;
      }
      if (!randomGhostMove)
        return false;
      source.side.lastSelectedMove = this.toID(randomGhostMove);
      this.actions.useMove(randomGhostMove, target);
    },
    secondary: null,
    target: "self",
    type: "Ghost",
    contestType: "Cute"
}

{
    num: 3521,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Clone Stamp",
    pp: 20,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1 },
    onHit(pokemon) {
      let move = this.lastMove;
      if (!move)
        return;
      if (move.isMax && move.baseMove)
        move = this.dex.moves.get(move.baseMove);
      if (move.flags["failcopycat"] || move.isZ || move.isMax) {
        return false;
      }
      this.actions.useMove(move.id, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { boost: { accuracy: 1 } },
    contestType: "Cute"
}

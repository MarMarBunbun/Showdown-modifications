{
    num: 3857,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Chill Echo Normal",
    pp: 10,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1 },
    sleepUsable: true,
    onTry(source) {
      return source.status === "frz";
    },
    onHit(pokemon) {
      const moves = [];
      for (const moveSlot of pokemon.moveSlots) {
        const moveid = moveSlot.id;
        if (!moveid)
          continue;
        const move = this.dex.moves.get(moveid);
        if (move.flags["nosleeptalk"] || move.flags["charge"] || move.isZ && move.basePower !== 1 || move.isMax) {
          continue;
        }
        moves.push(moveid);
      }
      let randomMove = "";
      if (moves.length)
        randomMove = this.sample(moves);
      if (!randomMove) {
        return false;
      }
      this.actions.useMove(randomMove, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "crit2" },
    contestType: "Cute"
}

{
	onHit(target, source) {
      const disallowedMoves = ["chatter", "sketch", "replicate", "copypaste", "amalgamate", "struggle"];
      const move = target.lastMove;
      if (source.transformed || !move || source.moves.includes(move.id))
        return false;
      if (move.noSketch || move.isZ || move.isMax)
        return false;
      const sketchIndex = source.moves.indexOf("sketch");
      if (sketchIndex < 0)
        return false;
      const sketchedMove = {
        move: move.name,
        id: move.id,
        pp: move.pp,
        maxpp: move.pp,
        target: move.target,
        disabled: false,
        used: false
      };
      source.moveSlots[sketchIndex] = sketchedMove;
      source.baseMoveSlots[sketchIndex] = sketchedMove;
      this.add("-activate", source, "move: Sketch", move.name);
    },
  num: 166,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Sketch",
  pp: 1,
  noPPBoosts: true,
  priority: 0,
  flags: {
      bypasssub: 1,
      allyanim: 1,
      failencore: 1,
      nosleeptalk: 1,
      noassist: 1,
      failcopycat: 1,
      failmimic: 1,
      failinstruct: 1
    },
  noSketch: true,
  secondary: null,
  target: "normal",
  type: "Normal",
  zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
  contestType: "Clever",
}

{
  num: 166,
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
    }
}

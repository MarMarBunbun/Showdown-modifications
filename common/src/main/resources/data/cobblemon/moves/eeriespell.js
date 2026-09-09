{
	flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1, magic: 1 },
  num: 826,
  accuracy: 100,
  basePower: 80,
  category: "Special",
  name: "Eerie Spell",
  pp: 5,
  priority: 0,
  secondary: {
      chance: 100,
      onHit(target) {
        if (!target.hp)
          return;
        let move = target.lastMove;
        if (!move || move.isZ)
          return;
        if (move.isMax && move.baseMove)
          move = this.dex.moves.get(move.baseMove);
        const ppDeducted = target.deductPP(move.id, 3);
        if (!ppDeducted)
          return;
        this.add("-activate", target, "move: Eerie Spell", move.name, ppDeducted);
      }
    },
  target: "normal",
  type: "Psychic",
}

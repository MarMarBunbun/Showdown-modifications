{
	onStart(target) {
      let moveName = target.moveSlots[0].move;
      if (!moveName) return;
      let move = this.dex.moves.get(moveName);
      if (move) {
        if (!target.setType(move.type)) return;
        this.add('-start', target, 'typechange', move.type, '[from] ability: Overwrite');
      }
	},
	flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
	name: "Overwrite",
	rating: 4,
	num: 3249
}

{
    name: "Supernova",
    onAfterMove(source, target, move) {

    if (move.type === 'Cosmic' && !source.moveThisTurnResult?.zMove && !source.moveThisTurnResult?.multiHit) {
      this.add('-ability', source, 'Supernova');
      this.actions.useMove("heatburst", source);
    }
  },
	rating: 4,
    num: 3219
}

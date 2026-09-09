{
    onPrepareHit(target, source, move) {
    if (target.side !== source.side && target.lastMove === move.id) {

      this.debug('Conditioning reduces damage');
      this.effectState.conditioningReduce = 0.75;
      } else {
      this.effectState.conditioningReduce = 1;
      }
	},
	onModifyDamage(damage, source, target, move) {

      return this.chainModify(this.effectState.conditioningReduce);
	},
	name: "Conditioning",
    rating: 4.5,
    num: 3036
}

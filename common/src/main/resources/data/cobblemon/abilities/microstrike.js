{
	onModifyDamage(relayVar, source, target, move) {
      if (source.weighthg < target.weighthg) {
        return this.chainModify(1.3);
      }
	},
	flags: {},
	name: "Micro Strike",
	rating: 2,
	num: 3240
}

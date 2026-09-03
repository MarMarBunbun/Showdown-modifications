{
	onModifyDamage(relayVar, source, target, move) {
      if (target.runEffectiveness(move) > 0) {
        this.debug("Warrior Spirit boost");
        return this.chainModify(1.5);
      }
	},
	flags: {},
	name: "Warrior Spirit",
	rating: 3,
	num: 3247
}

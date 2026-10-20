{
	onModifyTypePriority: -1,
	onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("shielddust") || target.hasItem("covertcloak"))
        return;
      if (move.flags['sound'] || move.type === "Sound") {
        if (this.randomChance(3, 10)) {
          target.trySetStatus("psn", source);
        }
      }
	},
	onModifyType(move, pokemon) {
      if ((move.flags['sound'] || move.type === "Sound") && !pokemon.volatiles['dynamax']) {
        move.type = 'Poison';
      }
	},
	flags: {},
	name: "Toxic Voice",
	rating: 1.5,
	num: 3250
}

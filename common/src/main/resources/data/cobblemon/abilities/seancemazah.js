{
	onAnyFaint(target) {
      if (!this.effectState.target.hp) return;
      const ability = target.getAbility();
      if (ability.flags['noreceiver'] || ability.id === 'noability') return;
      if (this.effectState.target.setAbility(ability)) {
        this.add('-ability', this.effectState.target, ability, '[from] ability: Seance', '[of] ' + target);
      }
	},
	flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1},
	name: "Seance Mazah",
	rating: 0,
	num: 3241
}

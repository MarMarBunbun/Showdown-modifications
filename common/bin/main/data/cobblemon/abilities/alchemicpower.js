{
    onAllyFaint(target) {
      if (!this.effectState.target.hp && !target.getAbility().flags["notrace"] && target.ability !== "noability")
        return;
      const ability = target.getAbility();
      if (this.effectState.target.setAbility(ability)) {
        this.add("-ability", this.effectState.target, ability, "[from] ability: Alchemic Power", "[of] " + target);
      }
    },
	name: "Alchemic POwer",
	rating: 2,
	num: 3004,
    flags: { notrace: 1}
}

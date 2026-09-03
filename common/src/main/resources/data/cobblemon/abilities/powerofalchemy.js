{
    onAllyFaint(target) {
      if (!this.effectState.target.hp)
        return;
      const ability = target.getAbility();
      const additionalBannedAbilities = [
        "alchemicpower",
		"noability",
        "flowergift",
        "forecast",
        "hungerswitch",
        "illusion",
        "imposter",
        "neutralizinggas",
        "powerofalchemy",
        "receiver",
        "trace",
        "wonderguard"
      ];
      if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability))
        return;
      if (this.effectState.target.setAbility(ability)) {
        this.add("-ability", this.effectState.target, ability, "[from] ability: Power of Alchemy", "[of] " + target);
      }
    },
    name: "Power of Alchemy",
    rating: 0,
    num: 223
}

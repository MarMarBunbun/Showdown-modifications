{
    onFoeAfterBoost(boost, target, source, effect) {
      if (effect?.name === "Brave Heart" || effect?.name === "Mirror Herb")
      return;

      const user = this.effectState.target;
      const opponent = target;

      let numBoosts = 0;

      for (const stat in boost) {
        if (boost[stat] > 0) {
            numBoosts += boost[stat];
        }
      }

      if (numBoosts > 0) {

        this.boost({ atk: numBoosts }, user);
      }
    },
    name: "Brave Heart",
    rating: 3,
    num: 3022
}

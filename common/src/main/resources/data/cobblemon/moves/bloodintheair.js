{
    num: 3759,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blood in the Air",
    pp: 15,
    priority: 2,
    flags: { noassist: 1, failcopycat: 1 },
	boosts: {
      def: 2
    },
    volatileStatus: "bloodintheair",
    onTry(source) {
      return this.activePerHalf > 1;
    },
    condition: {
      duration: 1,
      onStart(target, source, effect) {
        if (effect?.id === "zpower") {
          this.add("-singleturn", target, "move: Blood in the Air", "[zeffect]");
        } else {
          this.add("-singleturn", target, "move: Blood in the Air");
        }

		this.damage(target.maxhp / 10, target, target, this.dex.moves.get("bloodintheair"));
      },
      onFoeRedirectTargetPriority: 1,
      onFoeRedirectTarget(target, source, source2, move) {
        if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
          if (move.smartTarget)
            move.smartTarget = false;
          this.debug("Blood in the Air redirected target of move");
          return this.effectState.target;
        }
      }
    },
    secondary: null,
    target: "adjacentAllyOrSelf",
    type: "Blood",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
}

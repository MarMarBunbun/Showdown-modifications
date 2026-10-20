{
	onTryHit(target, source, move) {
      if (target !== source && move.type === 'Flying') {
        if (!this.boost({atk: 1})) {
          this.add('-immune', target, '[from] ability: Turbine');
        }
        return null;
      }
	},
	onAnyRedirectTarget(target, source, source2, move) {
      if (move.type !== 'Flying' || move.flags['pledgecombo']) return;
      const redirectTarget = ['randomNormal', 'adjacentFoe'].includes(move.target) ? 'normal' : move.target;
      if (this.validTarget(this.effectState.target, source, redirectTarget)) {
        if (move.smartTarget) move.smartTarget = false;
        if (this.effectState.target !== target) {
          this.add('-activate', this.effectState.target, 'ability: Turbine');
        }
        return this.effectState.target;
      }
	},
	flags: { breakable: 1 },
	name: "Turbine",
	rating: 3,
	num: 3253
}

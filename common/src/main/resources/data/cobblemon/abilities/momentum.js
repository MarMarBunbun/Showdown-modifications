{
	onStart(target) {
      target.addVolatile("momentum")
	},
	flags: {},
	name: "Momentum",
	rating: 4,
	num: 3256,
	condition: {
      onStart(pokemon) {
        this.effectState.lastMove = '';
        this.effectState.numConsecutive = 0;
      },
      onTryMovePriority: -3,
      onTryMove(pokemon, target, move) {
        if (!pokemon.hasAbility('momentum')) {
          pokemon.removeVolatile('momentum');
          return;
        }
        if (this.effectState.lastMove === move.id && pokemon.moveLastTurnResult) {
          this.effectState.numConsecutive++;
        } else if (pokemon.volatiles['twoturnmove']) {
          if (this.effectState.lastMove !== move.id) {
            this.effectState.numConsecutive = 1;
          } else {
            this.effectState.numConsecutive++;
          }
        } else {
          this.effectState.numConsecutive = 0;
        }
        this.effectState.lastMove = move.id;
      },
      onModifyDamage(damage, source, target, move) {
        const dmgMod = [4096, 4915, 5734, 6553, 7372, 8192];
        const numConsecutive = this.effectState.numConsecutive > 5 ? 5 : this.effectState.numConsecutive;
        this.debug(`Current Momentum boost: ${dmgMod[numConsecutive]}/4096`);
        return this.chainModify([dmgMod[numConsecutive], 4096]);
      }
	}
}

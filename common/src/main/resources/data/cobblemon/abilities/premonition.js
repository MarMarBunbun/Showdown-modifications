{
	onModifySpA(relayVar, source, target, move) {
      if (move.id === "futuresight") {
        this.add('-activate', source, 'ability: Premonition');
        return this.chainModify(2);
      }
	},
	onAfterMove(pokemon, target, move) {
      if (move.category === 'Status' || move.flags['charge'] ||
        move.flags['futuremove'] || move.spreadHit || move.isZ || move.isMax) return;
      if (!pokemon.hasType(move.type)) return;
      if (!target.side.addSlotCondition(target, 'futuremove')) return;
      let premonitionHit = Object.assign({}, move)
      premonitionHit.secondaries = []
      premonitionHit.flags.futuremove = 1
      this.add('-activate', pokemon, 'ability: Premonition');
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        move: premonitionHit.id,
        source: pokemon,
        duration: 2,
        moveData: {
          id: premonitionHit.id,
          name: premonitionHit.name,
          accuracy: premonitionHit.accuracy,
          basePower: premonitionHit.basePower,
          category: premonitionHit.category,
          priority: premonitionHit.priority,
          flags: premonitionHit.flags,
          effectType: 'Move',
          type: premonitionHit.type,
        }
      });
	},
	flags: {},
	name: "Premonition",
	rating: 5,
	num: 3259
}

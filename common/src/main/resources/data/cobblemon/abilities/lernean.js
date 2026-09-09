{
	onUpdate(pokemon) {
      if (!pokemon.species.id.startsWith("Hydreigon-Mega") || !pokemon.hp || pokemon.transformed) return;
      const formeOrder = ["Hydreigon-Mega_Nine", "Hydreigon-Mega_Eight", "Hydreigon-Mega_Seven", "Hydreigon-Mega_Six", "Hydreigon-Mega"];
      const targetForme = Math.ceil((pokemon.hp / pokemon.maxhp) * 5) - 1;
      if (formeOrder.indexOf(pokemon.species.id) > targetForme) {
        pokemon.formeChange(formeOrder[targetForme], this.effect, true);
      }
	},
	onModifyMove(move, pokemon, target) {
      if (!pokemon.species.id.startsWith("Hydreigon-Mega")) return;
      if (move.category === "Status" || !move.basePower) return;
      const formes = ["Hydreigon-Mega", "Hydreigon-Mega_Six", "Hydreigon-Mega_Seven", "Hydreigon-Mega_Eight", "Hydreigon-Mega_Nine"];
      move.multihit = 5 + formes.indexOf(pokemon.species.id);
      if (move.secondaries) {


        delete move.self;
        if (move.id === "clangoroussoulblaze") delete move.selfBoost;
      }
	},
	onBasePower(basePower, pokemon, target, move) {
      if (!pokemon.species.id.startsWith("Hydreigon-Mega")) return;
      const formes = ["Hydreigon-Mega", "Hydreigon-Mega_Six", "Hydreigon-Mega_Seven", "Hydreigon-Mega_Eight", "Hydreigon-Mega_Nine"];
      const nhits = 5 + formes.indexOf(pokemon.species.id);
      return this.chainModify((1.15 + (0.075 * (nhits - 5))) / nhits);
	},
	onSourceDamagingHit(damage, target, pokemon, move) {
      if (pokemon.species.id.startsWith("Hydreigon-Mega") && move.secondaries) {
        delete move.secondaries;
      }
	},
	flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
	name: "Lernean",
	rating: 4.5,
	num: 3189,
}

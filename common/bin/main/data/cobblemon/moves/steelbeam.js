{
	flags: { protect: 1, mirror: 1, beam: 1 },
  num: 796,
  accuracy: 95,
  basePower: 140,
  category: "Special",
  name: "Steel Beam",
  pp: 5,
  priority: 0,
  mindBlownRecoil: true,
  onAfterMove(pokemon, target, move) {
      if (move.mindBlownRecoil && !move.multihit) {
        const hpBeforeRecoil = pokemon.hp;
        this.damage(Math.round(pokemon.maxhp / 2), pokemon, pokemon, this.dex.conditions.get("Steel Beam"), true);
        if (pokemon.hp <= pokemon.maxhp / 2 && hpBeforeRecoil > pokemon.maxhp / 2) {
          this.runEvent("EmergencyExit", pokemon, pokemon);
        }
      }
    },
  secondary: null,
  target: "normal",
  type: "Steel",
}

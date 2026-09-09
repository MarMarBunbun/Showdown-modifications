{
    num: 3743,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Desanguination",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1, magic: 1 },
    onHit(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.maxhp === 1) {
        return false;
      }
      this.directDamage(pokemon.maxhp / 4, pokemon, pokemon);
      this.boost({ atk: 2, spe: 1 }, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Blood",
    zMove: { effect: "heal" },
    contestType: "Cool"
}

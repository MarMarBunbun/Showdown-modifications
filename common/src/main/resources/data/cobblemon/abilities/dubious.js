{
    onSwitchIn(pokemon) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon) {
      if (!this.effectState.switchingIn) return;
      const targets = pokemon.side.pokemon.filter(p => !p.fainted && p !== pokemon);
      if (targets.length === 0) return;
      const target = targets[this.random(targets.length)]
      if (target) {
        pokemon.transformInto(target);

        if (pokemon.hasType("Dark")) return;
        if (!pokemon.addType("Dark")) return;
        this.add('-start', pokemon, 'typeadd', 'Dark', '[from] ability: Dubious');
      }
      this.effectState.switchingIn = false;
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1 },
    name: "Dubious",
    rating: 5,
    num: 3258
}

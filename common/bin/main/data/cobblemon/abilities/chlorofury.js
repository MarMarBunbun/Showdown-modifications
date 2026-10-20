{
    onStart(pokemon) {
      this.boost({ spe: 1 }, pokemon);

      const faintedAllies = pokemon.side.pokemon.filter(p => p.fainted && p !== pokemon).length;

      const boostAmount = Math.min(faintedAllies, 5);

      pokemon.volatiles["chlorofury"] = {
        counter: 0,
        duration: 3,
      };
      for (let i = 0; i < boostAmount; i++) {
        const result = this.boost({ spa: 1 }, pokemon);
        if (result) {
          pokemon.volatiles["chlorofury"].counter++;
        }
      }
    },
    onResidual(pokemon) {
      const data = pokemon.volatiles["chlorofury"];
      if (data) {
        data.duration--;
        if (data.duration <= 0) {

          if (data.counter > 0) {
            this.boost({ spa: -data.counter }, pokemon);
          }
          delete pokemon.volatiles["chlorofury"];
        }
      }
    },
    flags: {},
    name: "Chlorofury",
    rating: 4,
    num: 3182
}

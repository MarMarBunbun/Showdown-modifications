{
    onStart(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Chimaooze" || pokemon.level < 20 || pokemon.transformed)
        return;
      if (pokemon.hp > pokemon.maxhp / 4) {
        if (pokemon.species.id === "Chimaooze") {
          pokemon.formeChange("Chimaooze-Monster");
        }
      } else {
        if (pokemon.species.id === "chimaoozemonster") {
          pokemon.formeChange("Chimaooze");
        }
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Chimaooze" || pokemon.level < 20 || pokemon.transformed || !pokemon.hp)
        return;
      if (pokemon.hp > pokemon.maxhp / 4) {
        if (pokemon.species.id === "Chimaooze") {
          pokemon.formeChange("Chimaooze-Monster");
        }
      } else {
        if (pokemon.species.id === "chimaoozemonster") {
          pokemon.formeChange("Chimaooze");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Dirty Pool",
    rating: 3,
    num: 3169
}

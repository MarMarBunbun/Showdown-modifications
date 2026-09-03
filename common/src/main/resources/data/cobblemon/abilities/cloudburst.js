{
    onResidualOrder: 29,
    onResidual(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Rapidash-X" || pokemon.transformed) {
        return;
      }
      if (pokemon.hp <= pokemon.maxhp / 2 && !["X-Storm"].includes(pokemon.species.forme)) {
        pokemon.addVolatile("cloudburst");
      } else if (pokemon.hp > pokemon.maxhp / 2 && ["X-Storm"].includes(pokemon.species.forme)) {
        pokemon.addVolatile("cloudburst");
        pokemon.removeVolatile("cloudburst");
      }
    },
    onEnd(pokemon) {
      if (!pokemon.volatiles["cloudburst"] || !pokemon.hp)
        return;
      pokemon.transformed = false;
      delete pokemon.volatiles["cloudburst"];
      if (pokemon.species.baseSpecies === "Rapidash-X" && pokemon.species.battleOnly) {
        pokemon.formeChange(pokemon.species.battleOnly, this.effect, false, "[silent]");
      }
    },
    condition: {
      onStart(pokemon) {
        if (!pokemon.species.name.includes("X")) {
          if (pokemon.species.id !== "rapidashxstorm")
            pokemon.formeChange("Rapidash-x-Storm");
        } else {
          if (pokemon.species.id !== "rapidashxstorm")
            pokemon.formeChange("Rapidash-X-Storm");
        }
      },
      onEnd(pokemon) {
        if (["X-Storm"].includes(pokemon.species.forme)) {
          pokemon.formeChange(pokemon.species.battleOnly);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Cloud Burst",
    rating: 0,
    num: 3032
}

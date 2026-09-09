{
    onStart(pokemon) {
      this.singleEvent("TerrainChange", this.effect, this.effectState, pokemon);
    },
    onTerrainChange(pokemon) {
      if (pokemon.transformed)
        return;
      if (this.field.isTerrain("electricterrain")) {
        pokemon.addVolatile("neuronalactivation");
      }
    },
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!target.addVolatile("neuronalactivation")) {
          this.add("-immune", target, "[from] ability: Neuronal Activation");
        }
        return null;
      }
    },
    onEnd(pokemon) {
      pokemon.removeVolatile("neuronalactivation");
    },
    condition: {
      noCopy: true,
      onStart(target) {
        this.add("-start", target, "ability: Neuronal Activation");
      },
      onModifySTAB(stab, source, target, move) {
        if (move.forceSTAB || source.hasType(move.type)) {
          if (stab === 2) {
            return 2.25;
          }
          return 2;
        }
      },
      onMoveAborted(pokemon, target, move) {
        if (pokemon.hasType(move.type) && move.category !== "Status" && !this.field.isTerrain("electricterrain")) {
          pokemon.removeVolatile("neuronalactivation");
        }
      },
      onAfterMove(pokemon, target, move) {
        if (pokemon.hasType(move.type) && move.category !== "Status" && !this.field.isTerrain("electricterrain")) {
          pokemon.removeVolatile("neuronalactivation");
        }
      },
      onEnd(target) {
        this.add("-end", target, "ability: Neuronal Activation");
      }
    },
    name: "Neuronal Activation",
    rating: 3.5,
    num: 3232
}

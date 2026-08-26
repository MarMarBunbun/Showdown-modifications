{
    num: 213,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Attract",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
    volatileStatus: "attract",
    condition: {
      noCopy: true,

      onStart(pokemon, source, effect) {
        const isPheromonesActive = this.field.isWeather("pheromones");
        if (!isPheromonesActive && !((pokemon.gender === "M" && source.gender === "F") || (pokemon.gender === "F" && source.gender === "M"))) {
          this.debug("incompatible gender");
          return false;
        }
        if (!this.runEvent("Attract", pokemon, source)) {
          this.debug("Attract event failed");
          return false;
        }
        if (effect.name === "Cute Charm") {
          this.add("-start", pokemon, "Attract", "[from] ability: Cute Charm", "[of] " + source);
        } else if (effect.name === "Destiny Knot") {
          this.add("-start", pokemon, "Attract", "[from] item: Destiny Knot", "[of] " + source);
        } else {
          this.add("-start", pokemon, "Attract");
        }
      },
      onUpdate(pokemon) {
        if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles["attract"]) {
          this.debug("Removing Attract volatile on " + pokemon);
          pokemon.removeVolatile("attract");
        }
      },
      onBeforeMovePriority: 2,
      onBeforeMove(pokemon, target, move) {
        this.add("-activate", pokemon, "move: Attract", "[of] " + this.effectState.source);
        if (this.randomChance(1, 2)) {
          this.add("cant", pokemon, "Attract");
          return false;
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Attract", "[silent]");
      }
    },
    onTryImmunity(target, source) {
      return target.gender === "M" && source.gender === "F" || target.gender === "F" && source.gender === "M" || this.field.isWeather("pheromones");
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
}

{
    num: 3141,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Engulf",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterHit(target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Engulf", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost","hotcoals"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Engulf", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    onAfterSubDamage(damage, target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Engulf", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost","hotcoals"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Engulf", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
}

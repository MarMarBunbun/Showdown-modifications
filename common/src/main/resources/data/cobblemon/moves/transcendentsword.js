{
    num: 3782,
    accuracy: 100,
    basePower: 240,
    category: "Physical",
    name: "Transcendent Sword",
    pp: 1,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterHit(target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
      }
      const sideConditions = [
        "constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns",
        "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge",
        "slimetrail", "bloodsigil", "livewire", "permafrost", "safeguard", "reflect",
        "lightscreen", "auroraveil", "hotcoals"
      ];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
        }
        if (pokemon.hp && target.side.removeSideCondition(condition)) {
          this.add("-sideend", target.side, this.dex.conditions.get(condition).name, "[from] move: Transcendent Sword", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    onAfterSubDamage(damage, target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
      }
      const sideConditions = [
        "constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns",
        "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge",
        "slimetrail", "bloodsigil", "livewire", "permafrost", "safeguard", "reflect",
        "lightscreen", "auroraveil", "hotcoals"
      ];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
        }
        if (pokemon.hp && target.side.removeSideCondition(condition)) {
          this.add("-sideend", target.side, this.dex.conditions.get(condition).name, "[from] move: Transcendent Sword", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
	boosts: {
      evasion: -1
    },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
}

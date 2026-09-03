{
    num: 3091,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Deafening Noise",
    pp: 10,
    priority: 0,
    flags: {sound: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
	onTryHit(target) {
      if (target.getAbility().flags["cantsuppress"] || target.ability === "soundproof" || target.ability === "truant") {
        return false;
      }
    },
    onHit(pokemon) {
      const oldAbility = pokemon.setAbility("soundproof");
      if (oldAbility) {
        this.add("-ability", pokemon, "soundproof", "[from] move: Deafening Noise");
        return;
      }
      return oldAbility;
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Clever"
}

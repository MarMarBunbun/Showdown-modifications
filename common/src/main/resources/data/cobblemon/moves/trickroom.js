{
	flags: { mirror: 1, metronome: 1 },
	condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasAbility("persistent") || source?.hasAbility("trickster")) {
          this.add("-activate", source, "ability: Persistent", "[move] Trick Room");
          return 7;
        }
        return 5;
      },
      onFieldStart(target, source) {
        if (source?.hasAbility("persistent") || source?.hasAbility("trickster")) {
          this.add("-fieldstart", "move: Trick Room", "[of] " + source, "[persistent]");
        } else {
          this.add("-fieldstart", "move: Trick Room", "[of] " + source);
        }
      },
      onFieldRestart(target, source) {
        this.field.removePseudoWeather("trickroom");
      },

      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 1,
      onFieldEnd() {
        this.add("-fieldend", "move: Trick Room");
      }
    },
  num: 433,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Trick Room",
  pp: 5,
  priority: -7,
  pseudoWeather: "trickroom",
  secondary: null,
  target: "all",
  type: "Psychic",
  zMove: { boost: { accuracy: 1 } },
  contestType: "Clever",
}

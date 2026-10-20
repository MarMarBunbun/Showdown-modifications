{
	flags: { mirror: 1, metronome: 1 },
	condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasAbility("persistent") || source?.hasAbility("trickster")) {
          this.add("-activate", source, "ability: Persistent", "[move] Magic Room");
          return 7;
        }
        return 5;
      },
      onFieldStart(target, source) {
        if (source?.hasAbility("persistent") || source?.hasAbility("trickster")) {
          this.add("-fieldstart", "move: Magic Room", "[of] " + source, "[persistent]");
        } else {
          this.add("-fieldstart", "move: Magic Room", "[of] " + source);
        }
        for (const mon of this.getAllActive()) {
          this.singleEvent("End", mon.getItem(), mon.itemState, mon);
        }
      },
      onFieldRestart(target, source) {
        this.field.removePseudoWeather("magicroom");
      },

      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 6,
      onFieldEnd() {
        this.add("-fieldend", "move: Magic Room", "[of] " + this.effectState.source);
      }
    },
  num: 478,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Magic Room",
  pp: 10,
  priority: 0,
  pseudoWeather: "magicroom",
  secondary: null,
  target: "all",
  type: "Psychic",
  zMove: { boost: { spd: 1 } },
  contestType: "Clever",
}

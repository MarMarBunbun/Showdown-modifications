{
	flags: { mirror: 1, metronome: 1 },
	condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasAbility("persistent") || source?.hasAbility("trickster")) {
          this.add("-activate", source, "ability: Persistent", "[move] Wonder Room");
          return 7;
        }
        return 5;
      },
      onModifyMove(move, source, target) {
        if (!move.overrideOffensiveStat)
          return;
        const statAndBoosts = move.overrideOffensiveStat;
        if (!["def", "spd"].includes(statAndBoosts))
          return;
        move.overrideOffensiveStat = statAndBoosts === "def" ? "spd" : "def";
        this.hint(`${move.name} uses ${statAndBoosts === "def" ? "" : "Sp. "}Def boosts when Wonder Room is active.`);
      },
      onFieldStart(field, source) {
        if (source?.hasAbility("persistent") || source?.hasAbility("trickster")) {
          this.add("-fieldstart", "move: Wonder Room", "[of] " + source, "[persistent]");
        } else {
          this.add("-fieldstart", "move: Wonder Room", "[of] " + source);
        }
      },
      onFieldRestart(target, source) {
        this.field.removePseudoWeather("wonderroom");
      },

      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 5,
      onFieldEnd() {
        this.add("-fieldend", "move: Wonder Room");
      }
    },
  num: 472,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Wonder Room",
  pp: 10,
  priority: 0,
  pseudoWeather: "wonderroom",
  secondary: null,
  target: "all",
  type: "Psychic",
  zMove: { boost: { spd: 1 } },
  contestType: "Clever",
}

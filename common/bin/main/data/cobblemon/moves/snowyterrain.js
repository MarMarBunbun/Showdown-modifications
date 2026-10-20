{
    num: 3827,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Snowy Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1 },
    terrain: "snowyterrain",
    condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Ice" && attacker.isGrounded()) {
          this.debug("snowy terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
	  onModifySpe(spe, pokemon) {
        if (
          pokemon.isGrounded() &&
          !pokemon.hasType("Ice")
        ) {
          this.debug("Snowy Terrain Speed drop for non-Ice grounded Pokémon");
          return this.chainModify([2731, 4096]);
        }
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Snowy Terrain", "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-fieldstart", "move: Snowy Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Snowy Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Ice",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
}

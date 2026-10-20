{
    num: 3839,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shining Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1 },
    terrain: "shiningterrain",
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
        if ((move.type === "Fire" || move.type === "Light") && attacker.isGrounded()) {
          this.debug("shining terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Shining Terrain", "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-fieldstart", "move: Shining Terrain");
        }
      },
	  onResidualOrder: 5,
      onResidualSubOrder: 2,
      onResidual(pokemon) {
        if (
          pokemon.isGrounded() &&
          !pokemon.isSemiInvulnerable() &&
          !pokemon.hasType("Fire") &&
		  !pokemon.hasType("Light")
        ) {
          this.damage(pokemon.baseMaxhp / 16, pokemon);
        } else {
          this.debug(`Pokemon semi-invuln, Fire type, or not grounded; Shining Terrain damage skipped`);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Shining Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Fire",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
}

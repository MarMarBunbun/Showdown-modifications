{
    num: 3838,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Midnight Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1 },
    terrain: "midnightterrain",
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
        if (move.type === "Dark" && attacker.isGrounded()) {
          this.debug("midnight terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
	  onModifyAccuracy(accuracy, target, source, move) {
        if (!source || !source.isGrounded() || !source.isActive) return;
        if (["Dark", "Ghost", "Eldritch", "Blood"].some(t => source.hasType(t))) return;
        this.debug("Midnight Terrain - Accuracy reduced");
        return this.chainModify(0.9);
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Midnight Terrain", "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-fieldstart", "move: Midnight Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Midnight Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Dark",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
}

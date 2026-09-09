{
    num: 3778,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Permafrost",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "permafrost",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Permafrost");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 5) return false;
        this.effectState.layers++;
        this.add("-sidestart", side, "move: Permafrost", "[up to " + this.effectState.layers + " layers]");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter")) return;
        if (pokemon.hasType("Fire") || pokemon.hasType("Ice")) {
          this.add("-sideend", pokemon.side, "move: Permafrost", "[of] " + pokemon);
          pokemon.side.removeSideCondition("permafrost");
          return;
        }
        let chance = this.effectState.layers * 10;

        const weather = this.field.weather;
        if (weather === "hail" || weather === "snow") {
          chance *= 2;
        }
        if (this.randomChance(chance, 100)) {
          pokemon.trySetStatus("frz", pokemon.side.foe.active[0]);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Ice",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
}

{
    num: 3777,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Livewire",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "livewire",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Livewire");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 5) return false;
        this.effectState.layers++;
        this.add("-sidestart", side, "move: Livewire", "[up to " + this.effectState.layers + " layers]");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter")) return;
        if (
          pokemon.hasType("Electric") ||
          pokemon.hasType("Ground") ||
          pokemon.hasType("Plastic")
        ) {
          this.add("-sideend", pokemon.side, "move: Livewire", "[of] " + pokemon);
          pokemon.side.removeSideCondition("livewire");
          return;
        }
        const chance = this.effectState.layers * 20;
        if (this.randomChance(chance, 100)) {
          pokemon.trySetStatus("par", pokemon.side.foe.active[0]);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Electric",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
}

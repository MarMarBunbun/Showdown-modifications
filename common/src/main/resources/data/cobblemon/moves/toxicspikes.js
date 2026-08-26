{
  num: 390,
	flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
	condition: {

      onSideStart(side) {
        this.add("-sidestart", side, "move: Toxic Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 2)
          return false;
        this.add("-sidestart", side, "move: Toxic Spikes");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded())
          return;
        if (pokemon.hasType("Poison")) {
          this.add("-sideend", pokemon.side, "move: Toxic Spikes", "[of] " + pokemon);
          pokemon.side.removeSideCondition("toxicspikes");
        } else if (pokemon.hasType("Steel") || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter")) {
          return;
        } else if (this.effectState.layers >= 2) {
          pokemon.trySetStatus("tox", pokemon.side.foe.active[0]);
        } else {
          pokemon.trySetStatus("psn", pokemon.side.foe.active[0]);
        }
      }
    }
}

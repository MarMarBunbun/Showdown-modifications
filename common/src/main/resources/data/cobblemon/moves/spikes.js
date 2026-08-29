{
	flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
	condition: {

      onSideStart(side) {
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 3)
          return false;
        this.add("-sidestart", side, "Spikes");
        this.effectState.layers++;
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots") || pokemon.hasAbility("globetrotter"))
          return;
        const damageAmounts = [0, 3, 4, 6];
        this.damage(damageAmounts[this.effectState.layers] * pokemon.maxhp / 24);
      }
    },
  num: 191,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Spikes",
  pp: 20,
  priority: 0,
  sideCondition: "spikes",
  secondary: null,
  target: "foeSide",
  type: "Ground",
  zMove: { boost: { def: 1 } },
  contestType: "Clever",
}

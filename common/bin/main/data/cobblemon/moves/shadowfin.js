{
    num: 3682,
    accuracy: 100,
    basePower: 80,
	basePowerCallback(pokemon) {
      const speedBoosts = pokemon.boosts.spe || 0;
      const extraPower = speedBoosts > 0 ? 10 * speedBoosts : 0;
      return 80 + extraPower;
	},
    category: "Physical",
    name: "Shadow Fin",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Tough"
}

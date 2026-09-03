{
    num: 456,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Heal Order",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1, metronome: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (this.field.isWeather(["Pheromones"])) {
        factor = 0.667;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Bug",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
}

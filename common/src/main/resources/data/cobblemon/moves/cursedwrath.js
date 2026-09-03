{
    num: 3081,
    accuracy: 100,
    basePower: 0,
    basePowerCallback(pokemon, target) {
      const userHPPercentage = (pokemon.hp / pokemon.maxhp) * 100;
      let bp;
      if (userHPPercentage >= 68.75) {
        bp = 20;
      } else if (userHPPercentage >= 35.42) {
        bp = 40;
      } else if (userHPPercentage >= 20.83) {
        bp = 80;
      } else if (userHPPercentage >= 10.42) {
        bp = 100;
      } else if (userHPPercentage >= 4.17) {
        bp = 150;
      } else {
        bp = 200;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Special",
    name: "Cursed Wrath",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 },
    contestType: "Cute"
}

{
    num: 3893,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Titan's Wrath",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    beforeMoveCallback(pokemon, target, move) {

      let type = pokemon.types[0];
      let stat = pokemon.getBestStat(true, true);
      move.type = type;
      move.overrideOffensiveStat = stat;
      move.category = stat === "atk" || stat === "def" ? "Physical" : "Special";
      return false;
    },
    secondary: null,
    target: "normal",
    type: "Mystery",
    contestType: "Cool"
}

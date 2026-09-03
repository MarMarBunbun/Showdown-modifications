{
    num: 3624,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Sizzle Slam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onHit(pokemon, source) {
      const item = pokemon.getItem();
      if ((item.isBerry || item.isGem) && pokemon.takeItem(source)) {
        this.add("-enditem", pokemon, item.name, "[from] move: Sizzle Slam");
      }
    },
    secondary: {
      chance: 100,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Tough"
}

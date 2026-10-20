{
    num: 3843,
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Blizzard Frostbite",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, wind: 1 },
    onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
    },
    secondaries: [
      {
        chance: 10,
        status: "fbt"
      },
      {
        chance: 5,
        status: "frz"
      }
    ],
    target: "allAdjacentFoes",
    type: "Ice",
    contestType: "Beautiful"
}

{
	flags: { protect: 1, mirror: 1, metronome: 1, wind: 1, legendary: 1 },
  num: 847,
  accuracy: 80,
  basePower: 100,
  category: "Special",
  name: "Wildbolt Storm",
  pp: 10,
  priority: 0,
  onModifyMove(move, pokemon, target) {
      if (target && ["raindance", "primordialsea"].includes(target.effectiveWeather())) {
        move.accuracy = true;
      }
    },
  secondary: {
      chance: 20,
      status: "par"
    },
  target: "allAdjacentFoes",
  type: "Electric",
}

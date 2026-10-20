{
	flags: { protect: 1, mirror: 1, nonsky: 1, legendary: 1 },
  num: 615,
  accuracy: 100,
  basePower: 90,
  category: "Physical",
  isNonstandard: "Past",
  name: "Thousand Waves",
  pp: 10,
  priority: 0,
  onHit(target, source, move) {
      if (source.isActive)
        target.addVolatile("trapped", source, move, "trapper");
    },
  secondary: null,
  target: "allAdjacentFoes",
  type: "Ground",
  contestType: "Tough",
}

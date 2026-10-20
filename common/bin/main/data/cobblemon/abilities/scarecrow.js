{
    onTryHit(target, source, move) {
      if (move.type === "Flying") {
        this.add("-immune", target, "[from] ability: Scarecrow");
        return null;
      }
	},
	name: "Scarecrow",
	rating: 2,
    num: 3131
}

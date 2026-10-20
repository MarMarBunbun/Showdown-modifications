{
	flags: { mirror: 1, bypasssub: 1 },
  num: 621,
  accuracy: true,
  basePower: 100,
  category: "Physical",
  name: "Hyperspace Fury",
  pp: 5,
  priority: 0,
  breaksProtect: true,
  onTry(source) {
      if (source.species.name === "Hoopa-Unbound") {
        return;
      }
      this.hint("Only a Pokemon whose form is Hoopa Unbound can use this move.");
      if (source.species.name === "Hoopa") {
        this.attrLastMove("[still]");
        this.add("-fail", source, "move: Hyperspace Fury", "[forme]");
        return null;
      }
      this.attrLastMove("[still]");
      this.add("-fail", source, "move: Hyperspace Fury");
      return null;
    },
  self: {
      boosts: {
        def: -1
      }
    },
  noSketch: true,
  secondary: null,
  target: "normal",
  type: "Dark",
  contestType: "Tough",
}

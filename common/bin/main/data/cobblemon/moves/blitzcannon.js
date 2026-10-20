{
    num: 3667,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Blitz Cannon",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
	onHit(target, source) {
      if (source.ability !== "megalauncher") {
        source.setAbility("megalauncher");
        this.add("-ability", source, "Mega Launcher", "[from] move: Blitz Cannon");
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
}

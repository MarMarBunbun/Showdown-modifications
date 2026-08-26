{
    num: 3888,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Zealous Dance",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, dance: 1 },
    onHit(target, source, move) {
      if (!move.hasSheerForce) {
        source.addVolatile("zealousdance");
      }
    },
    condition: {
      noCopy: true,
      onStart(target, source, sourceEffect) {
        this.add("-activate", source, "move: Zealous Dance");
      },
      onBasePower(relayVar, source, target, move) {
        if (move.type === "Fire") {
          this.add("-end", source, "zealousdance");
          source.removeVolatile("zealousdance");
          return this.chainModify(1.5);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Cool"
}

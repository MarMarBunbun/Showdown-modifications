{
    num: 3772,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Viscous Mimicry",
    pp: 10,
    priority: 0,
    flags: { bypasssub: 1, allyanim: 1, metronome: 1 },
    onHit(target, source) {
      let i;
      for (i in target.boosts) {
        source.boosts[i] = target.boosts[i];
      }
      const volatilesToCopy = ["focusenergy", "gmaxchistrike", "laserfocus"];
      for (const volatile of volatilesToCopy) {
        if (target.volatiles[volatile]) {
          source.addVolatile(volatile);
          if (volatile === "gmaxchistrike")
            source.volatiles[volatile].layers = target.volatiles[volatile].layers;
        } else {
          source.removeVolatile(volatile);
        }
      }
      this.add("-copyboost", source, target, "[from] move: Viscous Mimicry");
    },
    secondary: null,
    target: "normal",
    type: "Slime",
    zMove: { effect: "heal" },
    contestType: "Clever"
}

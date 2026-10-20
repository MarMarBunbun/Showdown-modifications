{
    num: 3762,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Adrenaline Catheter",
    pp: 5,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1, heal: 1 },
	heal: [2, 10],
    stallingMove: true,
    volatileStatus: "endure",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Endure");
      },
      onDamagePriority: -10,
      onDamage(damage, target, source, effect) {
        if (effect?.effectType === "Move" && damage >= target.hp) {
          this.add("-activate", target, "move: Endure");
          return target.hp - 1;
        }
      }
    },
    secondary: null,
    target: "adjacentAlly",
    type: "Blood",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
}

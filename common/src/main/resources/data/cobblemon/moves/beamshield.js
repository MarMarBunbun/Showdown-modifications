{
    num: 3584,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Beam Shield",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "spikyshield",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    secondary: null,
    target: "self",
    type: "Fairy",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
}

{
    num: 3495,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Undegradeable",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "endure",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    secondary: null,
    target: "self",
    type: "Plastic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
}

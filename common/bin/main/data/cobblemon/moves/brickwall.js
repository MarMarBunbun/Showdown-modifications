{
    num: 3502,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Brick Wall",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "protect",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    secondary: null,
    target: "self",
    type: "Plastic",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
}

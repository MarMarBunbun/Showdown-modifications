{
    num: 3478,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Firewall",
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
    type: "Digital",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
}

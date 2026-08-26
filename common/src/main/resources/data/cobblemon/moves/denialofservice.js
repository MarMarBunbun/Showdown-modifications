{
    num: 3646,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Denial of Service",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
    volatileStatus: "disable",
    onTryHit(target) {
      if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === "struggle") {
        return false;
      }
    },

    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
}

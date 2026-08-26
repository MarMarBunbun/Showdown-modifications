{
    num: 3835,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Flare Up",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, allyanim: 1, metronome: 1 },
    volatileStatus: "flareup",
    onTryHit(target) {
      if (!this.queue.willMove(target) && target.activeTurns)
        return false;
    },
    condition: {
      onModifyTypePriority: -2,
      onModifyType(move) {
        if (move.id !== "struggle" && move.type === "Normal") {
          this.debug("Flare Up making move type fire");
          move.type = "Fire";
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Fire",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
}

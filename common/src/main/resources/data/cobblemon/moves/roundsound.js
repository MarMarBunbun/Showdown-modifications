{
    num: 3334,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(target, source, move) {
      if (move.sourceEffect === "roundsound") {
        this.debug("BP doubled");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Special",
    name: "Round Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    onTry(source, target, move) {
      for (const action of this.queue.list) {
        if (!action.pokemon || !action.move || action.maxMove || action.zmove)
          continue;
        if (action.move.id === "roundsound") {
          this.queue.prioritizeAction(action, move);
          return;
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Beautiful"
}

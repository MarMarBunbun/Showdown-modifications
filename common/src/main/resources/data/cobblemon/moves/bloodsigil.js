{
    num: 3734,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blood Sigil",
    pp: 10,
    priority: 0,
    flags: { reflectable: 1, metronome: 1, mustpressure: 1, magic: 1 },
    sideCondition: "bloodsigil",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Blood Sigil");
      },
      onModifyDamage(damage, source, target, move) {
        if (!source.isAlly(target)) return;
        if (move.type === "Eldritch" || move.type === "Ghost" || move.type === "Blood" || move.flags["magic"]) {
          this.debug("Blood Sigil boost");
          return this.chainModify([4915, 4096]);
        }
      }
    },
    secondary: null,
    target: "allySide",
    type: "Blood",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
}

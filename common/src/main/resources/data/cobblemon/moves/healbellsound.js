{
    num: 3209,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Heal Bell Sound",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, sound: 1, distance: 1, bypasssub: 1 },
    onHit(target, source) {
      this.add("-activate", source, "move: Heal Bell");
      let success = false;
      const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
      for (const ally of allies) {
        if (ally !== source && ally.hasAbility("soundproof"))
          continue;
        if (ally.cureStatus())
          success = true;
      }
      return success;
    },
    target: "allyTeam",
    type: "Sound",
    zMove: { effect: "heal" },
    contestType: "Beautiful"
}

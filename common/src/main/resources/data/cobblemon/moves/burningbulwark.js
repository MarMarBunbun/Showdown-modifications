{
	flags: { metronome: 1, noassist: 1, failcopycat: 1, legendary: 1 },
  num: 908,
  accuracy: true,
  basePower: 0,
  category: "Status",
  name: "Burning Bulwark",
  pp: 10,
  priority: 4,
  stallingMove: true,
  volatileStatus: "burningbulwark",
  condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        if (!move.flags["protect"] || move.category === "Status") {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source.getVolatile("lockedmove");
        if (lockedmove) {
          if (source.volatiles["lockedmove"].duration === 2) {
            delete source.volatiles["lockedmove"];
          }
        }
        if (this.checkMoveMakesContact(move, source, target)) {
          source.trySetStatus("brn", target);
        }
        return this.NOT_FAIL;
      },
      onHit(target, source, move) {
        if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target)) {
          source.trySetStatus("brn", target);
        }
      }
    },
  secondary: null,
  target: "self",
  type: "Fire",
}

{
    onPrepareHit(source, target, move) {
      if (this.effectState.unstable)
        return;
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.effectState.unstable = true;
        this.add("-start", source, "typechange", type, "[from] ability: Unstable");
      }
    },
	onAfterMoveSecondary(target, source, move) {
      if (!target.hp)
        return;
      const type = move.type;
      if (target.isActive && move.effectType === "Move" && move.category !== "Status" && type !== "???" && !target.hasType(type)) {
        if (!target.setType(type))
          return false;
        this.add("-start", target, "typechange", type, "[from] ability: Unstable");
        if (target.side.active.length === 2 && target.position === 1) {
          const action = this.queue.willMove(target);
          if (action && action.move.id === "curse") {
            action.targetLoc = -1;
          }
        }
      }
    },
    onSwitchIn(pokemon) {
      delete this.effectState.unstable;
    },
    name: "Unstable",
    rating: 4,
    num: 3158
}

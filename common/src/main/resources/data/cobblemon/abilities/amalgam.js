{
    onPrepareHit(source, target, move) {
      if (this.effectState.protean)
        return;
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.effectState.protean = true;
        this.add("-start", source, "typechange", type, "[from] ability: Amalgam");
      }
    },
    onSwitchIn(pokemon) {
      delete this.effectState.protean;
    },
    name: "Amalgam",
    rating: 4,
    num: 3006
}

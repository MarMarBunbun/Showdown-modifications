{
    num: 3775,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Hotspot",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onTryHit(target, source, move) {
      if (!source.status)
        return false;
      move.status = source.status;
    },
    self: {
      onHit(pokemon) {
        pokemon.cureStatus();
      }
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { boost: { spa: 2 } },
    contestType: "Clever"
}

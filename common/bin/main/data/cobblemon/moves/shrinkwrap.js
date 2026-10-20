{
    num: 3776,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shrink Wrap",
    pp: 5,
    priority: 0,
    flags: { reflectable: 1, mirror: 1, metronome: 1 },
    onHit(target, source, move) {
      return target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
}

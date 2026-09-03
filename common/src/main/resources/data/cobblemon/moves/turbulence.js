{
    num: 3895,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Turbulence",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, wind: 1 },
    onHit(target, source, move) {
      if (!move.hasSheerForce) {
        this.add('-start', source, 'Turbulence');
        this.sides.forEach(side => {
          side.addSideCondition("turbulence");
        });
      }
    },
    condition: {

      duration: 3,
    },
    secondary: null,
    target: "allAdjacent",
    type: "Flying",
    contestType: "Beautiful"
}

{
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 },
  num: 804,
  accuracy: 100,
  basePower: 70,
  basePowerCallback(source, target, move) {
      if (this.field.isTerrain("electricterrain") && target.isGrounded()) {
        if (!source.isAlly(target))
          this.hint(`${move.name}'s BP doubled on grounded target.`);
        return move.basePower * 2;
      }
      return move.basePower;
    },
  category: "Special",
  name: "Rising Voltage",
  pp: 20,
  priority: 0,
  secondary: null,
  target: "normal",
  type: "Electric",
  maxMove: { basePower: 140 },
}

{
    num: 107,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Minimize",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1 },
    volatileStatus: "minimize",
    condition: {
      noCopy: true,
      onRestart: () => null,
      onSourceModifyDamage(damage, source, target, move) {
        const boostedMoves = [
          "fairyrush",
		  "stomp",
          "steamroller",
          "bodyslam",
          "flyingpress",
          "dragonrush",
          "heatcrash",
          "heavyslam",
          "maliciousmoonsault"
        ];
        if (boostedMoves.includes(move.id)) {
          return this.chainModify(2);
        }
      },
      onAccuracy(accuracy, target, source, move) {
        const boostedMoves = [
          "fairyrush",
		  "stomp",
          "steamroller",
          "bodyslam",
          "flyingpress",
          "dragonrush",
          "heatcrash",
          "heavyslam",
          "maliciousmoonsault"
        ];
        if (boostedMoves.includes(move.id)) {
          return true;
        }
        return accuracy;
      }
    },
    boosts: {
      evasion: 2
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
}

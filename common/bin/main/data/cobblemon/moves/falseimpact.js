{
    num: 3848,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "False Impact",
    pp: 10,
    priority: 3,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTry(source) {
      if (source.activeMoveActions > 1) {
        this.hint("False Impact only works on your first turn out.");
        return false;
      }
    },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fairy", type);
    },
    secondary: {
      chance: 100,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Dark",
    contestType: "Cute"
}

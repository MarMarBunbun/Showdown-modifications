{
    num: 3280,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Overhead Strike",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    basePowerCallback(pokemon, target, move) {
      if (target.status || target.hasAbility("comatose")) {
        this.debug("BP doubled from status condition");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Cute"
}

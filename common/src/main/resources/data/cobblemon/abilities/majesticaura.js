{
    onFoeTryMove(target, source, move) {
      const targetAllExceptions = ["perishsong", "flowershield", "rototiller"];
      if (move.target === "foeSide" || move.target === "all" && !targetAllExceptions.includes(move.id)) {
        return;
      }
      const dazzlingHolder = this.effectState.target;
      if ((source.isAlly(dazzlingHolder) || move.target === "all") && move.priority > 0.1) {
        this.attrLastMove("[still]");
        this.add("cant", dazzlingHolder, "ability: Majestic Aura", move, "[of] " + target);
        return false;
      }
    },
    isBreakable: true,
    name: "Majestic Aura",
    rating: 2.5,
    num: 3100
}

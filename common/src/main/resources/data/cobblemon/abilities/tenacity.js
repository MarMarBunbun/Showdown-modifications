{

    onModifyMove(move) {
      if (!move?.flags["contact"] || move.target === "self")
        return;
      if (!move.secondaries) {
        move.secondaries = [];
      }
      move.secondaries.push({
        chance: 30,
        volatileStatus: "flinch",
        ability: this.dex.abilities.get("tenacity")
      });
    },
    name: "Tenacity",
    rating: 2,
    num: 3155
}

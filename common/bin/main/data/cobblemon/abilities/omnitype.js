{
    onStart(target) {
      this.add("-activate", target, "ability: Omnitype");
    },
    onTryHit(source, target, move) {
      source.setType([
        "Bug", "Dark", "Dragon", "Electric",
        "Fairy", "Fighting", "Fire", "Flying",
        "Ghost", "Grass", "Ground", "Ice", "Normal",
        "Poison", "Psychic", "Rock", "Steel", "Water"
      ]);
    },
    onFoeAfterMove(source, target, move) {
        target.setType(target.baseTypes);
    },
    flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
    name: "Omnitype",
    rating: 4,
    num: 3188,
}

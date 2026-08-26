{
    onStart(pokemon) {
      this.add("-ability", pokemon, "Irrelephant");
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    name: "Irrelephant",
    rating: 3,
    num: 3091
}

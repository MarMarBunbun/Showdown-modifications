{
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.type === "Bug") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    name: "Busy Bee",
    rating: 4,
    num: 3024
}

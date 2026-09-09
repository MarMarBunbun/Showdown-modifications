{
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    name: "Nefarious",
    rating: 4,
    num: 3104
}

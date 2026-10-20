{
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.type === "Fire" && pokemon.hp === pokemon.maxhp) {
        return priority + 1;
      }
    },
    name: "Blazing Soul",
    rating: 4,
    num: 3016
}

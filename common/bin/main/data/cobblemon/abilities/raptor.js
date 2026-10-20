{
    onModifyPriority(priority, pokemon, target, move) {
      if (target && target.hp <= target.maxhp / 4) {
        return priority + 1;
      }
    },
    flags: {},
    name: "Raptor",
    rating: 1.5,
    num: 3175
}

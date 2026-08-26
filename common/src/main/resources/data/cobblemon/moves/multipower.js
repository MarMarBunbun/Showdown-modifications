{
    num: 3830,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Multi-Power",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      if (pokemon.ignoringItem())
        return;
      const item = pokemon.getItem();
      if (item.id && item.onPlate && !item.zMove) {
        move.type = item.onPlate;
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
}

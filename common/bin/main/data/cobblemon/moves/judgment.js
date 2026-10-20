{
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 },
  num: 449,
  accuracy: 100,
  basePower: 100,
  category: "Special",
  name: "Judgment",
  pp: 10,
  priority: 0,
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
  contestType: "Beautiful",
}

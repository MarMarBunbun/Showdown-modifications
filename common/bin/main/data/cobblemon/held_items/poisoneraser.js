{
    name: "Poison Eraser",
    spritenum: 3193,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Poison')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.poisonEraserOriginalTypes = types;
        pokemon.itemData.poisonEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Poison');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Poison Eraser');
            pokemon.itemData.poisonEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.poisonEraserOriginalTypes &&
        !pokemon.itemData.poisonEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Poison Eraser');
          pokemon.itemData.poisonEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.poisonEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Poison Eraser');
        }
        const originalTypes = pokemon.itemData.poisonEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.poisonEraserOriginalTypes;
        delete pokemon.itemData.poisonEraserActivated;
      }
    },
    num: 3193,
    gen: 9
}

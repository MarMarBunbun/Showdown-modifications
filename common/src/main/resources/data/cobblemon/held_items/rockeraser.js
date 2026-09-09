{
    name: "Rock Eraser",
    spritenum: 3195,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Rock')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.rockEraserOriginalTypes = types;
        pokemon.itemData.rockEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Rock');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Rock Eraser');
            pokemon.itemData.rockEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.rockEraserOriginalTypes &&
        !pokemon.itemData.rockEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Rock Eraser');
          pokemon.itemData.rockEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.rockEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Rock Eraser');
        }
        const originalTypes = pokemon.itemData.rockEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.rockEraserOriginalTypes;
        delete pokemon.itemData.rockEraserActivated;
      }
    },
    num: 3195,
    gen: 9
}

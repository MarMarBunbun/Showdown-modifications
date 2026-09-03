{
    name: "Ground Eraser",
    spritenum: 3190,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ground')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.groundEraserOriginalTypes = types;
        pokemon.itemData.groundEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ground');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ground Eraser');
            pokemon.itemData.groundEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.groundEraserOriginalTypes &&
        !pokemon.itemData.groundEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ground Eraser');
          pokemon.itemData.groundEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.groundEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ground Eraser');
        }
        const originalTypes = pokemon.itemData.groundEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.groundEraserOriginalTypes;
        delete pokemon.itemData.groundEraserActivated;
      }
    },
    num: 3190,
    gen: 9
}

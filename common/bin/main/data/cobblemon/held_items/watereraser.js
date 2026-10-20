{
    name: "Water Eraser",
    spritenum: 3197,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Water')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.waterEraserOriginalTypes = types;
        pokemon.itemData.waterEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Water');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Water Eraser');
            pokemon.itemData.waterEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.waterEraserOriginalTypes &&
        !pokemon.itemData.waterEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Water Eraser');
          pokemon.itemData.waterEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.waterEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Water Eraser');
        }
        const originalTypes = pokemon.itemData.waterEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.waterEraserOriginalTypes;
        delete pokemon.itemData.waterEraserActivated;
      }
    },
    num: 3197,
    gen: 9
}

{
    name: "Ice Eraser",
    spritenum: 3191,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ice')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.iceEraserOriginalTypes = types;
        pokemon.itemData.iceEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ice');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ice Eraser');
            pokemon.itemData.iceEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.iceEraserOriginalTypes &&
        !pokemon.itemData.iceEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ice Eraser');
          pokemon.itemData.iceEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.iceEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ice Eraser');
        }
        const originalTypes = pokemon.itemData.iceEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.iceEraserOriginalTypes;
        delete pokemon.itemData.iceEraserActivated;
      }
    },
    num: 3191,
    gen: 9
}

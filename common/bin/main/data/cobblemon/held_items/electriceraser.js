{
    name: "Electric Eraser",
    spritenum: 3183,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Electric')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.electricEraserOriginalTypes = types;
        pokemon.itemData.electricEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Electric');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Electric Eraser');
            pokemon.itemData.electricEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.electricEraserOriginalTypes &&
        !pokemon.itemData.electricEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Electric Eraser');
          pokemon.itemData.electricEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.electricEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Electric Eraser');
        }
        const originalTypes = pokemon.itemData.electricEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.electricEraserOriginalTypes;
        delete pokemon.itemData.electricEraserActivated;
      }
    },
    num: 3183,
    gen: 9
}

{
    name: "Grass Eraser",
    spritenum: 3189,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Grass')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.grassEraserOriginalTypes = types;
        pokemon.itemData.grassEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Grass');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Grass Eraser');
            pokemon.itemData.grassEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.grassEraserOriginalTypes &&
        !pokemon.itemData.grassEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Grass Eraser');
          pokemon.itemData.grassEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.grassEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Grass Eraser');
        }
        const originalTypes = pokemon.itemData.grassEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.grassEraserOriginalTypes;
        delete pokemon.itemData.grassEraserActivated;
      }
    },
    num: 3189,
    gen: 9
}

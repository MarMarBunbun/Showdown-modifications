{
    name: "Fire Eraser",
    spritenum: 3186,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Fire')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fireEraserOriginalTypes = types;
        pokemon.itemData.fireEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Fire');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Fire Eraser');
            pokemon.itemData.fireEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fireEraserOriginalTypes &&
        !pokemon.itemData.fireEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Fire Eraser');
          pokemon.itemData.fireEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fireEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Fire Eraser');
        }
        const originalTypes = pokemon.itemData.fireEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.fireEraserOriginalTypes;
        delete pokemon.itemData.fireEraserActivated;
      }
    },
    num: 3186,
    gen: 9
}

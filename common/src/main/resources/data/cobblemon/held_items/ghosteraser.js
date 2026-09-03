{
    name: "Ghost Eraser",
    spritenum: 3188,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ghost')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.ghostEraserOriginalTypes = types;
        pokemon.itemData.ghostEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ghost');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ghost Eraser');
            pokemon.itemData.ghostEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.ghostEraserOriginalTypes &&
        !pokemon.itemData.ghostEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ghost Eraser');
          pokemon.itemData.ghostEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.ghostEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ghost Eraser');
        }
        const originalTypes = pokemon.itemData.ghostEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.ghostEraserOriginalTypes;
        delete pokemon.itemData.ghostEraserActivated;
      }
    },
    num: 3188,
    gen: 9
}

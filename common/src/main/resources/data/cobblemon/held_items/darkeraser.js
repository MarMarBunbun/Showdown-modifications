{
    name: "Dark Eraser",
    spritenum: 3181,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Dark')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.darkEraserOriginalTypes = types;
        pokemon.itemData.darkEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Dark');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Dark Eraser');
            pokemon.itemData.darkEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.darkEraserOriginalTypes &&
        !pokemon.itemData.darkEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Dark Eraser');
          pokemon.itemData.darkEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.darkEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Dark Eraser');
        }
        const originalTypes = pokemon.itemData.darkEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.darkEraserOriginalTypes;
        delete pokemon.itemData.darkEraserActivated;
      }
    },
    num: 3181,
    gen: 9
}

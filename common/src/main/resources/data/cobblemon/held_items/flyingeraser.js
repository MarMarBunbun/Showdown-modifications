{
    name: "Flying Eraser",
    spritenum: 3187,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Flying')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.flyingEraserOriginalTypes = types;
        pokemon.itemData.flyingEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Flying');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Flying Eraser');
            pokemon.itemData.flyingEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.flyingEraserOriginalTypes &&
        !pokemon.itemData.flyingEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Flying Eraser');
          pokemon.itemData.flyingEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.flyingEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Flying Eraser');
        }
        const originalTypes = pokemon.itemData.flyingEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.flyingEraserOriginalTypes;
        delete pokemon.itemData.flyingEraserActivated;
      }
    },
    num: 3187,
    gen: 9
}

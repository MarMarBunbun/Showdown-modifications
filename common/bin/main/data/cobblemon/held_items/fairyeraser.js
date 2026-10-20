{
    name: "Fairy Eraser",
    spritenum: 3184,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Fairy')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fairyEraserOriginalTypes = types;
        pokemon.itemData.fairyEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Fairy');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Fairy Eraser');
            pokemon.itemData.fairyEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fairyEraserOriginalTypes &&
        !pokemon.itemData.fairyEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Fairy Eraser');
          pokemon.itemData.fairyEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fairyEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Fairy Eraser');
        }
        const originalTypes = pokemon.itemData.fairyEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.fairyEraserOriginalTypes;
        delete pokemon.itemData.fairyEraserActivated;
      }
    },
    num: 3184,
    gen: 9
}

{
    name: "Psychic Eraser",
    spritenum: 3194,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Psychic')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.psychicEraserOriginalTypes = types;
        pokemon.itemData.psychicEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Psychic');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Psychic Eraser');
            pokemon.itemData.psychicEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.psychicEraserOriginalTypes &&
        !pokemon.itemData.psychicEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Psychic Eraser');
          pokemon.itemData.psychicEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.psychicEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Psychic Eraser');
        }
        const originalTypes = pokemon.itemData.psychicEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.psychicEraserOriginalTypes;
        delete pokemon.itemData.psychicEraserActivated;
      }
    },
    num: 3194,
    gen: 9
}

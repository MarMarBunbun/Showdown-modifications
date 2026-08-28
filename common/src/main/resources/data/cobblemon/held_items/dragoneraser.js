{
    name: "Dragon Eraser",
    spritenum: 3182,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Dragon')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.dragonEraserOriginalTypes = types;
        pokemon.itemData.dragonEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Dragon');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Dragon Eraser');
            pokemon.itemData.dragonEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.dragonEraserOriginalTypes &&
        !pokemon.itemData.dragonEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Dragon Eraser');
          pokemon.itemData.dragonEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.dragonEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Dragon Eraser');
        }
        const originalTypes = pokemon.itemData.dragonEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.dragonEraserOriginalTypes;
        delete pokemon.itemData.dragonEraserActivated;
      }
    },
    num: 3182,
    gen: 9
}

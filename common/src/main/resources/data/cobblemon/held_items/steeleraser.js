{
    name: "Steel Eraser",
    spritenum: 3196,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Steel')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.steelEraserOriginalTypes = types;
        pokemon.itemData.steelEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Steel');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Steel Eraser');
            pokemon.itemData.steelEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.steelEraserOriginalTypes &&
        !pokemon.itemData.steelEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Steel Eraser');
          pokemon.itemData.steelEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.steelEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Steel Eraser');
        }
        const originalTypes = pokemon.itemData.steelEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.steelEraserOriginalTypes;
        delete pokemon.itemData.steelEraserActivated;
      }
    },
    num: 3196,
    gen: 9
}

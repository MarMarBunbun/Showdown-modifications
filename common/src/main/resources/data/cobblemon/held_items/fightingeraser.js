{
    name: "Fighting Eraser",
    spritenum: 3185,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Fighting')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fightingEraserOriginalTypes = types;
        pokemon.itemData.fightingEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Fighting');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Fighting Eraser');
            pokemon.itemData.fightingEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fightingEraserOriginalTypes &&
        !pokemon.itemData.fightingEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Fighting Eraser');
          pokemon.itemData.fightingEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fightingEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Fighting Eraser');
        }
        const originalTypes = pokemon.itemData.fightingEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.fightingEraserOriginalTypes;
        delete pokemon.itemData.fightingEraserActivated;
      }
    },
    num: 3185,
    gen: 9
}

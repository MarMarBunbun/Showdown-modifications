{
    name: "Grass Crayon",
    spritenum: 3218,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Grass')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.grassCrayonOriginalType = types[0];
        pokemon.itemData.grassCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Grass Crayon');
          pokemon.itemData.grassCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Grass']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.grassCrayonOriginalType &&
        !pokemon.itemData.grassCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Grass Crayon');
          pokemon.itemData.grassCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.grassCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Grass Crayon');
        }
        pokemon.setType([pokemon.itemData.grassCrayonOriginalType]);
        delete pokemon.itemData.grassCrayonOriginalType;
        delete pokemon.itemData.grassCrayonActivated;
      }
    },
    num: 3218,
    gen: 9
}

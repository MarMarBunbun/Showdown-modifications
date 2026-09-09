{
    name: "Ground Crayon",
    spritenum: 3219,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Ground')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.groundCrayonOriginalType = types[0];
        pokemon.itemData.groundCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Ground Crayon');
          pokemon.itemData.groundCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Ground']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.groundCrayonOriginalType &&
        !pokemon.itemData.groundCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Ground Crayon');
          pokemon.itemData.groundCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.groundCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Ground Crayon');
        }
        pokemon.setType([pokemon.itemData.groundCrayonOriginalType]);
        delete pokemon.itemData.groundCrayonOriginalType;
        delete pokemon.itemData.groundCrayonActivated;
      }
    },
    num: 3219,
    gen: 9
}

{
    name: "Rock Crayon",
    spritenum: 3224,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Rock')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.rockCrayonOriginalType = types[0];
        pokemon.itemData.rockCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Rock Crayon');
          pokemon.itemData.rockCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Rock']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.rockCrayonOriginalType &&
        !pokemon.itemData.rockCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Rock Crayon');
          pokemon.itemData.rockCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.rockCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Rock Crayon');
        }
        pokemon.setType([pokemon.itemData.rockCrayonOriginalType]);
        delete pokemon.itemData.rockCrayonOriginalType;
        delete pokemon.itemData.rockCrayonActivated;
      }
    },
    num: 3224,
    gen: 9
}

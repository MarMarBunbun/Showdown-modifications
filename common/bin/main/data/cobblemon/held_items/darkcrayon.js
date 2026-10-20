{
    name: "Dark Crayon",
    spritenum: 3210,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Dark')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.darkCrayonOriginalType = types[0];
        pokemon.itemData.darkCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Dark Crayon');
          pokemon.itemData.darkCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Dark']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.darkCrayonOriginalType &&
        !pokemon.itemData.darkCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Dark Crayon');
          pokemon.itemData.darkCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.darkCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Dark Crayon');
        }
        pokemon.setType([pokemon.itemData.darkCrayonOriginalType]);
        delete pokemon.itemData.darkCrayonOriginalType;
        delete pokemon.itemData.darkCrayonActivated;
      }
    },
    num: 3210,
    gen: 9
}

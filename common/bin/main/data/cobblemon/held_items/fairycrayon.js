{
    name: "Fairy Crayon",
    spritenum: 3213,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Fairy')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fairyCrayonOriginalType = types[0];
        pokemon.itemData.fairyCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Fairy Crayon');
          pokemon.itemData.fairyCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Fairy']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fairyCrayonOriginalType &&
        !pokemon.itemData.fairyCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Fairy Crayon');
          pokemon.itemData.fairyCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fairyCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Fairy Crayon');
        }
        pokemon.setType([pokemon.itemData.fairyCrayonOriginalType]);
        delete pokemon.itemData.fairyCrayonOriginalType;
        delete pokemon.itemData.fairyCrayonActivated;
      }
    },
    num: 3213,
    gen: 9
}

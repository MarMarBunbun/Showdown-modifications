{
    name: "Water Crayon",
    spritenum: 3226,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Water')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.waterCrayonOriginalType = types[0];
        pokemon.itemData.waterCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Water Crayon');
          pokemon.itemData.waterCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Water']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.waterCrayonOriginalType &&
        !pokemon.itemData.waterCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Water Crayon');
          pokemon.itemData.waterCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.waterCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Water Crayon');
        }
        pokemon.setType([pokemon.itemData.waterCrayonOriginalType]);
        delete pokemon.itemData.waterCrayonOriginalType;
        delete pokemon.itemData.waterCrayonActivated;
      }
    },
    num: 3226,
    gen: 9
}

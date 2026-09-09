{
    name: "Electric Crayon",
    spritenum: 3212,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Electric')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.electricCrayonOriginalType = types[0];
        pokemon.itemData.electricCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Electric Crayon');
          pokemon.itemData.electricCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Electric']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.electricCrayonOriginalType &&
        !pokemon.itemData.electricCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Electric Crayon');
          pokemon.itemData.electricCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.electricCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Electric Crayon');
        }
        pokemon.setType([pokemon.itemData.electricCrayonOriginalType]);
        delete pokemon.itemData.electricCrayonOriginalType;
        delete pokemon.itemData.electricCrayonActivated;
      }
    },
    num: 3212,
    gen: 9
}

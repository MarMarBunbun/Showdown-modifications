{
    name: "Dragon Crayon",
    spritenum: 3211,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Dragon')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.dragonCrayonOriginalType = types[0];
        pokemon.itemData.dragonCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Dragon Crayon');
          pokemon.itemData.dragonCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Dragon']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.dragonCrayonOriginalType &&
        !pokemon.itemData.dragonCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Dragon Crayon');
          pokemon.itemData.dragonCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.dragonCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Dragon Crayon');
        }
        pokemon.setType([pokemon.itemData.dragonCrayonOriginalType]);
        delete pokemon.itemData.dragonCrayonOriginalType;
        delete pokemon.itemData.dragonCrayonActivated;
      }
    },
    num: 3211,
    gen: 9
}

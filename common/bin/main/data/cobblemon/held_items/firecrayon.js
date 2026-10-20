{
    name: "Fire Crayon",
    spritenum: 3215,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Fire')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fireCrayonOriginalType = types[0];
        pokemon.itemData.fireCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Fire Crayon');
          pokemon.itemData.fireCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Fire']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fireCrayonOriginalType &&
        !pokemon.itemData.fireCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Fire Crayon');
          pokemon.itemData.fireCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fireCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Fire Crayon');
        }
        pokemon.setType([pokemon.itemData.fireCrayonOriginalType]);
        delete pokemon.itemData.fireCrayonOriginalType;
        delete pokemon.itemData.fireCrayonActivated;
      }
    },
    num: 3215,
    gen: 9
}

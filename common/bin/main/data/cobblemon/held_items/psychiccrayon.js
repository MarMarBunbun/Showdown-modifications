{
    name: "Psychic Crayon",
    spritenum: 3223,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Psychic')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.psychicCrayonOriginalType = types[0];
        pokemon.itemData.psychicCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Psychic Crayon');
          pokemon.itemData.psychicCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Psychic']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.psychicCrayonOriginalType &&
        !pokemon.itemData.psychicCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Psychic Crayon');
          pokemon.itemData.psychicCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.psychicCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Psychic Crayon');
        }
        pokemon.setType([pokemon.itemData.psychicCrayonOriginalType]);
        delete pokemon.itemData.psychicCrayonOriginalType;
        delete pokemon.itemData.psychicCrayonActivated;
      }
    },
    num: 3223,
    gen: 9
}

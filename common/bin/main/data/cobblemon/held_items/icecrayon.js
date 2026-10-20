{
    name: "Ice Crayon",
    spritenum: 3220,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Ice')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.iceCrayonOriginalType = types[0];
        pokemon.itemData.iceCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Ice Crayon');
          pokemon.itemData.iceCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Ice']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.iceCrayonOriginalType &&
        !pokemon.itemData.iceCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Ice Crayon');
          pokemon.itemData.iceCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.iceCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Ice Crayon');
        }
        pokemon.setType([pokemon.itemData.iceCrayonOriginalType]);
        delete pokemon.itemData.iceCrayonOriginalType;
        delete pokemon.itemData.iceCrayonActivated;
      }
    },
    num: 3220,
    gen: 9
}

{
    name: "Normal Crayon",
    spritenum: 3221,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Normal')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.normalCrayonOriginalType = types[0];
        pokemon.itemData.normalCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Normal Crayon');
          pokemon.itemData.normalCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Normal']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.normalCrayonOriginalType &&
        !pokemon.itemData.normalCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Normal Crayon');
          pokemon.itemData.normalCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.normalCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Normal Crayon');
        }
        pokemon.setType([pokemon.itemData.normalCrayonOriginalType]);
        delete pokemon.itemData.normalCrayonOriginalType;
        delete pokemon.itemData.normalCrayonActivated;
      }
    },
    num: 3221,
    gen: 9
}

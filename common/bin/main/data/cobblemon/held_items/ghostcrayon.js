{
    name: "Ghost Crayon",
    spritenum: 3217,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Ghost')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.ghostCrayonOriginalType = types[0];
        pokemon.itemData.ghostCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Ghost Crayon');
          pokemon.itemData.ghostCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Ghost']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.ghostCrayonOriginalType &&
        !pokemon.itemData.ghostCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Ghost Crayon');
          pokemon.itemData.ghostCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.ghostCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Ghost Crayon');
        }
        pokemon.setType([pokemon.itemData.ghostCrayonOriginalType]);
        delete pokemon.itemData.ghostCrayonOriginalType;
        delete pokemon.itemData.ghostCrayonActivated;
      }
    },
    num: 3217,
    gen: 9
}

{
    name: "Flying Crayon",
    spritenum: 3216,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Flying')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.flyingCrayonOriginalType = types[0];
        pokemon.itemData.flyingCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Flying Crayon');
          pokemon.itemData.flyingCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Flying']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.flyingCrayonOriginalType &&
        !pokemon.itemData.flyingCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Flying Crayon');
          pokemon.itemData.flyingCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.flyingCrayonOriginalType) {
      const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Flying Crayon');
        }
        pokemon.setType([pokemon.itemData.flyingCrayonOriginalType]);
        delete pokemon.itemData.flyingCrayonOriginalType;
        delete pokemon.itemData.flyingCrayonActivated;
      }
    },
    num: 3216,
    gen: 9
}

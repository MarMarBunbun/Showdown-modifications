{
    name: "Steel Crayon",
    spritenum: 3225,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Steel')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.steelCrayonOriginalType = types[0];
        pokemon.itemData.steelCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Steel Crayon');
          pokemon.itemData.steelCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Steel']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.steelCrayonOriginalType &&
        !pokemon.itemData.steelCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Steel Crayon');
          pokemon.itemData.steelCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.steelCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Steel Crayon');
        }
        pokemon.setType([pokemon.itemData.steelCrayonOriginalType]);
        delete pokemon.itemData.steelCrayonOriginalType;
        delete pokemon.itemData.steelCrayonActivated;
      }
    },
    num: 3225,
    gen: 9
}

{
    name: "Poison Crayon",
    spritenum: 3222,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Poison')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.poisonCrayonOriginalType = types[0];
        pokemon.itemData.poisonCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Poison Crayon');
          pokemon.itemData.poisonCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Poison']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.poisonCrayonOriginalType &&
        !pokemon.itemData.poisonCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Poison Crayon');
          pokemon.itemData.poisonCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.poisonCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Poison Crayon');
        }
        pokemon.setType([pokemon.itemData.poisonCrayonOriginalType]);
        delete pokemon.itemData.poisonCrayonOriginalType;
        delete pokemon.itemData.poisonCrayonActivated;
      }
    },
    num: 3222,
    gen: 9
}

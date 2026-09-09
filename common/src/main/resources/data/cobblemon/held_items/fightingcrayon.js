{
    name: "Fighting Crayon",
    spritenum: 3214,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes('Fighting')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fightingCrayonOriginalType = types[0];
        pokemon.itemData.fightingCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Fighting Crayon');
          pokemon.itemData.fightingCrayonActivated = true;
        }
        pokemon.setType([types[0], 'Fighting']);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fightingCrayonOriginalType &&
        !pokemon.itemData.fightingCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-item', pokemon, 'Fighting Crayon');
          pokemon.itemData.fightingCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fightingCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add('-enditem', pokemon, 'Fighting Crayon');
        }
        pokemon.setType([pokemon.itemData.fightingCrayonOriginalType]);
        delete pokemon.itemData.fightingCrayonOriginalType;
        delete pokemon.itemData.fightingCrayonActivated;
      }
    },
    num: 3214,
    gen: 9
}

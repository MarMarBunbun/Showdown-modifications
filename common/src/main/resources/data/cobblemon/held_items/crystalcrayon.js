{
    name: "Crystal Crayon",
    spritenum: 3228,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Crystal")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.crystalCrayonOriginalType = types[0];
        pokemon.itemData.crystalCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Crystal Crayon");
          pokemon.itemData.crystalCrayonActivated = true;
        }
        pokemon.setType([types[0], "Crystal"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.crystalCrayonOriginalType &&
        !pokemon.itemData.crystalCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Crystal Crayon");
          pokemon.itemData.crystalCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.crystalCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Crystal Crayon");
        }
        pokemon.setType([pokemon.itemData.crystalCrayonOriginalType]);
        delete pokemon.itemData.crystalCrayonOriginalType;
        delete pokemon.itemData.crystalCrayonActivated;
      }
    },
    num: 3228,
    gen: 9
}

{
    name: "Light Crayon",
    spritenum: 3230,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Light")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.lightCrayonOriginalType = types[0];
        pokemon.itemData.lightCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Light Crayon");
          pokemon.itemData.lightCrayonActivated = true;
        }
        pokemon.setType([types[0], "Light"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.lightCrayonOriginalType &&
        !pokemon.itemData.lightCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Light Crayon");
          pokemon.itemData.lightCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.lightCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Light Crayon");
        }
        pokemon.setType([pokemon.itemData.lightCrayonOriginalType]);
        delete pokemon.itemData.lightCrayonOriginalType;
        delete pokemon.itemData.lightCrayonActivated;
      }
    },
    num: 3230,
    gen: 9
}

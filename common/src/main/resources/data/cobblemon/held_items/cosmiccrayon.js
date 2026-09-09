{
    name: "Cosmic Crayon",
    spritenum: 3227,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Cosmic")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.cosmicCrayonOriginalType = types[0];
        pokemon.itemData.cosmicCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Cosmic Crayon");
          pokemon.itemData.cosmicCrayonActivated = true;
        }
        pokemon.setType([types[0], "Cosmic"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.cosmicCrayonOriginalType &&
        !pokemon.itemData.cosmicCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Cosmic Crayon");
          pokemon.itemData.cosmicCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.cosmicCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Cosmic Crayon");
        }
        pokemon.setType([pokemon.itemData.cosmicCrayonOriginalType]);
        delete pokemon.itemData.cosmicCrayonOriginalType;
        delete pokemon.itemData.cosmicCrayonActivated;
      }
    },
    num: 3227,
    gen: 9
}

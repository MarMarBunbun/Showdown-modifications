{
    name: "Digital Crayon",
    spritenum: 3229,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Digital")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.digitalCrayonOriginalType = types[0];
        pokemon.itemData.digitalCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Digital Crayon");
          pokemon.itemData.digitalCrayonActivated = true;
        }
        pokemon.setType([types[0], "Digital"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.digitalCrayonOriginalType &&
        !pokemon.itemData.digitalCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Digital Crayon");
          pokemon.itemData.digitalCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.digitalCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Digital Crayon");
        }
        pokemon.setType([pokemon.itemData.digitalCrayonOriginalType]);
        delete pokemon.itemData.digitalCrayonOriginalType;
        delete pokemon.itemData.digitalCrayonActivated;
      }
    },
    num: 3229,
    gen: 9
}

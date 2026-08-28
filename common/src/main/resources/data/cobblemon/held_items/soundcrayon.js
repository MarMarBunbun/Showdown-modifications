{
    name: "Sound Crayon",
    spritenum: 3236,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Sound")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.soundCrayonOriginalType = types[0];
        pokemon.itemData.soundCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Sound Crayon");
          pokemon.itemData.soundCrayonActivated = true;
        }
        pokemon.setType([types[0], "Sound"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.soundCrayonOriginalType &&
        !pokemon.itemData.soundCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Sound Crayon");
          pokemon.itemData.soundCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.soundCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Sound Crayon");
        }
        pokemon.setType([pokemon.itemData.soundCrayonOriginalType]);
        delete pokemon.itemData.soundCrayonOriginalType;
        delete pokemon.itemData.soundCrayonActivated;
      }
    },
    num: 3236,
    gen: 9
}

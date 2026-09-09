{
    name: "Nuclear Crayon",
    spritenum: 3231,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Nuclear")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.nuclearCrayonOriginalType = types[0];
        pokemon.itemData.nuclearCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Nuclear Crayon");
          pokemon.itemData.nuclearCrayonActivated = true;
        }
        pokemon.setType([types[0], "Nuclear"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.nuclearCrayonOriginalType &&
        !pokemon.itemData.nuclearCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Nuclear Crayon");
          pokemon.itemData.nuclearCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.nuclearCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Nuclear Crayon");
        }
        pokemon.setType([pokemon.itemData.nuclearCrayonOriginalType]);
        delete pokemon.itemData.nuclearCrayonOriginalType;
        delete pokemon.itemData.nuclearCrayonActivated;
      }
    },
    num: 3231,
    gen: 9
}

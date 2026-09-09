{
    name: "Wind Crayon",
    spritenum: 3238,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Wind")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.windCrayonOriginalType = types[0];
        pokemon.itemData.windCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Wind Crayon");
          pokemon.itemData.windCrayonActivated = true;
        }
        pokemon.setType([types[0], "Wind"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.windCrayonOriginalType &&
        !pokemon.itemData.windCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Wind Crayon");
          pokemon.itemData.windCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.windCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Wind Crayon");
        }
        pokemon.setType([pokemon.itemData.windCrayonOriginalType]);
        delete pokemon.itemData.windCrayonOriginalType;
        delete pokemon.itemData.windCrayonActivated;
      }
    },
    num: 3238,
    gen: 9
}

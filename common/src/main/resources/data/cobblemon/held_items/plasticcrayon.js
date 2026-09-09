{
    name: "Plastic Crayon",
    spritenum: 3232,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Plastic")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.plasticCrayonOriginalType = types[0];
        pokemon.itemData.plasticCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Plastic Crayon");
          pokemon.itemData.plasticCrayonActivated = true;
        }
        pokemon.setType([types[0], "Plastic"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.plasticCrayonOriginalType &&
        !pokemon.itemData.plasticCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Plastic Crayon");
          pokemon.itemData.plasticCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.plasticCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Plastic Crayon");
        }
        pokemon.setType([pokemon.itemData.plasticCrayonOriginalType]);
        delete pokemon.itemData.plasticCrayonOriginalType;
        delete pokemon.itemData.plasticCrayonActivated;
      }
    },
    num: 3232,
    gen: 9
}

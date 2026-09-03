{
    name: "Slime Crayon",
    spritenum: 3234,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Slime")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.slimeCrayonOriginalType = types[0];
        pokemon.itemData.slimeCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Slime Crayon");
          pokemon.itemData.slimeCrayonActivated = true;
        }
        pokemon.setType([types[0], "Slime"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.slimeCrayonOriginalType &&
        !pokemon.itemData.slimeCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Slime Crayon");
          pokemon.itemData.slimeCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.slimeCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Slime Crayon");
        }
        pokemon.setType([pokemon.itemData.slimeCrayonOriginalType]);
        delete pokemon.itemData.slimeCrayonOriginalType;
        delete pokemon.itemData.slimeCrayonActivated;
      }
    },
    num: 3234,
    gen: 9
}

{
    name: "Shadow Crayon",
    spritenum: 3234,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Shadow")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.shadowCrayonOriginalType = types[0];
        pokemon.itemData.shadowCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Shadow Crayon");
          pokemon.itemData.shadowCrayonActivated = true;
        }
        pokemon.setType([types[0], "Shadow"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.shadowCrayonOriginalType &&
        !pokemon.itemData.shadowCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Shadow Crayon");
          pokemon.itemData.shadowCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.shadowCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Shadow Crayon");
        }
        pokemon.setType([pokemon.itemData.shadowCrayonOriginalType]);
        delete pokemon.itemData.shadowCrayonOriginalType;
        delete pokemon.itemData.shadowCrayonActivated;
      }
    },
    num: 3234,
    gen: 9
}

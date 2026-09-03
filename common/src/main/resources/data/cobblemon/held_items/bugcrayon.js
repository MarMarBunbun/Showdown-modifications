{
    name: "Bug Crayon",
    spritenum: 3209,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Bug")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.bugCrayonOriginalType = types[0];
        pokemon.itemData.bugCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Bug Crayon");
          pokemon.itemData.bugCrayonActivated = true;
        }
        pokemon.setType([types[0], "Bug"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.bugCrayonOriginalType &&
        !pokemon.itemData.bugCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Bug Crayon");
          pokemon.itemData.bugCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.bugCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Bug Crayon");
        }
        pokemon.setType([pokemon.itemData.bugCrayonOriginalType]);
        delete pokemon.itemData.bugCrayonOriginalType;
        delete pokemon.itemData.bugCrayonActivated;
      }
    },
    num: 3209,
    gen: 9
}

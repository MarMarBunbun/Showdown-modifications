{
    name: "Eldritch Crayon",
    spritenum: 3239,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Eldritch")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.eldritchCrayonOriginalType = types[0];
        pokemon.itemData.eldritchCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Eldritch Crayon");
          pokemon.itemData.eldritchCrayonActivated = true;
        }
        pokemon.setType([types[0], "Eldritch"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.eldritchCrayonOriginalType &&
        !pokemon.itemData.eldritchCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Eldritch Crayon");
          pokemon.itemData.eldritchCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.eldritchCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Eldritch Crayon");
        }
        pokemon.setType([pokemon.itemData.eldritchCrayonOriginalType]);
        delete pokemon.itemData.eldritchCrayonOriginalType;
        delete pokemon.itemData.eldritchCrayonActivated;
      }
    },
    num: 3239,
    gen: 9
}

{
    name: "Blood Crayon",
    spritenum: 3240,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Blood")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.bloodCrayonOriginalType = types[0];
        pokemon.itemData.bloodCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Blood Crayon");
          pokemon.itemData.bloodCrayonActivated = true;
        }
        pokemon.setType([types[0], "Blood"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.bloodCrayonOriginalType &&
        !pokemon.itemData.bloodCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Blood Crayon");
          pokemon.itemData.bloodCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.bloodCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Blood Crayon");
        }
        pokemon.setType([pokemon.itemData.bloodCrayonOriginalType]);
        delete pokemon.itemData.bloodCrayonOriginalType;
        delete pokemon.itemData.bloodCrayonActivated;
      }
    },
    num: 3240,
    gen: 9
}

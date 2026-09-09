{
    name: "Mystery Crayon",
    spritenum: 3233,
    fling: {
      basePower: 20
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 1 && !types.includes("Mystery")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.questionmarkCrayonOriginalType = types[0];
        pokemon.itemData.questionmarkCrayonActivated = false;
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Mystery Crayon");
          pokemon.itemData.questionmarkCrayonActivated = true;
        }
        pokemon.setType([types[0], "Mystery"]);
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.questionmarkCrayonOriginalType &&
        !pokemon.itemData.questionmarkCrayonActivated
      ) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-item", pokemon, "Mystery Crayon");
          pokemon.itemData.questionmarkCrayonActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.questionmarkCrayonOriginalType) {
        const isIllusionActive = !!pokemon.illusion;
        if (!isIllusionActive) {
          this.add("-enditem", pokemon, "Mystery Crayon");
        }
        pokemon.setType([pokemon.itemData.questionmarkCrayonOriginalType]);
        delete pokemon.itemData.questionmarkCrayonOriginalType;
        delete pokemon.itemData.questionmarkCrayonActivated;
      }
    },
    num: 3233,
    gen: 9
}

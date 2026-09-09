{
    name: "Cosmic Eraser",
    spritenum: 3198,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Cosmic")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.cosmicEraserOriginalTypes = types;
        pokemon.itemData.cosmicEraserActivated = false;
        const newTypes = types.filter(t => t !== "Cosmic");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Cosmic Eraser");
            pokemon.itemData.cosmicEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.cosmicEraserOriginalTypes &&
        !pokemon.itemData.cosmicEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Cosmic Eraser");
          pokemon.itemData.cosmicEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.cosmicEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Cosmic Eraser");
        }
        const originalTypes = pokemon.itemData.cosmicEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.cosmicEraserOriginalTypes;
        delete pokemon.itemData.cosmicEraserActivated;
      }
    },
    num: 3198,
    gen: 9
}

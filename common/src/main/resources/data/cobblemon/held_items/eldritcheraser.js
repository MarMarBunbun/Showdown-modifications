{
    name: "Eldritch Eraser",
    spritenum: 3207,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Eldritch")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.eldritchEraserOriginalTypes = types;
        pokemon.itemData.eldritchEraserActivated = false;
        const newTypes = types.filter(t => t !== "Eldritch");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Eldritch Eraser");
            pokemon.itemData.eldritchEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.eldritchEraserOriginalTypes &&
        !pokemon.itemData.eldritchEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Eldritch Eraser");
          pokemon.itemData.eldritchEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.eldritchEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Eldritch Eraser");
        }
        const originalTypes = pokemon.itemData.eldritchEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.eldritchEraserOriginalTypes;
        delete pokemon.itemData.eldritchEraserActivated;
      }
    },
    num: 3207,
    gen: 9
}

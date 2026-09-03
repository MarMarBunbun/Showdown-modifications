{
    name: "Light Eraser",
    spritenum: 3201,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Light")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.lightEraserOriginalTypes = types;
        pokemon.itemData.lightEraserActivated = false;
        const newTypes = types.filter(t => t !== "Light");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Light Eraser");
            pokemon.itemData.lightEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.lightEraserOriginalTypes &&
        !pokemon.itemData.lightEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Light Eraser");
          pokemon.itemData.lightEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.lightEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Light Eraser");
        }
        const originalTypes = pokemon.itemData.lightEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.lightEraserOriginalTypes;
        delete pokemon.itemData.lightEraserActivated;
      }
    },
    num: 3201,
    gen: 9
}

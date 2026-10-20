{
    name: "Wind Eraser",
    spritenum: 3206,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Wind")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.windEraserOriginalTypes = types;
        pokemon.itemData.windEraserActivated = false;
        const newTypes = types.filter(t => t !== "Wind");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Wind Eraser");
            pokemon.itemData.windEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.windEraserOriginalTypes &&
        !pokemon.itemData.windEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Wind Eraser");
          pokemon.itemData.windEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.windEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Wind Eraser");
        }
        const originalTypes = pokemon.itemData.windEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.windEraserOriginalTypes;
        delete pokemon.itemData.windEraserActivated;
      }
    },
    num: 3206,
    gen: 9
}

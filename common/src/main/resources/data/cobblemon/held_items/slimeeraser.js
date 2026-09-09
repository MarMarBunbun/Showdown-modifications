{
    name: "Slime Eraser",
    spritenum: 3235,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Slime")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.slimeEraserOriginalTypes = types;
        pokemon.itemData.slimeEraserActivated = false;
        const newTypes = types.filter(t => t !== "Slime");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Slime Eraser");
            pokemon.itemData.slimeEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.slimeEraserOriginalTypes &&
        !pokemon.itemData.slimeEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Slime Eraser");
          pokemon.itemData.slimeEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.slimeEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Slime Eraser");
        }
        const originalTypes = pokemon.itemData.slimeEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.slimeEraserOriginalTypes;
        delete pokemon.itemData.slimeEraserActivated;
      }
    },
    num: 3235,
    gen: 9
}

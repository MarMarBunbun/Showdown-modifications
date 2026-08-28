{
    name: "Plastic Eraser",
    spritenum: 3203,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Plastic")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.plasticEraserOriginalTypes = types;
        pokemon.itemData.plasticEraserActivated = false;
        const newTypes = types.filter(t => t !== "Plastic");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Plastic Eraser");
            pokemon.itemData.plasticEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.plasticEraserOriginalTypes &&
        !pokemon.itemData.plasticEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Plastic Eraser");
          pokemon.itemData.plasticEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.plasticEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Plastic Eraser");
        }
        const originalTypes = pokemon.itemData.nuclearEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.plasticEraserOriginalTypes;
        delete pokemon.itemData.plasticEraserActivated;
      }
    },
    num: 3203,
    gen: 9
}

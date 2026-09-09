{
    name: "Digital Eraser",
    spritenum: 3200,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Digital")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.digitalEraserOriginalTypes = types;
        pokemon.itemData.digitalEraserActivated = false;
        const newTypes = types.filter(t => t !== "Digital");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Digital Eraser");
            pokemon.itemData.digitalEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.digitalEraserOriginalTypes &&
        !pokemon.itemData.digitalEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Digital Eraser");
          pokemon.itemData.digitalEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.digitalEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Digital Eraser");
        }
        const originalTypes = pokemon.itemData.digitalEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.digitalEraserOriginalTypes;
        delete pokemon.itemData.digitalEraserActivated;
      }
    },
    num: 3200,
    gen: 9
}

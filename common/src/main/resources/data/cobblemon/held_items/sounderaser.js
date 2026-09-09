{
    name: "Sound Eraser",
    spritenum: 3237,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Sound")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.soundEraserOriginalTypes = types;
        pokemon.itemData.soundEraserActivated = false;
        const newTypes = types.filter(t => t !== "Sound");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Sound Eraser");
            pokemon.itemData.soundEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.soundEraserOriginalTypes &&
        !pokemon.itemData.soundEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Sound Eraser");
          pokemon.itemData.soundEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.soundEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Sound Eraser");
        }
        const originalTypes = pokemon.itemData.soundEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.soundEraserOriginalTypes;
        delete pokemon.itemData.soundEraserActivated;
      }
    },
    num: 3237,
    gen: 9
}

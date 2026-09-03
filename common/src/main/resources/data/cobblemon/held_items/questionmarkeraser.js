{
    name: "Mystery Eraser",
    spritenum: 3204,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Mystery")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.questionmarkEraserOriginalTypes = types;
        pokemon.itemData.questionmarkEraserActivated = false;
        const newTypes = types.filter(t => t !== "Mystery");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Mystery Eraser");
            pokemon.itemData.questionmarkEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.questionmarkEraserOriginalTypes &&
        !pokemon.itemData.questionmarkEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Mystery Eraser");
          pokemon.itemData.questionmarkEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.questionmarkEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Mystery Eraser");
        }
        const originalTypes = pokemon.itemData.questionmarkEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.questionmarkEraserOriginalTypes;
        delete pokemon.itemData.questionmarkEraserActivated;
      }
    },
    num: 3204,
    gen: 9
}

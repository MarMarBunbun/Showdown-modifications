{
    name: "Crystal Eraser",
    spritenum: 3199,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Crystal")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.crystalEraserOriginalTypes = types;
        pokemon.itemData.crystalEraserActivated = false;
        const newTypes = types.filter(t => t !== "Crystal");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Crystal Eraser");
            pokemon.itemData.crystalEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.crystalEraserOriginalTypes &&
        !pokemon.itemData.crystalEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Crystal Eraser");
          pokemon.itemData.crystalEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.crystalEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Crystal Eraser");
        }
        const originalTypes = pokemon.itemData.crystalEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.crystalEraserOriginalTypes;
        delete pokemon.itemData.crystalEraserActivated;
      }
    },
    num: 3199,
    gen: 9
}

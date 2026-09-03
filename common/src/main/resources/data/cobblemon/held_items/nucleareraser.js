{
    name: "Nuclear Eraser",
    spritenum: 3202,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Nuclear")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.nuclearEraserOriginalTypes = types;
        pokemon.itemData.nuclearEraserActivated = false;
        const newTypes = types.filter(t => t !== "Nuclear");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Nuclear Eraser");
            pokemon.itemData.nuclearEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.nuclearEraserOriginalTypes &&
        !pokemon.itemData.nuclearEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Nuclear Eraser");
          pokemon.itemData.nuclearEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.nuclearEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Nuclear Eraser");
        }
        const originalTypes = pokemon.itemData.nuclearEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.nuclearEraserOriginalTypes;
        delete pokemon.itemData.nuclearEraserActivated;
      }
    },
    num: 3202,
    gen: 9
}

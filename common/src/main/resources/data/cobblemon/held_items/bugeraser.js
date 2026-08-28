{
    name: "Bug Eraser",
    spritenum: 3179,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Bug")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.bugEraserOriginalTypes = types;
        pokemon.itemData.bugEraserActivated = false;
        const newTypes = types.filter(t => t !== "Bug");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Bug Eraser");
            pokemon.itemData.bugEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.bugEraserOriginalTypes &&
        !pokemon.itemData.bugEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Bug Eraser");
          pokemon.itemData.bugEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.bugEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Bug Eraser");
        }
        const originalTypes = pokemon.itemData.bugEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.bugEraserOriginalTypes;
        delete pokemon.itemData.bugEraserActivated;
      }
    },
    num: 3179,
    gen: 9
}

{
    name: "Shadow Eraser",
    spritenum: 3205,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Shadow")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.shadowEraserOriginalTypes = types;
        pokemon.itemData.shadowEraserActivated = false;
        const newTypes = types.filter(t => t !== "Shadow");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Shadow Eraser");
            pokemon.itemData.shadowEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.shadowEraserOriginalTypes &&
        !pokemon.itemData.shadowEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Shadow Eraser");
          pokemon.itemData.shadowEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.shadowEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Shadow Eraser");
        }
        const originalTypes = pokemon.itemData.shadowEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.shadowEraserOriginalTypes;
        delete pokemon.itemData.shadowEraserActivated;
      }
    },
    num: 3205,
    gen: 9
}

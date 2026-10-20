{
    name: "Blood Eraser",
    spritenum: 3208,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Blood")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.bloodEraserOriginalTypes = types;
        pokemon.itemData.bloodEraserActivated = false;
        const newTypes = types.filter(t => t !== "Blood");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Blood Eraser");
            pokemon.itemData.bloodEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.bloodEraserOriginalTypes &&
        !pokemon.itemData.bloodEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Blood Eraser");
          pokemon.itemData.bloodEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.bloodEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Blood Eraser");
        }
        const originalTypes = pokemon.itemData.bloodEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.bloodEraserOriginalTypes;
        delete pokemon.itemData.bloodEraserActivated;
      }
    },
    num: 3208,
    gen: 9
}

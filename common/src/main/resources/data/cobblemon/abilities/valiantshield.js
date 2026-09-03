{
    onStart(pokemon) {
      this.boost({def: 1}, pokemon);
	  this.add("-ability", pokemon, "Valiant Shield");
    },
    name: "Valiant Shield",
    rating: 3.5,
    num: 3159
}

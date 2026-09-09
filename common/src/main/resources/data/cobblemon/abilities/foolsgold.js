{
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
	onStart(pokemon) {
      this.boost({ accuracy: -1 }, pokemon);
    },
    flags: {},
    name: "Fool's Gold",
    rating: 1.5,
    num: 3186
}

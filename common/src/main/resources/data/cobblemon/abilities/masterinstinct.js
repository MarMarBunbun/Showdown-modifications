{
    onModifyAccuracyPriority: 10,
	onModifyAccuracy(accuracy, pokemon) {
      if (this.field.isWeather("battleaura")) {
        return accuracy * 1.2;
      }
	},
    flags: { breakable: 1 },
    name: "Master Instinct",
    rating: 1.5,
    num: 3101
}

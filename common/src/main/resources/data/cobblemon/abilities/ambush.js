{
    onModifyMove(move) {
      if (this.field.isWeather("eclipse")) {
        move.accuracy = true;
      }
    },
    name: "Ambush",
    rating: 2.5,
    num: 3007
}

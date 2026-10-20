{
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon) {
      if (pokemon.volatileStatus === "confusion") {
        return this.chainModify(2);
      }
    },
    name: "Headache",
    rating: 3.5,
    num: 3079
}

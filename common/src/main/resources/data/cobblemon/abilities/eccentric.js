{
    onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(1.5);
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {

      if (move.category === "Special") {
        move.accuracy = this.chainModify(0.8);
      }
    },
    name: "Eccentric",
    rating: 5,
    num: 3051
}

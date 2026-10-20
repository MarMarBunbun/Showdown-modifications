{
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.chainModify(2);
    },
	onModifyDefPriority: 5,
    onModifyDef(def) {
      return this.chainModify(0.5);
    },
	onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(2);
    },
	onModifySpDPriority: 5,
    onModifySpD(spd) {
      return this.chainModify(2);
    },
    name: "Sharp Coral",
    rating: 5,
    num: 3137
}

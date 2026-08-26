{
    onModifyAtk(atk) {
      if (this.field.isTerrain("gravity")) {
        return this.chainModify(1.3);
      }
    },
	onModifySpa(Spa) {
      if (this.field.isTerrain("gravity")) {
        return this.chainModify(1.3);
      }
    },
    name: "Xenoforce",
    rating: 3,
    num: 3168
}

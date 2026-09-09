{
    onImmunity(type, pokemon) {
      if (type === "eclipse")
        return false;
    },
    onModifyAccuracyPriority: -1,
    onModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      if (this.field.isWeather("eclipse")) {
        this.debug("Foul Shroud - decreasing accuracy");
        return this.chainModify([3277, 4096]);
      }
    },
    isBreakable: true,
    name: "Foul Shroud",
    rating: 1.5,
    num: 3067
}

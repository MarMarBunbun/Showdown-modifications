{
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    onModifyAccuracyPriority: -1,
    onModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      if (this.field.isWeather(["sandstorm", "sandstorm"])) {
        this.debug("Sand Veil - decreasing accuracy");
        return this.chainModify([3277, 4096]);
      }
    },
    flags: { breakable: 1 },
    name: "Sand Veil",
    rating: 1.5,
    num: 8
}

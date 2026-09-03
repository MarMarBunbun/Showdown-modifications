{
    onSetStatus(status, target, source, effect) {
      if (["sunnyday", "desolateland", "pollenstorm"].includes(target.effectiveWeather())) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Leaf Guard");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["sunnyday", "desolateland", "pollenstorm"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Leaf Guard");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Leaf Guard",
    rating: 0.5,
    num: 102
}

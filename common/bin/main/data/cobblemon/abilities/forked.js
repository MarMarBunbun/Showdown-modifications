{
    onSetStatus(status, target, source, effect) {
      if (["thunderstorm"].includes(target.effectiveWeather())) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Forked");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["thunderstorm"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Forked");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Forked",
    rating: 0.5,
    num: 3066
}

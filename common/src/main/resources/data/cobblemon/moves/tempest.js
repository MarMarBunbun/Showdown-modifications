{
    num: 3420,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Tempest",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onHit(target, source) {

      this.field.clearWeather();
      this.add("-weather", "none", "[from] move: Tempest", "[of]" + source.fullname);
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Cool"
}

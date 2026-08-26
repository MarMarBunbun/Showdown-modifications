{
	onBasePower(relayVar, source, target, move) {
      if (["sunnyday", "desolateland"].includes(source.effectiveWeather()) && move.type === "Ice") {
        this.debug("Thermo Cool boost");
        return this.chainModify(1.5);
      }
	},
	flags: { breakable: 1 },
	name: "Thermo Cool",
	rating: 3.5,
	num: 3243
}

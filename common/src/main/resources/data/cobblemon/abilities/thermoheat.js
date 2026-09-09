{
	onBasePower(relayVar, source, target, move) {
      if (["hail", "snow"].includes(source.effectiveWeather()) && move.type === "Fire") {
        this.debug("Thermo Heat boost");
        return this.chainModify(1.5);
      }
	},
	flags: { breakable: 1 },
	name: "Thermo Heat",
	rating: 3.5,
	num: 3244
}

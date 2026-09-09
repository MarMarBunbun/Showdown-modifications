{
    num: 454,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Attack Order",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    critRatio: 2,
    secondary: null,
	onHit(target, source) {
        if (this.field.isWeather("pheromones")) {
            if (!target.volatiles["partiallytrapped"]) {
                target.addVolatile("partiallytrapped", source);
                this.add("-activate", target, "move: Attack Order", "[of] " + source);
            }
        }
    },
    target: "normal",
    type: "Bug",
    contestType: "Clever"
}

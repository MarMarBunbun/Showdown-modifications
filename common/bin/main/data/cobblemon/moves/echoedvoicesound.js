{
    num: 3132,
    accuracy: 100,
    basePower: 40,
    basePowerCallback(pokemon, target, move) {
      let bp = move.basePower;
      if (this.field.pseudoWeather.echoedvoice) {
        bp = move.basePower * this.field.pseudoWeather.echoedvoice.multiplier;
      }
      this.debug("BP: " + move.basePower);
      return bp;
    },
    category: "Special",
    name: "Echoed Voice Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    onTry() {
      this.field.addPseudoWeather("echoedvoice");
    },
    condition: {
      duration: 2,
      onFieldStart() {
        this.effectState.multiplier = 1;
      },
      onFieldRestart() {
        if (this.effectState.duration !== 2) {
          this.effectState.duration = 2;
          if (this.effectState.multiplier < 5) {
            this.effectState.multiplier++;
          }
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Beautiful"
}

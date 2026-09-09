{
    onStart(source) {
      if (this.field.getPseudoWeather("trickroom")) {
       this.field.removePseudoWeather("trickroom");
       this.add("-activate", source, "ability: Speed Swap", "[remove Trick Room]");
      } else {
       this.field.addPseudoWeather("trickroom", source);
       this.add("-activate", source, "ability: Speed Swap", "[set Trick Room]");
      }
	},
    name: "Speed Swap",
    rating: 4,
    num: 3143
}

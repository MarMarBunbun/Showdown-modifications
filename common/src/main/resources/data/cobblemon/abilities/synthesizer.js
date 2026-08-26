{
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Sound") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Synthesizer");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Synthesizer",
    rating: 3.5,
    num: 3178
}

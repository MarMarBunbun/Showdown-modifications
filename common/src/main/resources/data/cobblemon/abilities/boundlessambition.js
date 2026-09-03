{
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.boost({ spe: length }, source);
      }
    },
    name: "Boundless Ambition",
    rating: 3,
    num: 3263
}

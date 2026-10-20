{
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.boost({ spa: length }, source);
      }
    },
    name: "Confident",
    rating: 3,
    num: 3037
}

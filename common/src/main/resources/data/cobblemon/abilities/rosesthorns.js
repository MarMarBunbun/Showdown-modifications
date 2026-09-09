{
    onDamagingHit(damage, target, source, move) {
      const side = source.isAlly(target) ? source.side.foe : source.side;
      const toxicSpikes = side.sideConditions["toxicspikes"];
      if (move.flags === "contact" && (!toxicSpikes || toxicSpikes.layers < 2 || this.randomChance(1, 2))) {
        this.add("-activate", target, "ability: Rose's Thorns");
        side.addSideCondition("toxicspikes", target);
      }
    },
    name: "Rose's Thorns",
    rating: 3.5,
    num: 3125
}

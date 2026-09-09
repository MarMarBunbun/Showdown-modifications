{
    onSourceFaint(target, source, effect) {
      if (!source || !effect || !effect.effectType) return;
      if (effect.effectType === "Move" && effect.basePower > 0) {
        this.heal(source.baseMaxhp / 2, source);

        this.add("-ability", source, "Bone Collector");
      }
	},
	name: "Bone Collector",
    rating: 3.5,
    num: 3263
}

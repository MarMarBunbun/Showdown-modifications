{
    onTryHeal(relayVar, target, source, effect) {
      this.add("-activate", target, "ability: Head Chef");
      return this.chainModify(1.2);
    },
    flags: {},
    name: "Head Chef",
    rating: 2,
    num: 3254
}

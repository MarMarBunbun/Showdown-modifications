{
    onStart(pokemon) {
      this.add("-ability", pokemon, "Dread Space");
    },
    onDeductPP(target, source) {
      if (target.isAlly(source))
        return;
      return 1;
    },
    flags: {},
    name: "Dread Space",
    rating: 2.5,
    num: 3172
}

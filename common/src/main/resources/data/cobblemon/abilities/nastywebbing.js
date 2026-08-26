{
    onDamagingHit(damage, target, source, move) {
      const side = source.isAlly(target) ? source.side.foe : source.side;
      const stickyWeb = side.sideConditions["stickyweb"];
      if (move.category === "Physical" && (!stickyWeb)) {
        this.add("-activate", target, "ability: Nasty Webbing");
        side.addSideCondition("stickyweb", target);
      }
    },
    flags: {},
    name: "Nasty Webbing",
    rating: 3.5,
    num: 3200
}

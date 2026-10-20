{
    num: 3520,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Networking",
    pp: 40,
    priority: 0,
    flags: {},
    onHit(target) {
      if (!this.canSwitch(target.side) || target.volatiles["commanded"]) {
        this.attrLastMove("[still]");
        this.add("-fail", target);
        return this.NOT_FAIL;
      }
    },
    self: {
      onHit(source) {
        source.skipBeforeSwitchOutEventFlag = true;
      }
    },
    selfSwitch: "copyvolatile",
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
}

{
    num: 3340,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Salt Therapy",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    sideCondition: "salttherapy",
    condition: {
      duration: 5,
      onSideStart(side) {
        this.add("-sidestart", side, "move: Salt Therapy");
      },
      onResidualOrder: 6,
      onResidual(side) {
        this.heal(side.baseMaxhp / 12);
      },
      onSideEnd(side) {
        this.add("-sideend", side, "move: Salt Therapy");
      },
    },
    secondary: null,
    target: "allySide",
    type: "Rock",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful",
}

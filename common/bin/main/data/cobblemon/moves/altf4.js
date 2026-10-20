{
    num: 3561,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Alt+F4",
    pp: 20,
    priority: -6,
    flags: {},
    onTry(source) {
      return !!this.canSwitch(source.side);
    },
    selfSwitch: true,
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "heal" },
    contestType: "Cool"
}

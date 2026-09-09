{
    num: 3395,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Standoff",
    pp: 5,
    priority: 0,
    flags: { reflectable: 1, mirror: 1 },
    onHit(target, source, move) {
      return target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    zMove: { boost: { spd: 1 } },
    contestType: "Cool"
}

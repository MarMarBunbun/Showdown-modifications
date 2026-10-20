{
    num: 3230,
    accuracy: 90,
    basePower: 60,
    category: "Special",
    name: "Kindleseed",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    volatileStatus: "leechseed",
    onTryImmunity(target) {
      return !target.hasType("Fire");
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
}

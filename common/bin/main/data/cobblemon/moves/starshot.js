{
    num: 3398,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Star Shot",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyPriority(priority, source, target, move) {
      if (this.field.isTerrain("gravity") && source.isGrounded()) {
        return priority + 1;
      }
    },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
}

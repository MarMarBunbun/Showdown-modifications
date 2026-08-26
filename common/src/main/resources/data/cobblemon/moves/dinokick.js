{
    num: 3597,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Dino Kick",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
    onBasePower(basePower, source, target, move) {
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemState, target, target, move, item))
        return;
      if (item.id) {
        return this.chainModify(1.5);
      }
    },
    onAfterHit(target, source) {
      if (source.hp) {
        const item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: Dino Kick", "[of] " + source);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
}

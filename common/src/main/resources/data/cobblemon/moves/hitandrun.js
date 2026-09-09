{
    num: 3212,
    accuracy: 90,
    basePower: 65,
    category: "Physical",
    name: "Hit and Run",
    pp: 10,
    priority: -1,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onAfterHit(target, source, move) {
      if (source.item || source.volatiles["gem"]) {
        return;
      }
      const yourItem = target.takeItem(source);
      if (!yourItem) {
        return;
      }
      if (!this.singleEvent("TakeItem", yourItem, target.itemState, source, target, move, yourItem) || !source.setItem(yourItem)) {
        target.item = yourItem.id;
        return;
      }
      this.add("-item", source, yourItem, "[from] move: Hit and Run", "[of] " + target);
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cute"
}

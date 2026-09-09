{
    num: 3657,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Yoink",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1 },
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
      this.add("-enditem", target, yourItem, "[silent]", "[from] move: Yoink", "[of] " + source);
      this.add("-item", source, yourItem, "[from] move: Yoink", "[of] " + target);
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Tough"
}

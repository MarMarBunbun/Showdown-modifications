{
    onModifyCritRatio(critRatio, source, target) {
      if (target && ["psn", "tox", "bgt"].includes(target.status))
        return 5;
    },
    flags: {},
    name: "Merciless",
    rating: 1.5,
    num: 196
}

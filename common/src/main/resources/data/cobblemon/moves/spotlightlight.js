{
    num: 3392,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Spotlight Light",
    pp: 15,
    priority: 3,
    flags: { protect: 1, reflectable: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
    volatileStatus: "spotlight",
    onTryHit(target) {
      if (this.activePerHalf === 1)
        return false;
    },
    secondary: null,
    target: "normal",
    type: "Light",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
}

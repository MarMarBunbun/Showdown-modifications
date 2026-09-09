{
    num: 3847,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cryostasis",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onTry(source) {
      if (source.status === "frz")
        return false;
      if (source.hp === source.maxhp) {
        this.add("-fail", source, "heal");
        return null;
      }
    },
    onHit(target, source, move) {
      const result = target.setStatus("frz", source, move);
      if (!result)
        return result;
      target.statusState.time = 3;
      target.statusState.startTime = 3;
      this.heal(target.maxhp);
    },
    secondary: null,
    target: "self",
    type: "Ice",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
}

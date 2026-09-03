{
    num: 3005,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Allure",
    pp: 10,
    priority: 0,
	overrideOffensiveStat: "atk",
    flags: { contact: 1, protect: 1, mirror: 1 },
	onBasePower(basePower, attacker, defender, move) {
      if (
        defender.hasMove("attract") ||
        defender.hasAbility("allure") ||
        defender.hasAbility("cutecharm")
      ) {
        this.debug("Allure power reduction");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Tough"
}

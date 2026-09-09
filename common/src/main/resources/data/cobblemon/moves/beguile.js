{
    num: 3028,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Beguile",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onTryHit(target) {
      if (target.volatiles['attract']) {
        target.faint();
		return null;
      }
	},
	secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
}

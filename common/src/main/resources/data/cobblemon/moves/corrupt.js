{
    num: 3071,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "corrupt",
    pp: 5,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
	onHit(target) {
        const stats = ['atk', 'def', 'spa', 'spd', 'spe'];
        for (let i = 0; i < 2; i++) {
            const randomStat = this.sample(stats);
            stats.splice(stats.indexOf(randomStat), 1);
            this.boost({ [randomStat]: -2 }, target, target, this.dex.getActiveMove('corrupt'));
        }
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
}

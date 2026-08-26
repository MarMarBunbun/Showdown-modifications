{
    num: 3356,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Shadow Half",
    pp: 5,
    priority: 0,
    flags: { protect: 1 },
    onHit(target, source) {
        if (target.hp > target.maxhp / 2) {
            this.damage(target.maxhp / 2, target);
        }
        if (source.hp > source.maxhp / 2) {
            this.damage(source.maxhp / 2, source);
        }
    },
    secondary: null,
    target: "allAdjacent",
    type: "Shadow",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
}

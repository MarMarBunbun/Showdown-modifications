{
    onAfterMove(target, source, move) {
      if (move.category !== 'Physical' && move.category !== 'Special') {
        this.heal(source.baseMaxhp / 16, source, source);
      }
    },
    name: "Content",
    rating: 1,
    num: 3039
}

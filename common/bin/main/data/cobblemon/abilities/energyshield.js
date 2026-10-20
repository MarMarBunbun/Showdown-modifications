{
    onTryHit(pokemon, target, move) {
      if (move.flags["beam"]) {
        this.add("-immune", pokemon, "[from] ability: Energy Shield");
        return null;
      }
    },
    isBreakable: true,
    name: "Energy Shield",
    rating: 3,
    num: 3055
}

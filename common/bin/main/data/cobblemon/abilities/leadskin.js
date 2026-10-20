{
    onTryHit(target, source, move) {
      if (move.type === "Nuclear") {
        this.add("-immune", target, "[from] ability: Lead Skin");
        return null;
      }
    },
    name: "Lead Skin",
    rating: 2,
    num: 3095
}

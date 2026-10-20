{
    onSourceDamagingHit(damage, target, source, move) {
      if (target.hasAbility("ironwill") || target.hasAbility("scrappy") || target.hasAbility("guarddog") || target.hasAbility("innerfocus") || target.hasAbility("oblivious") || target.hasAbility("owntempo"))
        return;
      if (this.checkMoveMakesContact(move, target, source)) {
        if (this.randomChance(3, 10)) {
          target.addVolatile("flinch", source);
        }
      }
    },
    flags: {},
    name: "Big Kabuki",
    rating: 2,
    num: 3262
}

{
	flags: { protect: 1, failmefirst: 1, noassist: 1, magic: 1 },
  num: 243,
  accuracy: 100,
  basePower: 0,
  category: "Special",
  name: "Mirror Coat",
  pp: 20,
  priority: -5,
  condition: {
      duration: 1,
      noCopy: true,
      onStart(target, source, move) {
        this.effectState.slot = null;
        this.effectState.damage = 0;
      },
      onRedirectTargetPriority: -1,
      onRedirectTarget(target, source, source2, move) {
        if (move.id !== "mirrorcoat")
          return;
        if (source !== this.effectState.target || !this.effectState.slot)
          return;
        return this.getAtSlot(this.effectState.slot);
      },
      onDamagingHit(damage, target, source, move) {
        if (!source.isAlly(target) && this.getCategory(move) === "Special") {
          this.effectState.slot = source.getSlot();
          this.effectState.damage = 2 * damage;
        }
      }
    },
  secondary: null,
  target: "scripted",
  type: "Psychic",
  contestType: "Beautiful",
}

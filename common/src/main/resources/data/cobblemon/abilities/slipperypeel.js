{
	onStart(target) {
      target.addVolatile("slipperypeel");
	},
	condition: {
      noCopy: true,
      onDamagingHit(damage, target, source, move) {
        if (this.checkMoveMakesContact(move, source, target)) {
          source.forceSwitchFlag = true;
          target.removeVolatile("slipperypeel");
        }
      }
	},
	flags: {},
	name: "Slippery Peel",
	rating: 2,
	num: 3242
}

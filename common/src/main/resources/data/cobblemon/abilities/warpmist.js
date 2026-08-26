{
    onTryHit(target, source, move) {
      if (target !== source && move.ignoreImmunity !== true) {
        this.add("-immune", target, "[from] ability: Warp Mist");
        return null;
      }
    },
	onModifyAtk(atk, attacker) {
      if (this.field.isWeather("fog")) {
        this.debug("Warp Mist fog boost");
        return this.chainModify(1.2);
      }
    },
    name: "Warp Mist",
    rating: 4,
    num: 3164
}

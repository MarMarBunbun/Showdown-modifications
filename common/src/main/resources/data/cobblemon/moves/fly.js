{
  num: 19,
    flags: {
      contact: 1,
      charge: 1,
      protect: 1,
      mirror: 1,
      gravity: 1,
      distance: 1,
      nosleeptalk: 1,
      noassist: 1,
      failinstruct: 1,
	  hm: 1
    },
	condition: {
      duration: 2,
      onInvulnerability(target, source, move) {
        if (["gust", "gustwind", "tornado", "twister", "skyuppercut", "thunder", "hurricane", "hurricanewind", "smackdown", "thousandarrows"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceModifyDamage(damage, source, target, move) {
        if (move.id === "gust" || move.id === "gustwind" || move.id === "twister") {
          return this.chainModify(2);
        }
      }
    }
}

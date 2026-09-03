{
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
    },
  num: 19,
  accuracy: 95,
  basePower: 90,
  category: "Physical",
  name: "Fly",
  pp: 15,
  priority: 0,
  secondary: null,
  target: "any",
  type: "Flying",
  contestType: "Clever",
}

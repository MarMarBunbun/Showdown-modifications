{
    condition: {
      duration: 2,
      onInvulnerability(target, source, move) {
        if (["gust", "gustwind", "tornado", "twister", "skyuppercut", "thunder", "hurricane", "hurricanewind", "smackdown", "thousandarrows"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceBasePower(basePower, target, source, move) {
        if (move.id === "gust" || move.id === "gustwind" || move.id === "twister") {
          return this.chainModify(2);
        }
      }
    },
  num: 340,
  accuracy: 85,
  basePower: 85,
  category: "Physical",
  name: "Bounce",
  pp: 5,
  priority: 0,
  flags: {
      contact: 1,
      charge: 1,
      protect: 1,
      mirror: 1,
      gravity: 1,
      distance: 1,
      metronome: 1,
      nosleeptalk: 1,
      noassist: 1,
      failinstruct: 1
    },
  secondary: {
      chance: 30,
      status: "par"
    },
  target: "any",
  type: "Flying",
  contestType: "Cute",
}

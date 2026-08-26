{
  num: 340,
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
    }
}

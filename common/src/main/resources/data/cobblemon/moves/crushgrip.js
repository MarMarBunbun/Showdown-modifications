{
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, legendary: 1 },
  num: 462,
  accuracy: 100,
  basePower: 0,
  basePowerCallback(pokemon, target) {
      const hp = target.hp;
      const maxHP = target.maxhp;
      const bp = Math.floor(Math.floor((120 * (100 * Math.floor(hp * 4096 / maxHP)) + 2048 - 1) / 4096) / 100) || 1;
      this.debug("BP for " + hp + "/" + maxHP + " HP: " + bp);
      return bp;
    },
  category: "Physical",
  name: "Crush Grip",
  pp: 5,
  priority: 0,
  secondary: null,
  target: "normal",
  type: "Normal",
  zMove: { basePower: 190 },
  maxMove: { basePower: 140 },
  contestType: "Tough",
}

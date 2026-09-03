{
    num: 3735,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Blood Blade",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, magic: 1, blade: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0) {

        this.heal(pokemon.baseMaxhp / 2, pokemon);
        this.add("-heal", pokemon, pokemon.getHealth, "[from] move: Blood Blade");
        return;
      }

      const recoilDamage = Math.floor(pokemon.baseMaxhp * 2 / 3);

      if (recoilDamage >= pokemon.hp) {

        const damageDealt = target.lastDamage || 0;
        const healingAmount = Math.floor(damageDealt / 2);
        if (healingAmount > 0) {
          this.heal(healingAmount, pokemon);
          this.add("-heal", pokemon, pokemon.getHealth, "[from] move: Blood Blade");

          const stats = target.baseStoredStats || target.storedStats || target.stats;
          if (stats) {
            const relevantStats = ["atk", "def", "spa", "spd", "spe"];
            let highestStat = 'atk';
            let highestValue = -1;
            for (const stat of relevantStats) {
              if (stats[stat] > highestValue) {
                highestStat = stat;
                highestValue = stats[stat];
              }
            }

            this.boost({ [highestStat]: 1 }, pokemon);
          }
        }
      } else {

        this.damage(recoilDamage, pokemon, pokemon, this.dex.conditions.get("recoil"));
      }
    },
    secondary: null,
    target: "any",
    type: "Blood",
    contestType: "Cool"
}

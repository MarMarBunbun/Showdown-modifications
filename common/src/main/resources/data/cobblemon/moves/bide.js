{
	flags: { contact: 1, protect: 1, nosleeptalk: 1, failinstruct: 1, speed: 1 },
  num: 117,
  accuracy: true,
  basePower: 0,
  category: "Physical",
  isNonstandard: "Past",
  name: "Bide",
  pp: 10,
  priority: 1,
  volatileStatus: "bide",
  ignoreImmunity: true,
  condition: {
      duration: 3,
      onLockMove: "bide",
      onStart(pokemon) {
        this.effectState.totalDamage = 0;
        this.add("-start", pokemon, "move: Bide");
      },
      onDamagePriority: -101,
      onDamage(damage, target, source, move) {
        if (!move || move.effectType !== "Move" || !source)
          return;
        this.effectState.totalDamage += damage;
        this.effectState.lastDamageSource = source;
      },
      onBeforeMove(pokemon, target, move) {
        if (this.effectState.duration === 1) {
          this.add("-end", pokemon, "move: Bide");
          target = this.effectState.lastDamageSource;
          if (!target || !this.effectState.totalDamage) {
            this.attrLastMove("[still]");
            this.add("-fail", pokemon);
            return false;
          }
          if (!target.isActive) {
            const possibleTarget = this.getRandomTarget(pokemon, this.dex.moves.get("pound"));
            if (!possibleTarget) {
              this.add("-miss", pokemon);
              return false;
            }
            target = possibleTarget;
          }
          const moveData = {
            id: "bide",
            name: "Bide",
            accuracy: true,
            damage: this.effectState.totalDamage * 2,
            category: "Physical",
            priority: 1,
            flags: { contact: 1, protect: 1 },
            effectType: "Move",
            type: "Normal"
          };
          this.actions.tryMoveHit(target, pokemon, moveData);
          pokemon.removeVolatile("bide");
          return false;
        }
        this.add("-activate", pokemon, "move: Bide");
      },
      onMoveAborted(pokemon) {
        pokemon.removeVolatile("bide");
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "move: Bide", "[silent]");
      }
    },
  secondary: null,
  target: "self",
  type: "Normal",
  contestType: "Tough",
}

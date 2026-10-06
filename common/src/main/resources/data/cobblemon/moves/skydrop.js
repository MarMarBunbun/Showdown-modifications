{
      onAnyInvulnerability(target, source, move) {
        if (target !== this.effectState.target && target !== this.effectState.source) {
          return;
        }
        if (source === this.effectState.target && target === this.effectState.source) {
          return;
        }
        if (["gust", "gustwind", "tornado", "twister", "skyuppercut", "thunder", "hurricane", "hurricanewind", "smackdown", "thousandarrows"].includes(move.id)) {
          return;
        }
        return false;
      },
      onAnyBasePower(basePower, target, source, move) {
        if (target !== this.effectState.target && target !== this.effectState.source) {
          return;
        }
        if (source === this.effectState.target && target === this.effectState.source) {
          return;
        }
        if (move.id === "gust" || move.id === "gustwind" || move.id === "twister") {
          this.debug("BP doubled on midair target");
          return this.chainModify(2);
        }
      },
  num: 507,
  accuracy: 100,
  basePower: 60,
  category: "Physical",
  isNonstandard: "Past",
  name: "Sky Drop",
  pp: 10,
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
  onModifyMove(move, source) {
      if (!source.volatiles["skydrop"]) {
        move.accuracy = true;
        delete move.flags["contact"];
      }
    },
  onMoveFail(target, source) {
      if (source.volatiles["twoturnmove"] && source.volatiles["twoturnmove"].duration === 1) {
        source.removeVolatile("skydrop");
        source.removeVolatile("twoturnmove");
        if (target === this.effectState.target) {
          this.add("-end", target, "Sky Drop", "[interrupt]");
        }
      }
    },
  onTry(source, target) {
      return !target.fainted;
    },
  onTryHit(target, source, move) {
      if (source.removeVolatile(move.id)) {
        if (target !== source.volatiles["twoturnmove"].source)
          return false;
        if (target.hasType("Flying")) {
          this.add("-immune", target);
          return null;
        }
      } else {
        if (target.volatiles["substitute"] || target.isAlly(source)) {
          return false;
        }
        if (target.getWeight() >= 2e3) {
          this.add("-fail", target, "move: Sky Drop", "[heavy]");
          return null;
        }
        this.add("-prepare", source, move.name, target);
        source.addVolatile("twoturnmove", target);
        return null;
      }
    },
  onHit(target, source) {
      if (target.hp)
        this.add("-end", target, "Sky Drop");
    },
  condition: {
      duration: 2,
      onAnyDragOut(pokemon) {
        if (pokemon === this.effectState.target || pokemon === this.effectState.source)
          return false;
      },
      onFoeTrapPokemonPriority: -15,
      onFoeTrapPokemon(defender) {
        if (defender !== this.effectState.source)
          return;
        defender.trapped = true;
      },
      onFoeBeforeMovePriority: 12,
      onFoeBeforeMove(attacker, defender, move) {
        if (attacker === this.effectState.source) {
          attacker.activeMoveActions--;
          this.debug("Sky drop nullifying.");
          return null;
        }
      },
      onRedirectTargetPriority: 99,
      onRedirectTarget(target, source, source2) {
        if (source !== this.effectState.target)
          return;
        if (this.effectState.source.fainted)
          return;
        return this.effectState.source;
      },
      onAnyInvulnerability(target, source, move) {
        if (target !== this.effectState.target && target !== this.effectState.source) {
          return;
        }
        if (source === this.effectState.target && target === this.effectState.source) {
          return;
        }
        if (["gust", "twister", "skyuppercut", "thunder", "hurricane", "smackdown", "thousandarrows"].includes(move.id)) {
          return;
        }
        return false;
      },
      onAnyBasePower(basePower, target, source, move) {
        if (target !== this.effectState.target && target !== this.effectState.source) {
          return;
        }
        if (source === this.effectState.target && target === this.effectState.source) {
          return;
        }
        if (move.id === "gust" || move.id === "twister") {
          this.debug("BP doubled on midair target");
          return this.chainModify(2);
        }
      },
      onFaint(target) {
        if (target.volatiles["skydrop"] && target.volatiles["twoturnmove"].source) {
          this.add("-end", target.volatiles["twoturnmove"].source, "Sky Drop", "[interrupt]");
        }
      }
    },
  secondary: null,
  target: "any",
  type: "Flying",
  contestType: "Tough",
}

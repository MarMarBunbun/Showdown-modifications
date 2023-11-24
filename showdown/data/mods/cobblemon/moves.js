"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var moves_exports = {};
__export(moves_exports, {
  Moves: () => Moves
});
module.exports = __toCommonJS(moves_exports);
const Moves = {
  abyssallure: {
    num: 1154,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Abyssal Lure",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        this.boost({ spa: 2 }, pokemon, pokemon, move);
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  accelerock: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  achillesheel: {
    num: 967,
    accuracy: true,
    basePower: 50,
    category: "Special",
    name: "Achilles Heel",
    pp: 15,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Normal" || type === "Fire" || type === "Water" || type === "Electric" || type === "Grass" || type === "Ice" || type === "Fighting" || type === "Poison" || type === "Ground" || type === "Flying" || type === "Psychic" || type === "Bug" || type === "Rock" || type === "Dragon" || type === "Dark" || type === "Steel" || type === "Fairy" || type === "Wind" || type === "Cosmic" || type === "Sound" || type === "Nuclear" || type === "Digital" || type === "Plastic" || type === "Light" || type === "Crystal" || type === "Slime")
        return 1;
    },
    flags: { protect: 1 },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  acidrain: {
    num: 957,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Acid Rain",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "AcidRain",
    secondary: null,
    target: "all",
    type: "Poison",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  aircannon: {
    num: 1051,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Air Cannon",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Beautiful"
  },
  ancientroar: {
    num: 918,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ancient Roar",
    pp: 15,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1 },
	secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  ancientroarsound: {
    num: 1095,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ancient Roar Sound",
    pp: 15,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1 },
    onModifyType(move, pokemon, target) {
      const rockTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Rock";
      if (rockTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>rockTypeEffectiveness){
        move.type = "Sound"
      }
    },
	secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  aquaslam: {
    num: 1052,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Aqua slam",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        spe: -1
      }
    },
    target: "allAdjacentFoes",
    type: "Water",
    contestType: "Tough"
  },
  asteroidbelt: {
    num: 958,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Asteroid Belt",
    pp: 10,
    flags: { noassist: 1, failcopycat: 1 },
    volatileStatus: "asteroidbelt",
    condition: {
      duration: 5,
      onTryHit(target, source, move) {
        if (this.checkMoveMakesContact(move, source, target)) {
          this.damage(source.baseMaxhp / 8, source, target);
        }
        return this.NOT_FAIL;
      },
	  onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(1, 10)) {
          source.trySetStatus("frz", target);
        }
      }
    }
    },
    secondary: null,
    target: "self",
    type: "Rock",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  asteroidshot: {
    num: 901,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Asteroid Shot",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Rock",
    contestType: "Cute"
  },
  astralshot: {
    num: 1037,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Astral Shot",
    pp: 15,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  atomicpunch: {
    num: 972,
    accuracy: 95,
    basePower: 80,
    category: "Physical",
    name: "Atomic Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Nuclear",
    contestType: "Cute"
  },
  atomsplit: {
    num: 959,
    accuracy: 100,
    basePower: 250,
    category: "special",
    name: "Atom Split",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Beautiful"
  },
  atomsplitnuclear: {
    num: 1097,
    accuracy: 100,
    basePower: 250,
    category: "special",
    name: "Atom Split Nuclear",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  audacity: {
    num: 1155,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Audacity",
    pp: 5,
    priority: 0,
    flags: { sound: 1, distance: 1, bypasssub: 1 },
	boosts: {
      atk: 2,
      spe: 2,
	  evasion: 2
    },
    secondary: {
      chance: 100,
      volatileStatus: "perishsong"
    },
    target: "Self",
    type: "Fighting",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  bansheesscream: {
    num: 996,
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Banshee's Scream",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      chance: 35,
      volatileStatus: "perishsong"
    },
    target: "normal",
    type: "Sound",
    contestType: "Clever"
  },
  barbedtackle: {
    num: 926,
    accuracy: 100,
    basePower: 45,
    category: "Physical",
    name: "Barbed Tackle",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Tough"
  },
  barrierlight: {
    num: 1105,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Barrier Light",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 2
    },
    secondary: null,
    target: "self",
    type: "Light",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  basilisksglare: {
    num: 924,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Basilisk's Glare",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Rock" || !target.setType("Rock")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Rock");
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  batteringram: {
    num: 916,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Battering Ram",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTryHit(pokemon) {
      pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      pokemon.side.removeSideCondition("auroraveil");
    },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  bide: {
    inherit: true,
	flags: { contact: 1, protect: 1, nosleeptalk: 1, failinstruct: 1, speed: 1 }
  },
  bigbang: {
    num: 1038,
    accuracy: 100,
    basePower: 105,
    category: "Physical",
    name: "Big Bang",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      onHit(target, source) {
        const result = this.random(3);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "allAdjacent",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  blackout: {
    num: 1158,
    accuracy: 85,
    basePower: 70,
    category: "Physical",
    name: "Blackout",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "slp"
    },
    target: "normal",
    type: "Ghost",
    contestType: "Beautiful"
  },
  boltblitz: {
    num: 1156,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    isNonstandard: "Past",
    name: "Head Charge",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Tough"
  },
  bonesweep: {
    num: 927,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Bone Sweep",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Ground",
    contestType: "Tough"
  },
  boomburstsound: {
    num: 998,
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Boomburst Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Sound",
    contestType: "Tough"
  },
  bounce: {
    inherit: true,
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
  },
  brace: {
    num: 902,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Brace",
    pp: 15,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      atk: -1,
      spa: -1,
	  def: 1,
	  spd: 1
    },
    sideCondition: "brace",
    condition: {
      duration: 1,
      onSideStart(side) {
        this.add("-sidestart", side, "move: Brace");
      },
      onCriticalHit: false,
      onSideResidualOrder: 26,
      onSideResidualSubOrder: 6,
      onSideEnd(side) {
        this.add("-sideend", side, "move: Brace");
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
  },
  brainfreeze: {
    num: 928,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Brain Freeze",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Psychic",
    contestType: "Cool"
  },
  brainstorm: {
    num: 929,
    accuracy: 90,
    basePower: 70,
    category: "Special",
    name: "Brain Storm",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 70,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  bugbomb: {
    num: 1053,
    accuracy: 95,
    basePower: 70,
    category: "Special",
    name: "Bug Bomb",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Bug",
    contestType: "Cute"
  },
  bugbuzzsound: {
    num: 1001,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Bug Buzz Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
	onModifyType(move, pokemon, target) {
      const bugTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Bug";
      if (bugTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>bugTypeEffectiveness){
        move.type = "Sound"
      }
    },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
  },
  bugnoise: {
    num: 1130,
    accuracy: 90,
    basePower: 120,
    category: "Special",
    name: "Bug Noise",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      chance: 20,
      status: "par"
    },
    target: "allAdjacentFoes",
    type: "Bug"
  },
  bugout: {
    num: 951,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Bug Out",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "any",
    type: "Bug",
    contestType: "Cool"
  },
  bulletpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, speed: 1 }
  },
  cactussmash: {
    num: 930,
    accuracy: 100,
    basePower: 115,
    category: "Physical",
    name: "Cactus Smash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: {
      chance: 35,
      status: "psn"
    },
    target: "normal",
    type: "Grass",
    contestType: "Cool"
  },
  carbonize: {
    num: 1157,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Carbonize",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "psn"
    },
    critRatio: 2,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  causticbreath: {
    num: 903,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Caustic Breath",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1,
		spd: -1
      }
    },
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  chairdrop: {
    num: 955,
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Chair Drop",
    pp: 10,
    flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, distance: 1, nonsky: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Steel", type);
    },
    priority: 0,
    secondary: null,
    target: "any",
    type: "Fighting",
    zMove: { basePower: 170 },
    contestType: "Tough"
  },
  channel: {
    num: 1151,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Channel",
    pp: 10,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
	onHit(target, source, effect) {
      const ghostMoves = this.dex.moves.all().filter((move) =>
      move.type === "Ghost" &&
        (![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
        !move.realMove && !move.isZ && !move.isMax &&
        (!move.isNonstandard || move.isNonstandard === "Unobtainable") &&
        !effect.noMetronome.includes(move.name)
      );
      let randomGhostMove = "";
      if (ghostMoves.length) {
        ghostMoves.sort((a, b) => a.num - b.num);
        randomGhostMove = this.sample(ghostMoves).id;
      }
      if (!randomGhostMove) 
        return false;
      source.side.lastSelectedMove = this.toID(randomGhostMove);
      this.actions.useMove(randomGhostMove, target);
    },
    secondary: null,
    target: "self",
    type: "Ghost",
    contestType: "Cute"
  },
  chattersound: {
    num: 999,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    isNonstandard: "Past",
    name: "Chatter Sound",
    pp: 20,
    priority: 0,
    flags: {
      protect: 1,
      mirror: 1,
      sound: 1,
      distance: 1,
      bypasssub: 1,
      nosleeptalk: 1,
      noassist: 1,
      failcopycat: 1,
      failinstruct: 1,
      failmimic: 1
    },
    noSketch: true,
    secondary: {
      chance: 100,
      volatileStatus: "confusion"
    },
    target: "any",
    type: "Sound",
    contestType: "Cute"
  },
  cheapshot: {
    num: 904,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Cheap Shot",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    willCrit: true,
    secondary: null,
    target: "normal",
    type: "Dark"
  },
  cinderbreath: {
    num: 931,
    accuracy: 100,
    basePower: 55,
    category: "Special",
    name: "Cinder Breath",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  cloudburst: {
    num: 1159,
    accuracy: 90,
    basePower: 140,
    category: "Special",
    name: "Cloudburst",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -2
      }
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Beautiful"
  },
  cloudburstwind: {
    num: 1160,
    accuracy: 90,
    basePower: 140,
    category: "Special",
    name: "Cloudburst Wind",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -2
      }
    },
    secondary: null,
    target: "normal",
    type: "Wind",
    contestType: "Beautiful"
  },
  cometcrash: {
    num: 1046,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Comet Crash",
    pp: 10,
    priority: -6,
    flags: { contact: 1, protect: 1, mirror: 1 },
    forceSwitch: true,
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cute"
  },
  cometshower: {
    num: 1039,
    accuracy: 95,
    basePower: 80,
    category: "Physical",
    name: "Comet Shower",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 25,
      volatileStatus: "flinch"
    },
    target: "allAdjacent",
    type: "Cosmic",
    contestType: "Cool"
  },
  constructionblocks: {
    num: 1118,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Construction Blocks",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, mustpressure: 1 },
    sideCondition: "constructionblocks",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Construction Blocks");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("constructionblocks")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Plastic",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  coralbreak: {
    num: 973,
    accuracy: 95,
    basePower: 80,
    category: "Special",
    overrideDefensiveStat: "def",
    name: "Coral Break",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  corrode: {
    num: 919,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Corrode",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Steel")
        return 1;
    },
    flags: { protect: 1, mirror: 1 },
    ignoreImmunity: { "Steel": true },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
  },
  cosmicpowercosmic: {
    num: 1101,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Cosmic Power Cosmic",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 1,
      spd: 1
    },
    secondary: null,
    target: "self",
    type: "Cosmic",
    zMove: { boost: { spd: 1 } },
    contestType: "Beautiful"
  },
  cosmicray: {
    num: 1040,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Cosmic Ray",
    pp: 10,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
    secondary: {
      chance: 15,
      volatileStatus: "flinch"
    },
    target: "any",
    type: "Cosmic",
    contestType: "Cool"
  },
  courtchange: {
    num: 756,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Court Change",
    pp: 10,
    priority: 0,
    flags: { mirror: 1 },
    onHitField(target, source) {
      const sideConditions = [
        "mist",
        "lightscreen",
        "reflect",
        "spikes",
        "safeguard",
        "tailwind",
        "toxicspikes",
        "stealthrock",
        "waterpledge",
        "firepledge",
        "grasspledge",
        "stickyweb",
        "auroraveil",
		"fiesta",
		"salttherapy",
		"constructionblocks",
        "gmaxsteelsurge",
        "gmaxcannonade",
        "gmaxvinelash",
        "gmaxwildfire"
      ];
      let success = false;
      if (this.gameType === "freeforall") {
        const offset = this.random(3) + 1;
        const sides = [this.sides[0], this.sides[2], this.sides[1], this.sides[3]];
        const temp = { 0: {}, 1: {}, 2: {}, 3: {} };
        for (const side of sides) {
          for (const id in side.sideConditions) {
            if (!sideConditions.includes(id))
              continue;
            temp[side.n][id] = side.sideConditions[id];
            delete side.sideConditions[id];
            const effectName = this.dex.conditions.get(id).name;
            this.add("-sideend", side, effectName, "[silent]");
            success = true;
          }
        }
        for (let i = 0; i < 4; i++) {
          const sourceSideConditions = temp[sides[i].n];
          const targetSide = sides[(i + offset) % 4];
          for (const id in sourceSideConditions) {
            targetSide.sideConditions[id] = sourceSideConditions[id];
            const effectName = this.dex.conditions.get(id).name;
            let layers = sourceSideConditions[id].layers || 1;
            for (; layers > 0; layers--)
              this.add("-sidestart", targetSide, effectName, "[silent]");
          }
        }
      } else {
        const sourceSideConditions = source.side.sideConditions;
        const targetSideConditions = source.side.foe.sideConditions;
        const sourceTemp = {};
        const targetTemp = {};
        for (const id in sourceSideConditions) {
          if (!sideConditions.includes(id))
            continue;
          sourceTemp[id] = sourceSideConditions[id];
          delete sourceSideConditions[id];
          success = true;
        }
        for (const id in targetSideConditions) {
          if (!sideConditions.includes(id))
            continue;
          targetTemp[id] = targetSideConditions[id];
          delete targetSideConditions[id];
          success = true;
        }
        for (const id in sourceTemp) {
          targetSideConditions[id] = sourceTemp[id];
        }
        for (const id in targetTemp) {
          sourceSideConditions[id] = targetTemp[id];
        }
        this.add("-swapsideconditions");
      }
      if (!success)
        return false;
      this.add("-activate", source, "move: Court Change");
    },
    secondary: null,
    target: "all",
    type: "Normal"
  },
  crackleslam: {
    num: 1054,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Crackle Slam",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "allAdjacent",
    type: "Electric",
    contestType: "Cool"
  },
  crystalize: {
    num: 1161,
    accuracy: 90,
    basePower: 110,
    category: "Special",
    name: "Crystalize",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      status: "frz"
    },
    target: "normal",
    type: "Rock"
  },
  crystalizecrystal: {
    num: 1162,
    accuracy: 90,
    basePower: 110,
    category: "Special",
    name: "Crystalize Crystal",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      status: "frz"
    },
    target: "normal",
    type: "Crystal"
  },
  crystallization: {
    num: 1036,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Crystallization",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Crystal" || !target.setType("Crystal")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Crystal");
    },
    secondary: null,
    target: "normal",
    type: "Crystal",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  crystalrush: {
    num: 968,
    accuracy: 100,
    basePower: 45,
    category: "Physical",
    name: "Crystal Rush",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Beautiful"
  },
  cymbalcrash: {
    num: 1119,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Cymbal Crash",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, sound: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  darkmatter: {
    num: 920,
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Dark Matter",
    pp: 5,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1 },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  darkroar: {
    num: 1131,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Dark Roar",
    pp: 30,
    priority: 1,
	flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  darkroarsound: {
    num: 1132,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Dark Roar Sound",
    pp: 30,
    priority: 1,
	onModifyType(move, pokemon, target) {
      const darkTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dark";
      if (darkTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>darkTypeEffectiveness){
        move.type = "Sound"
      }
    },
    flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  dazzledust: {
    num: 1163,
    accuracy: 95,
    basePower: 0,
    damageCallback(pokemon, target) {
      return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
    },
    category: "Special",
    name: "Dazzle Dust",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  decapattack: {
    num: 1041,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    isNonstandard: "Past",
    name: "Decap Attack",
    pp: 10,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
	recoil: [1, 2],
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  defog: {
    num: 432,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Defog",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
    onHit(target, source, move) {
      let success = false;
      if (!target.volatiles["substitute"] || move.infiltrates)
        success = !!this.boost({ evasion: -1 });
      const removeTarget = [
        "reflect",
        "lightscreen",
        "auroraveil",
        "safeguard",
		"salttherapy",
        "mist",
        "spikes",
        "toxicspikes",
        "stealthrock",
        "stickyweb",
        "gmaxsteelsurge"
      ];
      const removeAll = [
        "constructionblocks",
		"fiesta",
		"spikes",
        "toxicspikes",
        "stealthrock",
        "stickyweb",
        "gmaxsteelsurge"
      ];
      for (const targetCondition of removeTarget) {
        if (target.side.removeSideCondition(targetCondition)) {
          if (!removeAll.includes(targetCondition))
            continue;
          this.add("-sideend", target.side, this.dex.conditions.get(targetCondition).name, "[from] move: Defog", "[of] " + source);
          success = true;
        }
      }
      for (const sideCondition of removeAll) {
        if (source.side.removeSideCondition(sideCondition)) {
          this.add("-sideend", source.side, this.dex.conditions.get(sideCondition).name, "[from] move: Defog", "[of] " + source);
          success = true;
        }
      }
      this.field.clearTerrain();
      return success;
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    zMove: { boost: { accuracy: 1 } },
    contestType: "Cool"
  },
  defogwind: {
    num: 1093,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Defog Wind",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1 },
    onHit(target, source, move) {
      let success = false;
      if (!target.volatiles["substitute"] || move.infiltrates)
        success = !!this.boost({ evasion: -1 });
      const removeTarget = [
        "reflect",
        "lightscreen",
        "auroraveil",
        "safeguard",
		"salttherapy",
        "mist",
        "spikes",
        "toxicspikes",
        "stealthrock",
        "stickyweb",
        "gmaxsteelsurge"
      ];
      const removeAll = [
        "constructionblocks",
		"fiesta",
		"spikes",
        "toxicspikes",
        "stealthrock",
        "stickyweb",
        "gmaxsteelsurge"
      ];
      for (const targetCondition of removeTarget) {
        if (target.side.removeSideCondition(targetCondition)) {
          if (!removeAll.includes(targetCondition))
            continue;
          this.add("-sideend", target.side, this.dex.conditions.get(targetCondition).name, "[from] move: Defog", "[of] " + source);
          success = true;
        }
      }
      for (const sideCondition of removeAll) {
        if (source.side.removeSideCondition(sideCondition)) {
          this.add("-sideend", source.side, this.dex.conditions.get(sideCondition).name, "[from] move: Defog", "[of] " + source);
          success = true;
        }
      }
      this.field.clearTerrain();
      return success;
    },
    secondary: null,
    target: "normal",
    type: "Wind",
    zMove: { boost: { accuracy: 1 } },
    contestType: "Cool"
  },
  dejavu: {
    num: 1042,
    accuracy: true,
    basePower: 105,
    category: "Special",
    name: "Deja-Vu",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Psychic",
    contestType: "Cool"
  },
  demoralize: {
    num: 1153,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Demoralize",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onTryHit(target) {
      if (target.getAbility().isPermanent || target.ability === "defeatist") {
        return false;
      }
    },
    onHit(pokemon) {
      const oldAbility = pokemon.setAbility("defeatist");
      if (oldAbility) {
        this.add("-ability", pokemon, "Defeatist", "[from] move: Demoralize");
        return;
      }
      return oldAbility;
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  depthcharge: {
    num: 960,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Depth Charge",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Water",
    contestType: "Cute"
  },
  devastate: {
    num: 1133,
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Devastate",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
  },
  devildarts: {
    num: 1164,
    accuracy: 100,
    basePower: 45,
    category: "Physical",
    name: "Devil  Darts",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    multihit: 2,
    smartTarget: true,
    secondary: null,
    target: "normal",
    type: "Fire",
    maxMove: { basePower: 130 }
  },
  diamondclaw: {
    num: 1055,
    accuracy: 95,
    basePower: 50,
    category: "Physical",
    name: "Diamond Claw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      chance: 50,
      boosts: {
        def: 1
      }
    },
    secondary: {
      // Sheer Force negates the self even though it is not secondary
    },
    target: "allAdjacentFoes",
    type: "Rock",
    contestType: "Beautiful"
  },
  diamondclawcrystal: {
    num: 1114,
    accuracy: 95,
    basePower: 50,
    category: "Physical",
    name: "Diamond Claw Crystal",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      chance: 50,
      boosts: {
        def: 1
      }
    },
    secondary: {
      // Sheer Force negates the self even though it is not secondary
    },
    target: "allAdjacentFoes",
    type: "Crystal",
    contestType: "Beautiful"
  },
  diamondstormcrystal: {
    num: 1113,
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Diamond Storm Crystal",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      chance: 50,
      boosts: {
        def: 2
      }
    },
    secondary: {
      // Sheer Force negates the self even though it is not secondary
    },
    target: "allAdjacentFoes",
    type: "Crystal",
    contestType: "Beautiful"
  },
  disarmingvoicesound: {
    num: 1002,
    accuracy: true,
    basePower: 40,
    category: "Special",
    name: "Disarming Voice Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    onModifyType(move, pokemon, target) {
      const fairyTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fairy";
      if (fairyTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>fairyTypeEffectiveness){
        move.type = "Sound"
      }
    },
	secondary: null,
    target: "allAdjacentFoes",
    type: "Fairy",
    contestType: "Cute"
  },
  dive: {
    num: 291,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dive",
    pp: 10,
    priority: 0,
    flags: {
      contact: 1,
      charge: 1,
      protect: 1,
      mirror: 1,
      nonsky: 1,
      allyanim: 1,
      nosleeptalk: 1,
      noassist: 1,
      failinstruct: 1
    },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      if (attacker.hasAbility("gulpmissile") && attacker.species.name === "Cramorant" && !attacker.transformed) {
        const forme = attacker.hp <= attacker.maxhp / 2 ? "cramorantgorging" : "cramorantgulping";
        attacker.formeChange(forme, move);
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    condition: {
      duration: 2,
      onImmunity(type, pokemon) {
        if (type === "sandstorm" || type === "hail")
          return false;
      },
      onInvulnerability(target, source, move) {
        if ([" depthcharge", "surf", "whirlpool"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceModifyDamage(damage, source, target, move) {
        if (move.id === "depthcharge" || move.id === "surf" || move.id === "whirlpool") {
          return this.chainModify(2);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  doubleshot: {
    num: 1134,
    accuracy: 100,
    basePower: 35,
    category: "Special",
    name: "Double Shot",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: 2,
    secondary: {
      chance: 20,
      self: {
        boosts: {
          accuracy: 1
        }
      }
    },
    target: "normal",
    type: "Fighting",
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  dracoblitz: {
    num: 932,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Draco Blitz",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1 },
    recoil: [50, 100],
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Dragon",
    contestType: "Cool"
  },
  dracojet: {
    num: 921,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Draco Jet",
    pp: 15,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonbeat: {
    num: 1135,
    accuracy: 90,
    basePower: 120,
    category: "Special",
    name: "Dragon Beat",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: {
      chance: 40,
      boosts: {
        atk: 2
      }
    },
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonify: {
    num: 922,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Dragonify",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Dragon" || !target.setType("Dragon")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Dragon");
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  dragonhide: {
    num: 1056,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dragon Hide",
    pp: 15,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 2,
      spd: 1
    },
    secondary: null,
    target: "self",
    type: "Dragon",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  dragonicbloom: {
    num: 1058,
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Dragonic Bloom",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Grass";
      const grassTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === grassTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Grass")){
          move.type = "Grass";
        }
      } else if(grassTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Grass"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonicflare: {
    num: 1059,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Dragonic Flare",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fire";
      const fireTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === fireTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Fire")){
          move.type = "Fire";
        }
      } else if(fireTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Fire"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonicglow: {
    num: 1060,
    accuracy: 95,
    basePower: 100,
    category: "Physical",
    name: "Dragonic Glow",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fairy";
      const fairyTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === fairyTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Fairy")){
          move.type = "Fairy";
        }
      } else if(fairyTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Fairy"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonicstrike: {
    num: 1061,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Dragonic Strike",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Electric";
      const electricTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === electricTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Electric")){
          move.type = "Electric";
        }
      } else if(electricTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Electric"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonicwave: {
    num: 1062,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Dragonic Wave",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Water";
      const waterTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === waterTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Water")){
          move.type = "Water";
        }
      } else if(waterTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Water"
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  dragonimpact: {
    num: 1057,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Dragon Impact",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        atk: -1,
        def: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  drainlife: {
    num: 974,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Drain Life",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  drakonvoice: {
    num: 923,
    accuracy: 85,
    basePower: 105,
    category: "Special",
    name: "Drakon Voice",
    pp: 10,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1 },
	secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  drakonvoicesound: {
    num: 1096,
    accuracy: 85,
    basePower: 105,
    category: "Special",
    name: "Drakon Voice Sound",
    pp: 10,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1 },
    onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Sound"
      }
    },
	secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  dryice: {
    num: 1063,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Dry Ice",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if(result === 1) {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
  },
  dryneedles: {
    num: 933,
    accuracy: 95,
    basePower: 18,
    category: "Physical",
    name: "Dry Needles",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Tough"
  },
  dustdevil: {
    num: 961,
    accuracy: 80,
    basePower: 90,
    category: "Special",
    name: "Dust Devil",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    onEffectiveness(typeMod, target, type, move) {
      if (move.type !== "Ground")
        return;
      if (!target)
        return;
      if (!target.runImmunity("Ground")) {
        if (target.hasType("Flying"))
          return 0;
      }
    },
    ignoreImmunity: { "Ground": true },
    secondary: null,
    target: "normal",
    type: "Ground",
    zMove: { basePower: 180 },
    contestType: "Beautiful"
  },
  dustydash: {
    num: 1064,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Dusty Dash",
    pp: 15,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "allAdjacentFoes",
    type: "Ground",
    contestType: "Cool"
  },
  echoedvoicesound: {
    num: 999,
    accuracy: 100,
    basePower: 40,
    basePowerCallback(pokemon, target, move) {
      let bp = move.basePower;
      if (this.field.pseudoWeather.echoedvoice) {
        bp = move.basePower * this.field.pseudoWeather.echoedvoice.multiplier;
      }
      this.debug("BP: " + move.basePower);
      return bp;
    },
    category: "Special",
    name: "Echoed Voice Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    onTry() {
      this.field.addPseudoWeather("echoedvoice");
    },
    condition: {
      duration: 2,
      onFieldStart() {
        this.effectState.multiplier = 1;
      },
      onFieldRestart() {
        if (this.effectState.duration !== 2) {
          this.effectState.duration = 2;
          if (this.effectState.multiplier < 5) {
            this.effectState.multiplier++;
          }
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Beautiful"
  },
  echoingblow: {
    num: 1120,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Echoing Blow",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1, sound: 1 },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  eevoboost: {
    num: 1043,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Eevoboost",
    pp: 5,
    priority: -1,
    flags: { snatch: 1 },
    boosts: {
      atk: 1,
      def: 1,
      spa: 1,
      spd: 1,
      spe: 1
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  electroburst: {
    num: 1165,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    isNonstandard: "Past",
    name: "Leaf Tornado",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 40,
      boosts: {
        accuracy: -1
      }
    },
    target: "allAdjacentFoes",
    type: "Electric",
    contestType: "Cool"
  },
  engulf: {
    num: 962,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Engulf",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterHit(target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Engulf", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "salttherapy", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Engulf", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    onAfterSubDamage(damage, target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Engulf", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "salttherapy", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Engulf", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  expunge: {
    num: 976,
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Expunge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "fallout":
          move.accuracy = true;
          break;
      }
    },
	onEffectiveness(typeMod, target, type) {
      if (type === "Nuclear")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
  },
  extremespeed: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  faengrush: {
    num: 934,
    accuracy: 95,
    basePower: 80,
    category: "Physical",
    name: "Faeng Rush",
    pp: 15,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  fakeout: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  fallout: {
    num: 975,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fallout",
    pp: 10,
    priority: 0,
    flags: {},
    weather: "Fallout",
    secondary: null,
    target: "all",
    type: "Nuclear",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  feint: {
    inherit: true,
	flags: { mirror: 1, noassist: 1, failcopycat: 1, speed: 1 }
  },
  fever: {
    num: 1065,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Fever",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool"
  },
  feyhammer: {
    num: 1066,
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Fey Hammer",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  fiesta: {
    num: 1000,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Fiesta",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, mustpressure: 1 },
    sideCondition: "fiesta",
    condition: {
        onSideStart(side) {
            this.add("-sidestart", side, "Fiesta");
            this.effectState.layers = 1;
        },
        onSideRestart(side) {
            if (this.effectState.layers >= 3) return false;
            this.add("-sidestart", side, "Fiesta");
            this.effectState.layers++;
        },
        onEntryHazard(pokemon, source) {
            if (pokemon.hp < pokemon.maxhp) {
                this.heal(pokemon.maxhp / 2);
                this.add('-heal', pokemon, pokemon.getHealth, '[from] move: Fiesta');
                this.effectState.layers--;
				 // Remove the Fiesta condition after healing
                if (this.effectState.layers <= 0) {
                    pokemon.side.removeSideCondition("fiesta");
				}
            }
        },
    },
    secondary: null,
    target: "allySide",
    type: "Normal",
    zMove: { boost: { def: 1 } },
    contestType: "Clever",
  },
  firecracker: {
    num: 1186,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Firecracker",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
    self: {
      volatileStatus: "followme"
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  fireworks: {
    num: 1067,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Fireworks",
    pp: 20,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Flying")
        return 1;
    },
    flags: { protect: 1, mirror: 1 },
    ignoreImmunity: { "Flying": true },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  firstimpression: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  fissionburst: {
    num: 977,
    accuracy: 100,
    basePower: 150,
    category: "special",
    name: "Fission Burst",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  flameimpact: {
    num: 978,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Flame Impact",
    pp: 15,
    priority: 2,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  flamejet: {
    num: 953,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Flame Jet",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  flashlight: {
    num: 1104,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Flash Light",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    boosts: {
      accuracy: -1
    },
    secondary: null,
    target: "normal",
    type: "Light",
    zMove: { boost: { evasion: 1 } },
    contestType: "Beautiful"
  },
  flashflood: {
    num: 935,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Flash Flood",
    pp: 15,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  flashbang: {
    num: 997,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Flashbang",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  flashcannonlight: {
    num: 1110,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Flash Cannon Light",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const steelTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Steel";
      if (steelTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>steelTypeEffectiveness){
        move.type = "Light"
      }
    },
    secondary: {
      chance: 10,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  flashpulse: {
    num: 996,
    accuracy: 90,
    basePower: 85,
    category: "Special",
    name: "Flash Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Light",
    contestType: "Clever"
  },
  flop: {
    num: 1124,
    accuracy: 80,
    basePower: 80,
    category: "Physical",
    isNonstandard: "Past",
    name: "Flop",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	critRatio: 2,
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Slime",
    contestType: "Cool"
  },
  fly: {
    inherit: true,
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
  },
  focusedram: {
    num: 936,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    isNonstandard: "Past",
    name: "Focused Ram",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Tough"
  },
  foggystrike: {
    num: 937,
    accuracy: true,
    basePower: 55,
    category: "Physical",
    name: "Foggy Strike",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  frostbite: {
    num: 1136,
    accuracy: 95,
    basePower: 80,
    category: "Special",
    name: "Frostbite",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 40,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
    target: "normal",
    type: "Ice",
    contestType: "Tough"
  },
  frostslash: {
    num: 905,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    isNonstandard: "Past",
    name: "Frost Slash",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    critRatio: 2,
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  galerush: {
    num: 1068,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Gale Rush",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "Normal",
    type: "Flying",
    contestType: "Cool"
  },
  gammaray: {
    num: 979,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Gamma Ray",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Tough"
  },
  gemstoneglimmer: {
    num: 980,
    accuracy: 95,
    basePower: 75,
    category: "Special",
    name: "Gemstone Glimmer",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 25,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  gemstoneglimmercrystal: {
    num: 1115,
    accuracy: 95,
    basePower: 75,
    category: "Special",
    name: "Gemstone Glimmer Crystal",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 25,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Crystal",
    contestType: "Tough"
  },
  geodecannon: {
    num: 1070,
    accuracy: 90,
    basePower: 90,
    category: "Special",
    name: "Geode Cannon",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  geodecannoncrystal: {
    num: 1116,
    accuracy: 90,
    basePower: 90,
    category: "Special",
    name: "Geode Cannon Crystal",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Tough"
  },
  geoimpact: {
    num: 1137,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Geo Impact",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 60,
      boosts: {
        spa: 2
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  geosphere: {
    num: 1069,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Geo-Sphere",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    onEffectiveness(typeMod, target, type, move) {
      if (move.type !== "Ground")
        return;
      if (!target)
        return;
      if (!target.runImmunity("Ground")) {
        if (target.hasType("Flying"))
          return 0;
      }
    },
    ignoreImmunity: { "Ground": true },
    secondary: null,
    target: "normal",
    type: "Ground",
    zMove: { basePower: 180 },
    contestType: "Beautiful"
  },
  ghastlywail: {
    num: 1071,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Ghastly wail",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Ghost",
    contestType: "Beautiful"
  },
  glaciercrash: {
    num: 1072,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Glacier Crash",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Ice",
    contestType: "Tough"
  },
  glide: {
    num: 1138,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Glide",
    pp: 30,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      self: {
        boosts: {
          accuracy: 1
        }
      }
    },
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  goldenfist: {
    num: 981,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Golden Fist",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
  },
  gravitycosmic: {
    num: 1100,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Gravity Cosmic",
    pp: 5,
    priority: 0,
    flags: { nonsky: 1 },
    pseudoWeather: "gravity",
    secondary: null,
    target: "all",
    type: "Cosmic",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  gravitywave: {
    num: 1139,
    accuracy: 100,
    basePower: 0,
    basePowerCallback(pokemon, target) {
      const targetWeight = target.getWeight();
      let bp;
      if (targetWeight >= 2e3) {
        bp = 120;
      } else if (targetWeight >= 1e3) {
        bp = 100;
      } else if (targetWeight >= 500) {
        bp = 80;
      } else if (targetWeight >= 250) {
        bp = 60;
      } else if (targetWeight >= 100) {
        bp = 40;
      } else {
        bp = 20;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Special",
    name: "Gravity Wave",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onTryHit(target, source, move) {
      if (target.volatiles["dynamax"]) {
        this.add("-fail", source, "move: Gravity Wave", "[from] Dynamax");
        this.attrLastMove("[still]");
        return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 },
    contestType: "Cute"
  },
  gravitywavecosmic: {
    num: 1140,
    accuracy: 100,
    basePower: 0,
    basePowerCallback(pokemon, target) {
      const targetWeight = target.getWeight();
      let bp;
      if (targetWeight >= 2e3) {
        bp = 120;
      } else if (targetWeight >= 1e3) {
        bp = 100;
      } else if (targetWeight >= 500) {
        bp = 80;
      } else if (targetWeight >= 250) {
        bp = 60;
      } else if (targetWeight >= 100) {
        bp = 40;
      } else {
        bp = 20;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Special",
    name: "Gravity Wave Cosmic",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onTryHit(target, source, move) {
      if (target.volatiles["dynamax"]) {
        this.add("-fail", source, "move: Gravity Wave Cosmic", "[from] Dynamax");
        this.attrLastMove("[still]");
        return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 },
    contestType: "Cute"
  },
  grimstinger: {
    num: 1166,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Grim Stinger",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, target) {
      if (target.status === "slp") {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
  },
  groomguard: {
    num: 938,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Groom Guard",
    pp: 15,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spd: 3
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  guardianleaf: {
    num: 1141,
    accuracy: 95,
    basePower: 75,
    category: "Physical",
    name: "Guardian Leaf",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      self: {
        boosts: {
          def: 1
        }
      }
    },
    target: "normal",
    type: "Grass",
    contestType: "Tough"
  },
  gustwind: {
    num: 1088,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Gust Wind",
    pp: 35,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
    secondary: null,
    target: "any",
    type: "Wind",
    contestType: "Clever"
  },
  halflife: {
    num: 982,
    accuracy: 90,
    basePower: 0,
    damageCallback(pokemon, target) {
      return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
    },
    category: "Special",
    name: "Half-Life",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Tough"
  },
  healbellsound: {
    num: 1003,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Heal Bell Sound",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, sound: 1, distance: 1, bypasssub: 1 },
    onHit(target, source) {
      this.add("-activate", source, "move: Heal Bell");
      let success = false;
      const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
      for (const ally of allies) {
        if (ally !== source && ally.hasAbility("soundproof"))
          continue;
        if (ally.cureStatus())
          success = true;
      }
      return success;
    },
    target: "allyTeam",
    type: "Sound",
    zMove: { effect: "heal" },
    contestType: "Beautiful"
  },
  hitandrun: {
    num: 1187,
    accuracy: 90,
    basePower: 65,
    category: "Physical",
    name: "Hit and Run",
    pp: 10,
    priority: -1,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onAfterHit(target, source, move) {
      if (source.item || source.volatiles["gem"]) {
        return;
      }
      const yourItem = target.takeItem(source);
      if (!yourItem) {
        return;
      }
      if (!this.singleEvent("TakeItem", yourItem, target.itemState, source, target, move, yourItem) || !source.setItem(yourItem)) {
        target.item = yourItem.id;
        return;
      }
      this.add("-item", source, yourItem, "[from] move: Hit and Run", "[of] " + target);
    },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cute"
  },
  hivemind: {
    num: 1167,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    overrideDefensiveStat: "def",
    name: "Hivemind",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
  },
  howlsound: {
    num: 1004,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Howl Sound",
    pp: 40,
    priority: 0,
    flags: { snatch: 1, sound: 1 },
    boosts: {
      atk: 1
    },
    secondary: null,
    target: "allies",
    type: "Sound",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  hurricanewind: {
    num: 1089,
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Hurricane Wind",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
          move.accuracy = true;
          break;
        case "sunnyday":
        case "desolateland":
          move.accuracy = 50;
          break;
      }
    },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "any",
    type: "Wind",
    contestType: "Tough"
  },
  hypervoicesound: {
    num: 1005,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Hyper Voice Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Sound",
    contestType: "Cool"
  },
  hypnopulse: {
    num: 1142,
    accuracy: 90,
    basePower: 55,
    category: "Special",
    name: "Hypnopulse",
    pp: 25,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "slp"
    },
    target: "any",
    type: "Psychic",
    contestType: "Beautiful"
  },
  iceshard: {
    inherit: true,
	flags: { protect: 1, mirror: 1, speed: 1 }
  },
 impulse: {
    num: 587,
    accuracy: 100,
    basePower: 140,
    category: "Physical",
    name: "Impulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Tough"
  },
  infernalblade: {
    num: 983,
    accuracy: 95,
    basePower: 90,
    category: "Special",
    name: "Infernal Blade",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Fairy")
        return 1;
    },
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  instantcrush: {
    num: 984,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Instant Crush",
    pp: 10,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  jetpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, speed: 1 }
  },
  jetstrike: {
    num: 906,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Jet Strike",
    pp: 15,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Beautiful"
  },
  jewelflash: {
    num: 1073,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Jewel Flash",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  jewelflashcrystal: {
    num: 1117,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Jewel Flash Crystal",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Crystal",
    contestType: "Tough"
  },
  landsliderush: {
    num: 954,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Landslide Rush",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Cute"
  },
  latentpower: {
    num: 1143,
    accuracy: 100,
    basePower: 130,
    category: "Special",
    name: "Latent Power",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        evasion: 2
      }
    },
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  leafdarts: {
    num: 1074,
    accuracy: 90,
    basePower: 10,
	basePowerCallback(pokemon, target, move) {
      return 10 * move.hit;
    },
    category: "Physical",
    name: "Leaf Darts",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    multihit: [1, 3],
	multiaccuracy: true,
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Tough"
  },
  leafshield: {
    num: 907,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Leaf Shield",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
        move.boosts = { def: 2, spd: 2 };
    },
    boosts: {
      def: 1,
      spd: 1
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { boost: { spa: 1 } },
    contestType: "Beautiful"
  },
  lightningstrike: {
    num: 1075,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Lightning Strike",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  lightscreenlight: {
    num: 1107,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Light Screen Light",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    sideCondition: "lightscreen",
    secondary: null,
    target: "allySide",
    type: "Light",
    zMove: { boost: { spd: 1 } },
    contestType: "Beautiful"
  },
  machpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, speed: 1 }
  },
  magmaring: {
    num: 1144,
    accuracy: true,
    basePower: 55,
    category: "Special",
    name: "Magma Ring",
    pp: 20,
    priority: -1,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  megalofang: {
    num: 1076,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Megalo Fang",
    pp: 15,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Water",
    contestType: "Cool"
  },
  mesmersmoke: {
    num: 1077,
    accuracy: 70,
    basePower: 0,
    category: "Status",
    name: "MEsmer Smoke",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "slp",
    secondary: null,
    target: "allAdjacent",
    type: "Poison",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  metalcruncher: {
    num: 985,
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Metal Cruncher",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 85,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  metalwhip: {
    num: 986,
    accuracy: 90,
    basePower: 50,
    category: "Physical",
    name: "Metal Whip",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  meteormashcosmic: {
    num: 1102,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Meteor Mash Cosmic",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
	onModifyType(move, pokemon, target) {
      const steelTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Cosmic";
      const cosmicTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Steel";
      if (steelTypeEffectiveness === cosmicTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Cosmic")){
          move.type = "Cosmic";
        }
      } else if(cosmicTypeEffectiveness>steelTypeEffectiveness){
        move.type = "Cosmic"
      }
    },
    secondary: {
      chance: 20,
      self: {
        boosts: {
          atk: 1
        }
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  mindblast: {
    num: 1078,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Mind Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  miraclewill: {
    num: 964,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Miracle Will",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, allyanim: 1 },
    onTryHit(target, source, move) {
      if (source.isAlly(target)) {
        move.basePower = 0;
        move.infiltrates = true;
      }
    },
    onHit(target, source) {
      if (source.isAlly(target)) {
        if (!this.heal(Math.floor(target.baseMaxhp * 0.5))) {
          this.add("-immune", target);
          return this.NOT_FAIL;
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Cute"
  },
  moonrazer: {
    num: 1168,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Moongrazer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "slp"
    },
    target: "normal",
    type: "Fairy"
  },
  mortalspin: {
    num: 866,
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Mortal Spin",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterHit(target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Mortal Spin", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "salttherapy", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Mortal Spin", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    onAfterSubDamage(damage, target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Mortal Spin", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "salttherapy", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Mortal Spin", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    secondary: {
      chance: 100,
      status: "psn"
    },
    target: "allAdjacentFoes",
    type: "Poison"
  },
  mudslide: {
    num: 908,
    accuracy: 95,
    basePower: 75,
    category: "Special",
    name: "Mudslide",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        evasion: -1
      }
    },
    target: "allAdjacentFoes",
    type: "Ground",
    contestType: "Cute"
  },
  nailflick: {
    num: 1044,
    accuracy: 90,
    basePower: 50,
    category: "Physical",
    name: "Nail Flick",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
	critRatio: 2,
    target: "normal",
    type: "Normal",
    contestType: "Cute"
  },
  nanorepair: {
    num: 925,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Nanorepair",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    heal: [1, 2],
	boosts: {
      def: 1
    },
    secondary: null,
    target: "self",
    type: "Steel",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  newmoon: {
    num: 969,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "New Moon",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "Darkness",
    secondary: null,
    target: "all",
    type: "Dark",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  nimbusfist: {
    num: 939,
    accuracy: 100,
    basePower: 35,
    category: "Physical",
    name: "Nimbus Fist",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 100,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Water",
    contestType: "Tough"
  },
  nobleroarsound: {
    num: 1006,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Noble Roar Sound",
    pp: 30,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    boosts: {
      atk: -1,
      spa: -1
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  nostrilflare: {
    num: 1045,
    accuracy: 90,
    basePower: 55,
    category: "Special",
    name: "Nostril Flare",
    pp: 20,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  nuclearslash: {
    num: 987,
    accuracy: 90,
    basePower: 55,
    category: "Physical",
    name: "Nuclear Slash",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
	critRatio: 2,
    target: "normal",
    type: "Nuclear",
    contestType: "Cute"
  },
  nuclearwaste: {
    num: 988,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Nuclear waste",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    // No Guard-like effect for Poison-type users implemented in Scripts#tryMoveHit
    status: "tox",
    secondary: null,
    target: "normal",
    type: "Nuclear",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  oceanswrath: {
    num: 989,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Ocean's Wrath",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  overheadstrike: {
    num: 949,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Overhead Strike",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    basePowerCallback(pokemon, target, move) {
      if (target.status || target.hasAbility("comatose")) {
        this.debug("BP doubled from status condition");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Cute"
  },
  ozonebeam: {
    num: 1128,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ozone Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal",
    type: "Wind",
    contestType: "Tough"
  },
  parasiticfungi: {
    num: 1188,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Parasitic Fungi",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onEffectiveness(typeMod, target, type) {
      if (type === "Normal" || type === "Bug")
        return 1;
    },
	volatileStatus: "parasiticfungi",
    condition: {
      duration: 5,
	  noCopy: true,
      onStart(pokemon) {
        this.add("-start", pokemon, "Parasitic Fungi");
      },
      onResidualOrder: 13,
      onResidual(pokemon) {
        const residualDamage = (pokemon.hasType(["Normal", "Bug"])) ? pokemon.baseMaxhp / 8 : pokemon.baseMaxhp / 16;
          this.damage(residualDamage, pokemon);
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Parasitic Fungi");
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass"
  },
  pentascale: {
    num: 1050,
    accuracy: 100,
    basePower: 15,
    category: "Special",
    name: "Penta Scale",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Beautiful"
  },
  perishsongsound: {
    num: 1007,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Perish Song Sound",
    pp: 5,
    priority: 0,
    flags: { sound: 1, distance: 1, bypasssub: 1 },
    onHitField(target, source, move) {
      let result = false;
      let message = false;
      for (const pokemon of this.getAllActive()) {
        if (this.runEvent("Invulnerability", pokemon, source, move) === false) {
          this.add("-miss", source, pokemon);
          result = true;
        } else if (this.runEvent("TryHit", pokemon, source, move) === null) {
          result = true;
        } else if (!pokemon.volatiles["perishsong"]) {
          pokemon.addVolatile("perishsong");
          this.add("-start", pokemon, "perish3", "[silent]");
          result = true;
          message = true;
        }
      }
      if (!result)
        return false;
      if (message)
        this.add("-fieldactivate", "move: Perish Song");
    },
    condition: {
      duration: 4,
      onEnd(target) {
        this.add("-start", target, "perish0");
        target.faint();
      },
      onResidualOrder: 24,
      onResidual(pokemon) {
        const duration = pokemon.volatiles["perishsong"].duration;
        this.add("-start", pokemon, "perish" + duration);
      }
    },
    secondary: null,
    target: "all",
    type: "Sound",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  perplex: {
    num: 965,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Perplex",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onBasePower(basePower, pokemon, target) {
      if (target.status === "confusion") {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  pesticide: {
    num: 1152,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Pesticide",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Bug")
        return 1;
    },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
  },
  phantomgrip: {
    num: 1079,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Phantom Grip",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  photongeyserlight: {
    num: 1103,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    isNonstandard: "Past",
    name: "Photon Geyser Light",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    ignoreAbility: true,
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  piercepincer: {
    num: 950,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Pierce PIncer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        def: -2
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  pillowpummel: {
    num: 1152,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Pillow Pummel",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      status: "slp"
    },
    target: "normal",
    type: "Fairy"
  },
  poisonleaf: {
    num: 1145,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Poison Leaf",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool"
  },
  polyblast: {
    num: 1119,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Polyblast",
    pp: 20,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1, distance: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "any",
    type: "Plastic",
    contestType: "Beautiful"
  },
  polygonalsword: {
    num: 1121,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Polygonal Sword",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Cool"
  },
  possession: {
    num: 910,
    accuracy: 100,
    basePower: 95,
    category: "Special",
	overrideOffensivePokemon: "target",
    overrideOffensiveStat: "atk",
    name: "Possession",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Beautiful"
  },
  powergemcrystal: {
    num: 1112,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Power Gem Crystal",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Beautiful"
  },
  pressurize: {
    num: 940,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Pressurize",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spd: 2
    },
    secondary: null,
    target: "self",
    type: "Rock",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  prismaticlaserlight: {
    num: 1111,
    accuracy: 100,
    basePower: 160,
    category: "Special",
    isNonstandard: "Past",
    name: "Prismatic Laser Light",
    pp: 10,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1 },
	onModifyType(move, pokemon, target) {
      const psychicTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Psychic";
      if (psychicTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>psychicTypeEffectiveness){
        move.type = "Light"
      }
    },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Cool"
  },
  protonbeam: {
    num: 990,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Proton Beam",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -2
      }
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  psybolt: {
    num: 911,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Psybolt",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  psyburn: {
    num: 1146,
    accuracy: 70,
    basePower: 120,
    category: "Special",
    name: "Psyburn",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      self: {
        boosts: {
          spd: 1
        }
      }
    },
    target: "normal",
    type: "Psychic",
    contestType: "Cool"
  },
  pummel: {
    num: 1169,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Pummel",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          atk: 1
        }
      }
    },
    target: "normal",
    type: "Fighting",
    contestType: "Tough"
  },
  quantumleap: {
    num: 991,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Quantum Leap",
    pp: 5,
    priority: 0,
    flags: { contact: 1, charge: 1, mirror: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
    breaksProtect: true,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    condition: {
      duration: 2,
      onInvulnerability: false
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
  },
  quickattack: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  quicksand: {
    num: 1080,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Quicksand",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  radioacid: {
    num: 992,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Radioacid",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Nuclear",
    contestType: "Cute"
  },
  ragingwaves: {
    num: 1170,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Outrage",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1 },
    self: {
      volatileStatus: "lockedmove"
    },
    onAfterMove(pokemon) {
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
    },
    secondary: null,
    target: "randomNormal",
    type: "Water",
    contestType: "Cool"
  },
  rapidspin: {
    num: 229,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Rapid Spin",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterHit(target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "salttherapy", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    onAfterSubDamage(damage, target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
      }
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "salttherapy", "stickyweb", "gmaxsteelsurge"];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  rapidgrowth: {
    num: 1147,
    accuracy: 85,
    basePower: 100,
    category: "Special",
    name: "Rapid Growth",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
    target: "allAdjacentFoes",
    type: "Grass",
    contestType: "Cool"
  },
  razorblade: {
    num: 1081,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Razor Blade",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  razorwindwind: {
    num: 1090,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Razor Wind wind",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    critRatio: 2,
    secondary: null,
    target: "allAdjacentFoes",
    type: "Wind",
    contestType: "Cool"
  },
  reflectivecloak: {
    num: 1118,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reflective Cloak",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "protect",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    secondary: null,
    target: "self",
    type: "Light",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
  },
  reflectlight: {
    num: 1106,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reflect Light",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    sideCondition: "reflect",
    secondary: null,
    target: "allySide",
    type: "Light",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  relicsongsound: {
    num: 1008,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Relic Song Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      chance: 10,
      status: "slp"
    },
    onHit(target, pokemon, move) {
      if (pokemon.baseSpecies.baseSpecies === "Meloetta" && !pokemon.transformed) {
        move.willChangeForme = true;
      }
    },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (move.willChangeForme) {
        const meloettaForme = pokemon.species.id === "meloettapirouette" ? "" : "-Pirouette";
        pokemon.formeChange("Meloetta" + meloettaForme, this.effect, false, "[msg]");
      }
    },
    target: "allAdjacentFoes",
    type: "Sound",
    contestType: "Beautiful"
  },
  replicate: {
    num: 1171,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Replicate",
    pp: 1,
    noPPBoosts: true,
    priority: 0,
    flags: {
      bypasssub: 1,
      allyanim: 1,
      failencore: 1,
      nosleeptalk: 1,
      noassist: 1,
      failcopycat: 1,
      failinstruct: 1,
      failmimic: 1
    },
    onHit(target, source) {
      const disallowedMoves = ["chatter", "sketch", "struggle"];
      const move = target.lastMove;
      if (source.transformed || !move || source.moves.includes(move.id))
        return false;
      if (disallowedMoves.includes(move.id) || move.isZ || move.isMax)
        return false;
      const sketchIndex = source.moves.indexOf("sketch");
      if (sketchIndex < 0)
        return false;
      const sketchedMove = {
        move: move.name,
        id: move.id,
        pp: move.pp,
        maxpp: move.pp,
        target: move.target,
        disabled: false,
        used: false
      };
      source.moveSlots[sketchIndex] = sketchedMove;
      source.baseMoveSlots[sketchIndex] = sketchedMove;
      this.add("-activate", source, "move: Sketch", move.name);
    },
    noSketch: true,
    secondary: null,
    target: "normal",
    type: "Psychic",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Clever"
  },
  rhythmstrike: {
    num: 1049,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Rhythm Strike",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, sound: 1 },
    secondary: {
      chance: 100,
      boosts: {
        def: -1,
		spd: -1
      }
    },
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  ripen: {
    num: 1172,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Ripen",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 1,
      spa: 2
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  ripplewave: {
    num: 1082,
    accuracy: 90,
    basePower: 50,
    category: "Special",
    name: "Ripple Wave",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: 2,
    secondary: null,
    target: "normal",
    type: "Water",
    zMove: { basePower: 140 },
    maxMove: { basePower: 120 },
    contestType: "Cool"
  },
  roarsound: {
    num: 1009,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Roar Sound",
    pp: 20,
    priority: -6,
    flags: { reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
    forceSwitch: true,
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  roundsound: {
    num: 1010,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(target, source, move) {
      if (move.sourceEffect === "roundsound") {
        this.debug("BP doubled");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Special",
    name: "Round Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    onTry(source, target, move) {
      for (const action of this.queue.list) {
        if (!action.pokemon || !action.move || action.maxMove || action.zmove)
          continue;
        if (action.move.id === "roundsound") {
          this.queue.prioritizeAction(action, move);
          return;
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Beautiful"
  },
  rubblerush: {
    num: 1173,
    accuracy: 80,
    basePower: 140,
    category: "Physical",
    name: "Brave Bird",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  saltcrash: {
    num: 917,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Salt Crash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          def: 1
        }
      }
    },
    target: "normal",
    type: "Fighting"
  },
  salttherapy: {
    num: 1185,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Salt Therapy",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    sideCondition: "salttherapy",
    condition: {
      duration: 5,
      onStart(side) {
        this.add('-sidestart', side, 'move: Salt Therapy');
      },
      onResidualOrder: 6,
      onResidual(side) {
        const target = this.effectState.target;
        const heal = this.heal(target.baseMaxhp / 16);
        this.add('-heal', target, target.getHealth, '[from] move: Salt Therapy', '[of] ' + target);
      },
      onSideEnd(side) {
        this.add('-sideend', side, 'move: Salt Therapy');
      },
    },
    secondary: null,
    target: "allySide",
    type: "Rock",
    contestType: "Beautiful",
  },
  screechsound: {
    num: 1011,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Screech Sound",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1 },
    boosts: {
      def: -2
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { atk: 1 } },
    contestType: "Clever"
  },
  searingslash: {
    num: 941,
    accuracy: 95,
    basePower: 95,
    category: "Physical",
    name: "Searing Slash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
	critRatio: 2,
    target: "normal",
    type: "Fire",
    contestType: "Cute"
  },
  seedyrecede: {
    num: 956,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Seedy Recede",
    pp: 20,
    flags: { contact: 1, protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Cute"
  },
  shadetrance: {
    num: 1174,
    accuracy: 75,
    basePower: 0,
    category: "Status",
    name: "Shade Trance",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "slp",
    secondary: null,
    target: "normal",
    type: "Dark",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  shadowblast: {
    num: 1019,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Shadow Blast",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1 },
    critRatio: 2,
    secondary: null,
    target: "any",
    type: "Shadow",
    contestType: "Cool"
  },
  shadowblitz: {
    num: 1020,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Shadow Blitz",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Tough"
  },
  shadowbolt: {
    num: 1021,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Shadow Bolt",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Shadow",
    contestType: "Cool"
  },
  shadowbreak: {
    num: 1022,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Shadow Break",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Tough"
  },
  shadowchill: {
    num: 1023,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Shadow Chill",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowdown: {
    num: 1024,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Shadow Down",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1 },
    boosts: {
      def: -2
    },
    secondary: null,
    target: "normal",
    type: "Shadow",
    zMove: { boost: { atk: 1 } },
    contestType: "Clever"
  },
  shadowend: {
    num: 1025,
    accuracy: 80,
    basePower: 120,
    category: "Physical",
    name: "Shadow End",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [1, 2],
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Tough"
  },
  shadowfire: {
    num: 1026,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Shadow Fire",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowhalf: {
    num: 1027,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Shadow Half",
    pp: 5,
    priority: 0,
    flags: { protect: 1 },
    onHit(target, source) {
        if (target.hp > target.maxhp / 2) {
            this.damage(target.maxhp / 2, target);
        }
        if (source.hp > source.maxhp / 2) {
            this.damage(source.maxhp / 2, source);
        }
    },
    secondary: null,
    target: "allAdjacent",
    type: "Shadow",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  shadowhold: {
    num: 1028,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shadow Hold",
    pp: 5,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    onHit(target, source, move) {
      return target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Shadow",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  shadowmist: {
    num: 1029,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Shadow Mist",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    boosts: {
      evasion: -2
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Shadow",
    zMove: { boost: { accuracy: 1 } },
    contestType: "Cute"
  },
  shadowpanic: {
    num: 1030,
    accuracy: 60,
    basePower: 0,
    category: "Status",
    name: "Shadow Panic",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1 },
    volatileStatus: "confusion",
    secondary: null,
    target: "allAdjacentFoes",
    type: "Shadow",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  shadowrave: {
    num: 1031,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Shadow Rave",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowrush: {
    num: 1018,
    accuracy: 100,
    basePower: 55,
    category: "Physical",
    name: "Shadow Rush",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Tough"
  },
  shadowshed: {
    num: 1032,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Psychic Fangs",
    pp: 10,
    priority: 0,
    flags: {},
	onTryHit(pokemon) {
      pokemon.side.removeSideCondition("safeguard");
	  pokemon.side.removeSideCondition("reflect");
      pokemon.side.removeSideCondition("lightscreen");
      pokemon.side.removeSideCondition("auroraveil");
    },
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Clever"
  },
  shadowsky: {
    num: 1035,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shadow Sky",
    pp: 10,
    priority: 0,
    flags: {},
    weather: "Shadowyaura",
    secondary: null,
    target: "all",
    type: "Shadow",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  shadowsneak: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  shadowstorm: {
    num: 1033,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Shadow Rave",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowwave: {
    num: 1034,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Shadow Wave",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shieldbash: {
    num: 912,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Shield Bash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    overrideOffensiveStat: "def",
    secondary: null,
    target: "normal",
    type: "Steel"
  },
  shimmershot: {
    num: 1175,
    accuracy: 80,
    basePower: 65,
    category: "Special",
    name: "Shimmer Shot",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "allAdjacentFoes",
    type: "Questionmark",
    contestType: "Beautiful"
  },
  shimmershotlight: {
    num: 1176,
    accuracy: 80,
    basePower: 65,
    category: "Special",
    name: "Shimmer Shot Light",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "allAdjacentFoes",
    type: "Light",
    contestType: "Beautiful"
  },
  signalbeamlight: {
    num: 1109,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    isNonstandard: "Past",
    name: "Signal Beam Light",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
	onModifyType(move, pokemon, target) {
      const bugTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Bug";
      if (bugTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>bugTypeEffectiveness){
        move.type = "Light"
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
  },
  singsound: {
    num: 1012,
    accuracy: 55,
    basePower: 0,
    category: "Status",
    name: "Sing Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    status: "slp",
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { spe: 1 } },
    contestType: "Cute"
  },
  siphon: {
    num: 1177,
    accuracy: 75,
    basePower: 100,
    category: "Special",
    name: "Siphon",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Clever"
  },
  siphonbite: {
    num: 1083,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Siphon Bite",
    pp: 10,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Cool"
  },
  sizzlebeak: {
    num: 1178,
    accuracy: 95,
    basePower: 25,
    category: "Physical",
    name: "Sizzle Beak",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Cute"
  },
  skydrop: {
    inherit: true,
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
      }
  },
  skyfall: {
    num: 993,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Sky Fall",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Flying",
    contestType: "Cute"
  },
  sleeptalksound: {
    num: 1013,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sleep Talk Sound",
    pp: 10,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failinstruct: 1, failmimic: 1 },
    sleepUsable: true,
    onTry(source) {
      return source.status === "slp" || source.hasAbility("comatose");
    },
    onHit(pokemon) {
      const moves = [];
      for (const moveSlot of pokemon.moveSlots) {
        const moveid = moveSlot.id;
        if (!moveid)
          continue;
        const move = this.dex.moves.get(moveid);
        if (move.flags["nosleeptalk"] || move.flags["charge"] || move.isZ && move.basePower !== 1 || move.isMax) {
          continue;
        }
        moves.push(moveid);
      }
      let randomMove = "";
      if (moves.length)
        randomMove = this.sample(moves);
      if (!randomMove) {
        return false;
      }
      this.actions.useMove(randomMove, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Sound",
    zMove: { effect: "crit2" },
    contestType: "Cute"
  },
  slimyspit: {
    num: 1126,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Slimy Spit",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Clever"
  },
  smogdiffusion: {
    num: 948,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Smog Diffusion",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool"
  },
  snoresound: {
    num: 1014,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Snore Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    sleepUsable: true,
    onTry(source) {
      return source.status === "slp" || source.hasAbility("comatose");
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Sound",
    contestType: "Cute"
  },
  solarbeam: {
    inherit: true,
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "darkness"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
  },
  sonicboomsound: {
    num: 1015,
    accuracy: 90,
    basePower: 0,
    damage: 20,
    category: "Special",
    isNonstandard: "Past",
    name: "Sonic Boom Sound",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  spam: {
    num: 1123,
    accuracy: 100,
    basePower: 25,
    category: "Special",
    name: "Spam",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  sparklingariasound: {
    num: 1016,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    isNonstandard: "Past",
    name: "Sparkling Aria Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      dustproof: true,
      chance: 100,
      volatileStatus: "sparklingaria"
    },
	onModifyType(move, pokemon, target) {
      const waterTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Sound";
      const soundTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Water";
      if (waterTypeEffectiveness === soundTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Sound")){
          move.type = "Sound";
        }
      } else if(soundTypeEffectiveness>waterTypeEffectiveness){
        move.type = "Sound"
      }
    },
    onAfterMove(source, target, move) {
      for (const pokemon of this.getAllActive()) {
        if (pokemon !== source && pokemon.removeVolatile("sparklingaria") && pokemon.status === "brn" && !source.fainted) {
          pokemon.cureStatus();
        }
      }
    },
    target: "allAdjacent",
    type: "Water",
    contestType: "Tough"
  },
  spotlightlight: {
    num: 1108,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Spotlight Light",
    pp: 15,
    priority: 3,
    flags: { protect: 1, reflectable: 1, allyanim: 1, noassist: 1, failcopycat: 1 },
    volatileStatus: "spotlight",
    onTryHit(target) {
      if (this.activePerHalf === 1)
        return false;
    },
    secondary: null,
    target: "normal",
    type: "Light",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
  },
  squallstrike: {
    num: 1129,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Squall Strike",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Wind",
    contestType: "Beautiful"
  },
  standoff: {
    num: 966,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Standoff",
    pp: 5,
    priority: 0,
    flags: { reflectable: 1, mirror: 1 },
    onHit(target, source, move) {
      return target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    zMove: { boost: { spd: 1 } },
    contestType: "Cool"
  },
  stardust: {
    num: 1148,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Stardust",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Steel",
    contestType: "Beautiful"
  },
  stardustcosmic: {
    num: 1149,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Stardust Cosmic",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  starshot: {
    num: 1047,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Star Shot",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyPriority(priority, source, target, move) {
      if (this.field.isTerrain("gravity") && source.isGrounded()) {
        return priority + 1;
      }
    },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  stonesurge: {
    num: 1179,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Stone Surge",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  stormforecast: {
    num: 1150,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Storm Forecast",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        duration: 3,
        move: "stormforecast",
        source,
        moveData: {
          id: "stormforecast",
          name: "Storm Forecast",
          accuracy: 100,
          basePower: 120,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Electric"
        }
      });
      this.add("-start", source, "move: Storm Forecast");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  suckerpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  suddenstrike: {
    num: 994,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Sudden Strike",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Beautiful"
  },
  sulfuricspray: {
    num: 1084,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Sulfuric Spray",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      if (move.type !== "Poison")
        return;
      if (!target)
        return;
      if (!target.runImmunity("Poison")) {
        if (target.hasType("Steel"))
          return 0;
      }
    },
    ignoreImmunity: { "PoOison": true },
    secondary: null,
    target: "normal",
    type: "POison",
    zMove: { basePower: 180 },
    contestType: "Beautiful"
  },
  supernova: {
    num: 1048,
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "Super Nova",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
	pseudoWeather: "gravity",
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  supersonicsound: {
    num: 1017,
    accuracy: 55,
    basePower: 0,
    category: "Status",
    name: "Supersonic sound",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    volatileStatus: "confusion",
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  superstar: {
    num: 1122,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Superstar",
    pp: 5,
    priority: 0,
    flags: { contact: 1, recharge: 1, protect: 1, mirror: 1 },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  swiftcosmic: {
    num: 1099,
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "Swift Cosmic",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Cosmic",
    contestType: "Cool"
  },
  swindle: {
    num: 1180,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Swindle",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  tailwindwind: {
    num: 1092,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Tailwind",
    pp: 15,
    priority: 0,
    flags: { snatch: 1, wind: 1 },
    sideCondition: "tailwind",
    secondary: null,
    target: "allySide",
    type: "Wind",
    zMove: { effect: "crit2" },
    contestType: "Cool"
  },
  talongash: {
    num: 1085,
    accuracy: 90,
    basePower: 50,
    category: "Physical",
    name: "Talon Gash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    multihit: 2,
    secondary: null,
    target: "normal",
    type: "Flying",
    zMove: { basePower: 140 },
    maxMove: { basePower: 120 },
    contestType: "Cool"
  },
  tartantrum: {
    num: 942,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Tar-Tantrum",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1, punch: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  tendril: {
    num: 1125,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Tendril",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
  },
  terrorize: {
    num: 913,
    accuracy: 70,
    basePower: 120,
    category: "Special",
    name: "Terrorize",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Ghost",
    contestType: "Clever"
  },
  thornwhip: {
    num: 943,
    accuracy: 95,
    basePower: 50,
    category: "Physical",
    name: "Thorn Whip",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
	critRatio: 2,
    target: "normal",
    type: "Grass",
    contestType: "Cute"
  },
  thunder: {
    inherit: true,
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
		case "thunderstorm":
          move.accuracy = true;
          break;
        case "sunnyday":
        case "desolateland":
          move.accuracy = 50;
          break;
      }
    }
  },
  thunderclap: {
    num: 1181,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Thunderclap",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  thundercrush: {
    num: 952,
    accuracy: 80,
    basePower: 100,
    category: "Physical",
    name: "Thunder Crush",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  thunderslash: {
    num: 944,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Thunder Slash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
	critRatio: 2,
    target: "normal",
    type: "Electric",
    contestType: "Cute"
  },
  thunderstorm: {
    num: 995,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Thunderstorm",
    pp: 10,
    priority: 0,
    flags: {},
    weather: "Thunderstorm",
    secondary: null,
    target: "all",
    type: "Electric",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  tikitorch: {
    num: 1086,
    accuracy: 90,
    basePower: 60,
    category: "Special",
    name: "Tiki Torch",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      status: "brn"
    },
    target: "normal",
    type: "Grass",
    contestType: "Cool"
  },
  tornado: {
    num: 1127,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Tornado",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Wind",
    contestType: "Beautiful"
  },
  twirlenade: {
    num: 1182,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Twirlenade",
    pp: 5,
    priority: 0,
    flags: { snatch: 1 },
    volatileStatus: "confusion",
    boosts: {
      spe: 2,
      evasion: 1
    },
    secondary: null,
    target: "self",
    type: "Normal",
    contestType: "Clever"
  },
  twisterwind: {
    num: 1094,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Twister Wind",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, wind: 1 },
	onModifyType(move, pokemon, target) {
      const dragonTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Wind";
      const windTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Dragon";
      if (dragonTypeEffectiveness === windTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Wind")){
          move.type = "Wind";
        }
      } else if(windTypeEffectiveness>dragonTypeEffectiveness){
        move.type = "Wind"
      }
    },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "allAdjacentFoes",
    type: "Dragon",
    contestType: "Cool"
  },
  trickshot: {
    num: 1087,
    accuracy: 90,
    basePower: 30,
    category: "Special",
    name: "Trick Shot",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  typhoon: {
    num: 945,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Typhoon",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  uvray: {
    num: 1184,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "UV Ray",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1 },
    thawsTarget: true,
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  vacuumwave: {
    inherit: true,
	flags: { protect: 1, mirror: 1, speed: 1 }
  },
  vanish: {
    num: 946,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Vanish",
    pp: 5,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      evasion: 2
    },
    secondary: null,
    target: "self",
    type: "Ghost",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  venomswipe: {
    num: 947,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Venom Swipe",
    pp: 10,
    priority: 0,
    flags: { contact:1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Tough"
  },
  virugait: {
    num: 1183,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Virugait",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Poison",
    contestType: "Cool"
  },
  watershuriken: {
    inherit: true,
	flags: { protect: 1, mirror: 1, speed: 1 }
  },
  weatherball: {
    inherit: true,
    onModifyType(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.type = "Fire";
          break;
        case "raindance":
        case "primordialsea":
          move.type = "Water";
          break;
        case "sandstorm":
          move.type = "Rock";
          break;
        case "hail":
        case "snow":
          move.type = "Ice";
          break;
		case "darkness":
          move.type = "Dark";
          break;
		case "acidrain":
          move.type = "Poison";
          break;
		case "fallout":
          move.type = "Nuclear";
          break;
		case "thunderstorm":
          move.type = "Electric";
          break;
		case "shadowyaura":
          move.type = "Shadow";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
          move.basePower *= 2;
          break;
        case "raindance":
        case "primordialsea":
          move.basePower *= 2;
          break;
        case "sandstorm":
          move.basePower *= 2;
          break;
        case "hail":
        case "snow":
          move.basePower *= 2;
          break;
		case "darkness":
          move.basePower *= 2;
          break;
		case "acidrain":
          move.basePower *= 2;
          break;
		case "fallout":
          move.basePower *= 2;
          break;
		case "thunderstorm":
          move.basePower *= 2;
          break;
		case "shadowyaura":
          move.basePower *= 2;
          break;
      }
      this.debug("BP: " + move.basePower);
    }
  },
  webball: {
    num: 914,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Web Ball",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  whirlwindwind: {
    num: 1091,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Whirlwind Wind",
    pp: 20,
    priority: -6,
    flags: { reflectable: 1, mirror: 1, bypasssub: 1, allyanim: 1, wind: 1, noassist: 1, failcopycat: 1 },
    forceSwitch: true,
    secondary: null,
    target: "normal",
    type: "Wind",
    zMove: { boost: { spd: 1 } },
    contestType: "Clever"
  },
  windshear: {
    num: 915,
    accuracy: 100,
    basePower: 45,
    basePowerCallback(pokemon, target, move) {
      if (target.newlySwitched || this.queue.willMove(target)) {
        this.debug("Wind Shear damage boost");
        return move.basePower * 2;
      }
      this.debug("Wind Shear NOT boosted");
      return move.basePower;
    },
    category: "Special",
    name: "Wind Shear",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Flying"
  },
  wormhole: {
    num: 971,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "wormhole",
    pp: 30,
    priority: 1,
    flags: { speed: 1 },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  wormholecosmic: {
    num: 1098,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "wormhole Cosmic",
    pp: 30,
    priority: 1,
    flags: { speed: 1 },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  zippyzap: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  zombiestrike: {
    num: 970,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Zombie Strike",
    pp: 15,
    priority: 0,
    flags: { contact:1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Tough"
  }
};
//# sourceMappingURL=moves.js.map

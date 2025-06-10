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
    num: 3000,
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
  acesplay: {
    num: 3001,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Ace's Play",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    overrideOffensivePokemon: "target",
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Clever"
  },
  achillesheel: {
    num: 3002,
    accuracy: true,
    basePower: 50,
    category: "Physical",
    name: "Achilles Heel",
    pp: 15,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Normal" || type === "Fire" || type === "Water" || type === "Electric" || type === "Grass" || type === "Ice" || type === "Fighting" || type === "Poison" || type === "Ground" || type === "Flying" || type === "Psychic" || type === "Bug" || type === "Rock" || type === "Dragon" || type === "Dark" || type === "Steel" || type === "Fairy" || type === "Wind" || type === "Cosmic" || type === "Sound" || type === "Nuclear" || type === "Digital" || type === "Plastic" || type === "Light" || type === "Crystal" || type === "Slime" || type === "Blood")
        return 1;
    },
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  acidarmorslime: {
    num: 3512,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Acid Armor Slime",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      def: 2
    },
    secondary: null,
    target: "self",
    type: "Slime",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  acidrain: {
    num: 3003,
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
  acidsplash: {
    num: 3789,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Acid Splash",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      status: "psn"
    },
    target: "allAdjacent",
    type: "Poison",
    contestType: "Tough"
  },
  actionsword: {
    num: 3566,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Action Sword",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  adrenalinecatheter: {
    num: 3762,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Adrenaline Catheter",
    pp: 5,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1, heal: 1 },
	heal: [2, 10],
    stallingMove: true,
    volatileStatus: "endure",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Endure");
      },
      onDamagePriority: -10,
      onDamage(damage, target, source, effect) {
        if (effect?.effectType === "Move" && damage >= target.hp) {
          this.add("-activate", target, "move: Endure");
          return target.hp - 1;
        }
      }
    },
    secondary: null,
    target: "adjacentAlly",
    type: "Blood",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  aeroblast: {
    inherit: true,
	flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, wind: 1, legendary: 1 }
  },
  aerobuster: {
    num: 3539,
    accuracy: 100,
    basePower: 25,
    category: "Special",
    name: "Aerobuster",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Wind",
    contestType: "Cool"
  },
  aircannon: {
    num: 3004,
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
  airslam: {
    num: 3599,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Air Slam",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  allure: {
    num: 3005,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Allure",
    pp: 10,
    priority: 0,
	overrideOffensiveStat: "atk",
    flags: { contact: 1, protect: 1, mirror: 1 },
	onBasePower(basePower, attacker, defender, move) {
      if (
        defender.hasMove("attract") ||
        defender.hasAbility("allure") ||
        defender.hasAbility("cutecharm")
      ) {
        this.debug("Allure power reduction");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Tough"
  },
  altf4: {
    num: 3561,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Alt+F4",
    pp: 20,
    priority: -6,
    flags: {},
    onTry(source) {
      return !!this.canSwitch(source.side);
    },
    selfSwitch: true,
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "heal" },
    contestType: "Cool"
  },
  amalgamate: {
    num: 3736,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Amalgamate",
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
      const disallowedMoves = ["chatter", "sketch", "replicate", "copypaste", "amalgamate", "struggle"];
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
      this.add("-activate", source, "move: Amalgamate", move.name);
    },
    noSketch: true,
    secondary: null,
    target: "normal",
    type: "Blood",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Clever"
  },
  amethystassault: {
    num: 3653,
    accuracy: 95,
    basePower: 100,
    category: "Special",
    name: "Amethyst Assault",
    pp: 10,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fairy", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Crystal",
    zMove: { basePower: 170 },
    contestType: "Tough"
  },
  amoebahammer: {
    num: 3510,
    accuracy: 100,
    basePower: 160,
    category: "Physical",
    name: "Amoeba Hammer",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, cantusetwice: 1 },
    secondary: null,
    target: "normal",
    type: "Slime"
  },
  ampclaw: {
    num: 3006,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Amp Claw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  ancientroar: {
    num: 918,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ancient Roar",
    pp: 15,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1, magic: 1 },
	secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Tough"
  },
  ancientroarsound: {
    num: 3007,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ancient Roar Sound",
    pp: 15,
    priority: 0,
    flags: { sound: 1, bypasssub: 1, protect: 1, mirror: 1, magic: 1 },
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
  ancientpower: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  antivirusnet: {
    num: 3008,
    accuracy: 85,
    basePower: 35,
    category: "Physical",
    name: "Antivirus Net",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  anvilsmash: {
    num: 3583,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Anvil Smash",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Ground",
    contestType: "Tough"
  },
  aquaimpact: {
    num: 3663,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Aqua Impact",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Water"
  },
  aquaslam: {
    num: 3009,
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
  arceanbanish: {
    num: 3010,
    accuracy: 30,
    basePower: 0,
    category: "Special",
    name: "Arcean Banish",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    ohko: true,
    secondary: null,
    target: "normal",
    type: "Eldritch",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  arcticbreeze: {
    num: 3700,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Arctic Breeze",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 30,
      status: "fbt"
    },
    target: "normal",
    type: "Wind",
    contestType: "Tough"
  },
  aromawind: {
    num: 3664,
    accuracy: 95,
    basePower: 70,
    category: "Special",
    name: "Aroma Wind",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Grass",
    contestType: "Clever"
  },
  asteroidbelt: {
    num: 3011,
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
  asteroidfist: {
    num: 3530,
    accuracy: true,
    basePower: 75,
    category: "Physical",
    name: "Asteroid Fist",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  asteroidshot: {
    num: 3012,
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
  astralbarrage: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  astrallance: {
    num: 3013,
    accuracy: true,
    basePower: 80,
    category: "Special",
    name: "Astral Lance",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	willCrit: true,
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  astralshot: {
    num: 3014,
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
  astroforce: {
    num: 3665,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Astroforce",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          atk: 1,
          def: 1,
          spa: 1,
          spd: 1,
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Psychic",
    contestType: "Tough"
  },
  astroforcecosmic: {
    num: 3666,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Astroforce Cosmic",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          atk: 1,
          def: 1,
          spa: 1,
          spd: 1,
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  atomicbreath: {
    num: 3464,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Atomic Breath",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1 },
    thawsTarget: true,
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Tough"
  },
  atomicpulse: {
    num: 3811,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Atomic Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, pulse: 1 },
    secondary: null,
    target: "any",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  atomicpunch: {
    num: 3015,
    accuracy: 95,
    basePower: 80,
    category: "Physical",
    name: "Atomic Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Nuclear",
    contestType: "Cute"
  },
  atomsplit: {
    num: 3016,
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
    num: 3017,
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
  attackorder: {
    num: 454,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Attack Order",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    critRatio: 2,
    secondary: null,
	onHit(target, source) {
        if (this.field.isWeather("pheromones")) {
            if (!target.volatiles["partiallytrapped"]) {
                target.addVolatile("partiallytrapped", source);
                this.add("-activate", target, "move: Attack Order", "[of] " + source);
            }
        }
    },
    target: "normal",
    type: "Bug",
    contestType: "Clever"
  },
  attract: {
    num: 213,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Attract",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
    volatileStatus: "attract",
    condition: {
      noCopy: true,
      // doesn't get copied by Baton Pass
      onStart(pokemon, source, effect) {
        const isPheromonesActive = this.field.isWeather("pheromones");
        if (!isPheromonesActive && !((pokemon.gender === "M" && source.gender === "F") || (pokemon.gender === "F" && source.gender === "M"))) {
          this.debug("incompatible gender");
          return false;
        }
        if (!this.runEvent("Attract", pokemon, source)) {
          this.debug("Attract event failed");
          return false;
        }
        if (effect.name === "Cute Charm") {
          this.add("-start", pokemon, "Attract", "[from] ability: Cute Charm", "[of] " + source);
        } else if (effect.name === "Destiny Knot") {
          this.add("-start", pokemon, "Attract", "[from] item: Destiny Knot", "[of] " + source);
        } else {
          this.add("-start", pokemon, "Attract");
        }
      },
      onUpdate(pokemon) {
        if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles["attract"]) {
          this.debug("Removing Attract volatile on " + pokemon);
          pokemon.removeVolatile("attract");
        }
      },
      onBeforeMovePriority: 2,
      onBeforeMove(pokemon, target, move) {
        this.add("-activate", pokemon, "move: Attract", "[of] " + this.effectState.source);
        if (this.randomChance(1, 2)) {
          this.add("cant", pokemon, "Attract");
          return false;
        }
      },
      onEnd(pokemon) {
        this.add("-end", pokemon, "Attract", "[silent]");
      }
    },
    onTryImmunity(target, source) {
      return target.gender === "M" && source.gender === "F" || target.gender === "F" && source.gender === "M" || this.field.isWeather("pheromones");
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  audacity: {
    num: 3018,
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
  auraprojection: {
    num: 3019,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Aura Projection",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "battleaura",
    secondary: null,
    target: "all",
    type: "Fighting",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  aurasphere: {
    inherit: true,
	flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, bullet: 1, pulse: 1, magic: 1 }
  },
  aurorabeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  aurorawave: {
    num: 3020,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Aurora Wave",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Light",
    contestType: "Beautiful"
  },
  axekick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  babble: {
    num: 3021,
    accuracy: 100,
    basePower: 45,
    category: "Special",
    name: "Babble",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Tough"
  },
  banhammer: {
    num: 3565,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Ban Hammer",
    pp: 10,
    priority: -6,
    flags: { contact: 1, protect: 1, mirror: 1, noassist: 1, failcopycat: 1 },
    forceSwitch: true,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  banishingfist: {
    num: 3022,
    accuracy: 80,
    basePower: 100,
    category: "Physical",
    name: "Banishing Fist",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1, magic: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Cute"
  },
  bansheesscream: {
    num: 3023,
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Banshee's Scream",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, magic: 1 },
    secondary: {
      chance: 35,
      volatileStatus: "perishsong"
    },
    target: "normal",
    type: "Sound",
    contestType: "Clever"
  },
  barbedtackle: {
    num: 3024,
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
  barrier: {
    inherit: true,
	flags: { snatch: 1, metronome: 1, magic: 1 }
  },
  barrierlight: {
    num: 3025,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Barrier Light",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, magic: 1 },
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
    num: 3026,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Basilisk's Glare",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, magic: 1 },
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
  bassdropfinale: {
    num: 3725,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Bass Drop Finale",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "soundiumz",
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  basskick: {
    num: 3820,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Bass Kick",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, kick: 1, sound: 1 },
    secondary: {
      chance: 50,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Sound",
    contestType: "Cute"
  },
  batteringram: {
    num: 3027,
    accuracy: 100,
    basePower: 75,
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
  battlecry: {
    num: 3834,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Battle Cry",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, sound: 1, metronome: 1 },
    boosts: {
      atk: 1
    },
    secondary: null,
    target: "allies",
    type: "Fighting",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  beampulser: {
    num: 3543,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Beam Pulser",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  beamshield: {
    num: 3584,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Beam Shield",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "spikyshield",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    secondary: null,
    target: "self",
    type: "Fairy",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  beguile: {
    num: 3028,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Beguile",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onTryHit(target) {
      if (target.volatiles['attract']) {
        target.faint();
		return null;
      }
	},
	secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  behemothbash: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, failcopycat: 1, failmimic: 1, legendary: 1 }
  },
  behemothblade: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, failcopycat: 1, failmimic: 1, slicing: 1, legendary: 1 }
  },
  bide: {
    inherit: true,
	flags: { contact: 1, protect: 1, nosleeptalk: 1, failinstruct: 1, speed: 1 }
  },
  bigbang: {
    num: 3029,
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
  biggeestbang: {
    num: 3774,
    accuracy: true,
    basePower: 200,
    category: "Physical",
    isNonstandard: "Past",
    name: "Biggest Bang",
    pp: 1,
    priority: 0,
    flags: {},
    ignoreAbility: true,
    isZ: "arkhaniumz",
    secondary: {
      chance: 100,
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
    contestType: "Cool"
  },
  bitcrunched: {
    num: 3801,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "BitCrunched",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Questionmark",
    contestType: "Tough"
  },
  blackhole: {
    num: 3030,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Black Hole",
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
    type: "Dark",
    contestType: "Beautiful"
  },
  blackout: {
    num: 3031,
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
  blastcannon: {
    num: 3032,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    isNonstandard: "Past",
    name: "Blast Cannon",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1 },
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
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  blazekick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  blazinghoof: {
    num: 3465,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Blazing Hoof",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1, kick: 1 },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  bleakwindstorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, wind: 1, legendary: 1 }
  },
  blindingflash: {
    num: 3580,
    accuracy: 90,
    basePower: 80,
    category: "Special",
    name: "Blinding Flash",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  blisteringshield: {
    num: 3742,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blistering Shield",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "blisteringshield",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
	condition: {
      duration: 1,
      onStart(target) {
        this.add("-singleturn", target, "move: Protect");
      },
      onTryHitPriority: 3,
      onTryHit(target, source, move) {
        if (!move.flags["protect"]) {
          if (["gmaxoneblow", "gmaxrapidflow"].includes(move.id))
            return;
          if (move.isZ || move.isMax)
            target.getMoveHitData(move).zBrokeProtect = true;
          return;
        }
        if (move.smartTarget) {
          move.smartTarget = false;
        } else {
          this.add("-activate", target, "move: Protect");
        }
        const lockedmove = source.getVolatile("lockedmove");
        if (lockedmove) {
          if (source.volatiles["lockedmove"].duration === 2) {
            delete source.volatiles["lockedmove"];
          }
        }
        if (this.checkMoveMakesContact(move, source, target) && source.hasType("Ice")) {
          this.damage(source.baseMaxhp / 8, source, target);
          this.add("-message", "${source.name} was hurt by Blistering Shield due to its Ice typing!");
        }
        return this.NOT_FAIL;
      },
      onHit(target, source, move) {
        if (move.isZOrMaxPowered && this.checkMoveMakesContact(move, source, target) && source.hasType("Ice")) {
          this.damage(source.baseMaxhp / 8, source, target);
          this.add("-message", "${source.name} was hurt by Blistering Shield due to its Ice typing!");
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Blood",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  blitzcannon: {
    num: 3667,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Blitz Cannon",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
	onHit(target, source) {
      if (source.ability !== "megalauncher") {
        source.setAbility("megalauncher");
        this.add("-ability", source, "Mega Launcher", "[from] move: Blitz Cannon");
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  bloodblade: {
    num: 3735,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Blood Blade",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, magic: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0) {
        // Target fainted, heal the user
        this.heal(pokemon.baseMaxhp / 2, pokemon);
        this.add("-heal", pokemon, pokemon.getHealth, "[from] move: Blood Blade");
        return;
      }
      // Recoil scenario: calculate 50% recoil
      const recoilDamage = Math.floor(pokemon.baseMaxhp * 2 / 3);
      // If recoil would KO the user
      if (recoilDamage >= pokemon.hp) {
        // Instead of recoil, heal based on 50% of damage dealt
        const damageDealt = target.lastDamage || 0;
        const healingAmount = Math.floor(damageDealt / 2);
        if (healingAmount > 0) {
          this.heal(healingAmount, pokemon);
          this.add("-heal", pokemon, pokemon.getHealth, "[from] move: Blood Blade");
          // Determine target's highest stat
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
            // Boost that stat by 2
            this.boost({ [highestStat]: 1 }, pokemon);
          }
        }
      } else {
        // Apply recoil normally
        this.damage(recoilDamage, pokemon, pokemon, this.dex.conditions.get("recoil"));
      }
    },
    secondary: null,
    target: "any",
    type: "Blood",
    contestType: "Cool"
  },
  bloodblight: {
    num: 3765,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Blood Blight",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
	recoil: [2, 10],
	onBasePower(basePower, pokemon, target) {
      const weather = pokemon.effectiveWeather();
      if (weather === "acidrain" || weather === "fallout") {
        this.debug("boost by weather");
        return this.chainModify(1.5);
      }
    },
	onModifyMove(move, source, target) {
      const poisonedWeathers = ["acidrain", "fallout"];
      if (poisonedWeathers.includes(source.effectiveWeather())) {
        move.secondaries = move.secondaries || [];
        move.secondaries.push({
          chance: 30,
          status: "tox",
        });
      }
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
  },
  bloodclot: {
    num: 3750,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Blood Clot",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Fighting")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  blooddonation: {
    num: 3763,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blood Donation",
    pp: 5,
    priority: 0,
    flags: { bypasssub: 1, allyanim: 1, metronome: 1, heal: 1 },
	onHit(target, source) {
      const hpToSacrifice = Math.floor(source.maxhp / 4);
      if (source.hp <= hpToSacrifice) return false;

      // Sacrifice HP
      this.directDamage(hpToSacrifice, source);

      // Heal the ally
      this.heal(hpToSacrifice, target, source);

      // Copy highest boost
      let highestStat = null;
      let highestValue = 0;
      for (const stat in source.boosts) {
        if (source.boosts[stat] > highestValue) {
          highestStat = stat;
          highestValue = source.boosts[stat];
        }
      }

      if (highestStat && highestValue > 0) {
        const boost = {};
        boost[highestStat] = highestValue;
        this.boost(boost, target, source, this.dex.moves.get("Blood Pact"));
      }
    },
    onTryHit(target, source) {
      // Only usable on ally, not on self or enemies
      if (target === source || target.fainted) return false;
      if (!target.side || target.side !== source.side) return false;
    },
    secondary: null,
    target: "adjacentAlly",
    type: "Blood",
	zMove: { effect: "heal" },
	contestType: "Clever"
  },
  bloodyresonance: {
    num: 3748,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Bloody Resonance",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, sound: 1, magic: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Sound")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  blockblitz: {
    num: 3484,
    accuracy: 70,
    basePower: 110,
    category: "Physical",
    name: "Block Blitz",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  bloodharvest: {
    num: 3761,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Blood Harvest",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, heal: 1, slicing: 1 },
	onAfterHit(target, source, move) {
      // If no damage was done or user fainted, abort
      if (!target || !target.hp || source.fainted) return;

      const damage = Math.floor(target.lastDamage / 2);
      if (!damage) return;

      // Default heal target is the source
      let healTarget = source;

      // In doubles: check if an ally has lower HP percentage than source
      if (source.side.active.length > 1) {
        for (const ally of source.side.active) {
          if (!ally || ally.fainted) continue;
          const allyHpRatio = ally.hp / ally.maxhp;
          const healHpRatio = healTarget.hp / healTarget.maxhp;
          if (allyHpRatio < healHpRatio) {
            healTarget = ally;
          }
        }
      }

      // Heal the chosen target
      this.heal(damage, healTarget, source, move);
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Cute"
  },
  bloodintheair: {
    num: 3759,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blood in the Air",
    pp: 15,
    priority: 2,
    flags: { noassist: 1, failcopycat: 1 },
	boosts: {
      def: 2
    },
    volatileStatus: "bloodintheair",
    onTry(source) {
      return this.activePerHalf > 1;
    },
    condition: {
      duration: 1,
      onStart(target, source, effect) {
        if (effect?.id === "zpower") {
          this.add("-singleturn", target, "move: Blood in the Air", "[zeffect]");
        } else {
          this.add("-singleturn", target, "move: Blood in the Air");
        }
		// Lose 10% max HP
		this.damage(target.maxhp / 10, target, target, this.dex.moves.get("bloodintheair"));
      },
      onFoeRedirectTargetPriority: 1,
      onFoeRedirectTarget(target, source, source2, move) {
        if (!this.effectState.target.isSkyDropped() && this.validTarget(this.effectState.target, source, move.target)) {
          if (move.smartTarget)
            move.smartTarget = false;
          this.debug("Blood in the Air redirected target of move");
          return this.effectState.target;
        }
      }
    },
    secondary: null,
    target: "adjacentAllyOrSelf",
    type: "Blood",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  bloodletting: {
    num: 3732,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Bloodletting",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, metronome: 1, magic: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
  },
  bloodsigil: {
    num: 3734,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Blood Sigil",
    pp: 10,
    priority: 0,
    flags: { reflectable: 1, metronome: 1, mustpressure: 1, magic: 1 },
    sideCondition: "bloodsigil",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Blood Sigil");
      },
      onModifyDamage(damage, source, target, move) {
        if (!source.isAlly(target)) return;
        if (move.type === "Eldritch" || move.type === "Ghost" || move.type === "Blood" || move.flags["magic"]) {
          this.debug("Blood Sigil boost");
          return this.chainModify([4915, 4096]); // ~1.2x = 4915/4096 (~20% boost)
        }
      }
    },
    secondary: null,
    target: "allySide",
    type: "Blood",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  bloodstormblitz: {
    num: 3755,
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Bloodstorm Blitz",
    pp: 5,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "allAdjacent",
    type: "Blood",
    contestType: "Cool"
  },
  bloodtransfusion: {
    num: 3760,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Blood Transfusion",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1, heal: 1 },
	onAfterHit(target, source, move) {
      // If no damage was done or user fainted, abort
      if (!target || !target.hp || source.fainted) return;

      const damage = Math.floor(target.lastDamage / 2);
      if (!damage) return;

      // Default heal target is the source
      let healTarget = source;

      // In doubles: check if an ally has lower HP percentage than source
      if (source.side.active.length > 1) {
        for (const ally of source.side.active) {
          if (!ally || ally.fainted) continue;
          const allyHpRatio = ally.hp / ally.maxhp;
          const healHpRatio = healTarget.hp / healTarget.maxhp;
          if (allyHpRatio < healHpRatio) {
            healTarget = ally;
          }
        }
      }

      // Heal the chosen target
      this.heal(damage, healTarget, source, move);
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Cute"
  },
  bloodytriggers: {
    num: 3550,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Bloody Triggers",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  blueblaster: {
    num: 3585,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Blue Blaster",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "allAdjacent",
    type: "Ice",
    contestType: "Tough"
  },
  blueflare: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  bluenote: {
    num: 3033,
    accuracy: 75,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Blue Note",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, sound: 1 },
    status: "slp",
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  boldblaze: {
    num: 3668,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Bold Blaze",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, target) {
      if (target.hp * 2 <= target.maxhp) {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  boltblitz: {
    num: 3034,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    isNonstandard: "Past",
    name: "Bolt Blitz",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Tough"
  },
  boltstrike: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  bonesweep: {
    num: 3035,
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
  boombubble: {
    num: 3586,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Boom Bubble",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Normal",
    contestType: "Tough"
  },
  boomburstsound: {
    num: 3036,
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
  bramblebash: {
    num: 3037,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    isNonstandard: "Past",
    name: "Bramble Bash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      volatileStatus: "rage"
    },
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Tough"
  },
  brace: {
    num: 3038,
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
    num: 3039,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Brain Freeze",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Psychic",
    contestType: "Cool"
  },
  brainhemorrhage: {
    num: 3738,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Brain Hemorrhage",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Blood"
  },
  brainstorm: {
    num: 3040,
    accuracy: 90,
    basePower: 70,
    category: "Special",
    name: "Brain Storm",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
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
  bricktrap: {
    num: 3480,
    accuracy: 90,
    basePower: 35,
    category: "Physical",
    name: "Brick Trap",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  brickwall: {
    num: 3502,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Brick Wall",
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
    type: "Plastic",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
  },
  brightbreak: {
    num: 3575,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Bright Break",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  bubblebeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  bufu: {
    num: 3041,
    accuracy: 90,
    basePower: 40,
    category: "Special",
    name: "Bufu",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 5,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
  },
  bufula: {
    num: 3042,
    accuracy: 90,
    basePower: 70,
    category: "Special",
    name: "Bufula",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 5,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
  },
  bufudyne: {
    num: 3043,
    accuracy: 90,
    basePower: 95,
    category: "Special",
    name: "Bufudyne",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
  },
  bugblaster: {
    num: 3587,
    accuracy: 90,
    basePower: 70,
    category: "Special",
    name: "Bug Blaster",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, pulse: 1 },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1
      }
    },
    target: "any",
    type: "Poison",
    contestType: "Cool"
  },
  bugbomb: {
    num: 3044,
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
    num: 3045,
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
  buggnaw: {
    num: 3046,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Bug Gnaw",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  bugnoise: {
    num: 3047,
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
    num: 3048,
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
  buildup: {
    num: 3487,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Build-Up",
    pp: 15,
    priority: 0,
    flags: { snatch: 1, metronome: 1 },
    boosts: {
      def: 2,
      evasion: -2
    },
    secondary: null,
    target: "self",
    type: "Plastic",
    zMove: { boost: { spa: 1 } },
    contestType: "Beautiful"
  },
  bulletpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, speed: 1 }
  },
  burningbulwark: {
    inherit: true,
	flags: { metronome: 1, noassist: 1, failcopycat: 1, legendary: 1 }
  },
  cablecrusher: {
    num: 3588,
    accuracy: true,
    basePower: 70,
    category: "Physical",
    name: "Cable Crusher",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Poison"
  },
  cacophony: {
    num: 3049,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Cacophony",
    pp: 10,
    priority: 0,
    flags: {sound: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1},
    self: {
      volatileStatus: "lockedmove",
    },
    onAfterMove(pokemon) {
      if (pokemon.volatiles["lockedmove"] && pokemon.volatiles["lockedmove"].duration === 1) {
        pokemon.removeVolatile("lockedmove");
      }
    },
    secondary: null,
    target: "randomNormal",
    type: "Sound",
    contestType: "Cool"
  },
  cactussmash: {
    num: 3050,
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
  camouflage: {
    num: 293,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Camouflage",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, metronome: 1 },
    onHit(target) {
      let newType = "Normal";
      if (this.field.isTerrain("electricterrain")) {
        newType = "Electric";
      } else if (this.field.isTerrain("grassyterrain")) {
        newType = "Grass";
      } else if (this.field.isTerrain("mistyterrain")) {
        newType = "Fairy";
      } else if (this.field.isTerrain("psychicterrain")) {
        newType = "Psychic";
      } else if (this.field.isTerrain("snowyterrain")) {
        newType = "Ice";
      } else if (this.field.isTerrain("midnightterrain")) {
        newType = "Dark";
      } else if (this.field.isTerrain("shiningterrain")) {
        newType = "Fire";
      }
      if (target.getTypes().join() === newType || !target.setType(newType))
        return false;
      this.add("-start", target, "typechange", newType);
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { evasion: 1 } },
    contestType: "Clever"
  },
  carbonize: {
    num: 3051,
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
  cataclysm: {
    num: 3052,
    accuracy: 100,
    basePower: 200,
    category: "Special",
    name: "Cataclysm",
    pp: 1,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  causticbreath: {
    num: 3053,
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
  cavein: {
    num: 3054,
    accuracy: 85,
    basePower: 90,
    category: "Physical",
    name: "Cave In",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  cerebralextraction: {
    num: 3758,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Cerebral Extraction",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, metronome: 1 },
	onAfterHit(target, source, move) {
      if (target.fainted && move.totalDamage) {
        this.heal(move.totalDamage, source);
      }
	},
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Tough"
  },
  chairdrop: {
    num: 3055,
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
    num: 3056,
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
  chargebeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  charminggnash: {
    num: 3057,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Charming Gnash",
    pp: 25,
    priority: 0,
    flags: { bite: 1, contact: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "attract"
    },
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  charmingtweety: {
    num: 3589,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "charming Tweety",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1 },
    boosts: {
      def: -2
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { atk: 1 } },
    contestType: "Clever"
  },
  charmingtweetysound: {
    num: 3590,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Charming Tweety Sound",
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
  chattersound: {
    num: 3058,
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
    num: 3059,
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
  chimericsynthesis: {
    num: 3740,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Chimeric Synthesis",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
	onHit(target, user) {
      // Fail if user does not have Blood type
      if (!user.hasType("Blood")) {
        this.add("-fail", user, "move: Chimeric Synthesis");
        return null;
      }

      const newType = target.getTypes()[0]; // target's primary type

      // Fail if user's type is already the target's type
      if (user.hasType(newType)) {
        this.add("-fail", user, "move: Chimeric Synthesis");
        return null;
      }

      // Change user type to target's primary type
      if (!user.setType(newType)) {
        return false;
      }
      this.add("-start", user, "typechange", newType);

      // Determine highest stat of the target (among Atk, SpA, Def, SpD)
      const targetStats = target.baseStoredStats || target.storedStats || target.stats;
      if (!targetStats) return;

      const statMap = {
        atk: "atk",
        spa: "spa",
        def: "def",
        spd: "spd"
      };

      let highestStat = "atk";
      let highestValue = -1;

      for (const stat of Object.keys(statMap)) {
        const val = targetStats[stat];
        if (val > highestValue) {
          highestValue = val;
          highestStat = statMap[stat];
        }
      }

      // Boost the user's stat accordingly
      this.boost({ [highestStat]: 1 }, user);
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  chomper: {
    num: 3060,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Chomper",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  chromeball: {
    num: 3669,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Chrome Ball",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    secondary: {
      chance: 20,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Clever"
  },
  cinderbreath: {
    num: 3061,
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
  clamhammer: {
    num: 3670,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Clamhammer",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Tough"
  },
  clockworkmouse: {
    num: 3499,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    isNonstandard: "Past",
    name: "Clockwork Mouse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    multihit: 2,
    secondary: null,
    target: "normal",
    type: "Plastic",
    maxMove: { basePower: 100 },
    contestType: "Cool"
  },
  clonestamp: {
    num: 3521,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Clone Stamp",
    pp: 20,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1 },
    onHit(pokemon) {
      let move = this.lastMove;
      if (!move)
        return;
      if (move.isMax && move.baseMove)
        move = this.dex.moves.get(move.baseMove);
      if (move.flags["failcopycat"] || move.isZ || move.isMax) {
        return false;
      }
      this.actions.useMove(move.id, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { boost: { accuracy: 1 } },
    contestType: "Cute"
  },
  cloudburst: {
    num: 3062,
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
    num: 3063,
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
  clustercrash: {
    num: 3557,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Cluster Crash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Crystal"
  },
  codeoverload: {
    num: 3717,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Code Overload",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "digiumz",
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Cool"
  },
  collisioncourse: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, legendary: 1 }
  },
  cometcrash: {
    num: 3064,
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
    num: 3065,
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
  compostbomber: {
    num: 3591,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Compost Bomber",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 50,
      status: "psn"
    },
    target: "allAdjacent",
    type: "Poison",
    contestType: "Tough"
  },
  compoundbrick: {
    num: 3482,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Compound Brick",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
	type: "Plastic",
    contestType: "Tough"
  },
  concertcrush: {
    num: 3592,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Concert Crush",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, mirror: 1, sound: 1 },
    boosts: {
      atk: -1,
      spa: -1
    },
    secondary: null,
    target: "allAdjacent",
    type: "Dark",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  condensate: {
    num: 3697,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Condensate",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      const newTypes = target.types.map(type => {
        if (type === "Wind") return "Water";
        return type;
      });

      if (newTypes.join() === target.types.join()) {
        this.add("-fail", target);
        return null;
      }

      target.setType(newTypes);
      this.add("-start", target, "typechange", newTypes.join("/"));
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    zMove: { boost: { spd: 1 } },
    contestType: "Beautiful"
  },
  confusion: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  constructionblocks: {
    num: 3066,
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
  conversiondigital: {
    num: 3513,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Conversion Digital",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    onHit(target) {
      const type = this.dex.moves.get(target.moveSlots[0].id).type;
      if (target.hasType(type) || !target.setType(type))
        return false;
      this.add("-start", target, "typechange", type);
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Beautiful"
  },
  conversion2digital: {
    num: 3514,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Conversion 2 Digital",
    pp: 30,
    priority: 0,
    flags: { bypasssub: 1, metronome: 1 },
    onHit(target, source) {
      if (!target.lastMoveUsed) {
        return false;
      }
      const possibleTypes = [];
      const attackType = target.lastMoveUsed.type;
      for (const type of this.dex.types.names()) {
        if (source.hasType(type))
          continue;
        const typeCheck = this.dex.types.get(type).damageTaken[attackType];
        if (typeCheck === 2 || typeCheck === 3) {
          possibleTypes.push(type);
        }
      }
      if (!possibleTypes.length) {
        return false;
      }
      const randomType = this.sample(possibleTypes);
      if (!source.setType(randomType))
        return false;
      this.add("-start", source, "typechange", randomType);
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { effect: "heal" },
    contestType: "Beautiful"
  },
  cookiecut: {
    num: 3067,
    accuracy: 100,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Cookie Cut",
    pp: 5,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          atk: 1,
          def: 1,
          spa: 1,
          spd: 1,
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  coolantreprocess: {
    num: 3812,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Coolant Reprocess",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    heal: [1, 2],
    secondary: null,
    target: "self",
    type: "Nuclear",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  copypaste: {
    num: 3068,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Copy-Paste",
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
      const disallowedMoves = ["chatter", "sketch", "replicate", "copypaste", "amalgamate", "struggle"];
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
      this.add("-activate", source, "move: Copy-Paste", move.name);
    },
    noSketch: true,
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Clever"
  },
  coralbreak: {
    num: 3069,
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
  coredetonation: {
    num: 3720,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Core Detonation",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "nucliumz",
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
  },
  coredump: {
    num: 3804,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Core Dump",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        spe: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Tough"
  },
  coreenforcer: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  corrode: {
    num: 3070,
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
  corrupt: {
    num: 3071,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "corrupt",
    pp: 5,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
	onHit(target) {
        const stats = ['atk', 'def', 'spa', 'spd', 'spe'];
        for (let i = 0; i < 2; i++) {
            const randomStat = this.sample(stats);
            stats.splice(stats.indexOf(randomStat), 1);
            this.boost({ [randomStat]: -2 }, target, target, this.dex.getActiveMove('corrupt'));
        }
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  cosmichorror: {
    num: 3526,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Cosmic Horror",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    boosts: {
      atk: -2
    },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  cosmicpowercosmic: {
    num: 3072,
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
    num: 3073,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Cosmic Ray",
    pp: 10,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1, distance: 1, beam: 1 },
    secondary: {
      chance: 15,
      volatileStatus: "flinch"
    },
    target: "any",
    type: "Cosmic",
    contestType: "Cool"
  },
  cosmicrays: {
    num: 3074,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Cosmic Rays",
    pp: 5,
    priority: 0,
    flags: { magic: 1 },
    weather: "psychicfield",
    secondary: null,
    target: "all",
    type: "Psychic",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  countsgambit: {
    num: 3744,
    accuracy: 100,
    basePower: 200,
    category: "Physical",
    name: "Count's Gambit",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Blood",
    contestType: "Beautiful"
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
		"hawthorns",
		"scorchedashes",
		"velvetscales",
		"salttherapy",
		"constructionblocks",
        "gmaxsteelsurge",
        "gmaxcannonade",
        "gmaxvinelash",
        "gmaxwildfire",
		"slimetrail",
		"bloodsigil",
		"livewire",
		"permafrost",
		"hotcoals"
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
    num: 3075,
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
  creamwhip: {
    num: 3076,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Cream Whip",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Ice",
    contestType: "Tough"
  },
  crimsonchain: {
    num: 3745,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Crimson chain",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Blood",
    contestType: "Tough"
  },
  crimsonfreeze: {
    num: 3751,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Crimson Freeze",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  crimsonjavelin: {
    num: 3753,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Crimson Javelin",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyPriority(priority, source, target, move) {
      if (target?.status) {
        return priority + 1;
      }
	},
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
  },
  crimsonpact: {
    num: 3727,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Crimson Pact",
    pp: 1,
    priority: 0,
    flags: { magic: 1 },
    isZ: "bloodiumz",
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Cool"
  },
  criticalerror: {
    num: 3640,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Critical Error",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  criticalstrike: {
    num: 3636,
    accuracy: 80,
    basePower: 100,
    category: "Physical",
    name: "Critical Strike",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  crushgrip: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  cryforpeace: {
    num: 3544,
    accuracy: 85,
    basePower: 110,
    category: "Special",
    name: "Cry for Peace",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1, magic: 1 },
    target: "allAdjacentFoes",
    type: "Fairy",
    contestType: "Beautiful"
  },
  cryoshock: {
    num: 3671,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Cryoshock",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Ice"
  },
  crystaldance: {
    num: 3501,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Crystal Dance",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1, metronome: 1 },
    boosts: {
      atk: 1,
      spe: 1
    },
    secondary: null,
    target: "self",
    type: "Crystal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  crystalize: {
    num: 3077,
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
    num: 3078,
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
    num: 3079,
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
    num: 3080,
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
  cursedwrath: {
    num: 3081,
    accuracy: 100,
    basePower: 0,
    basePowerCallback(pokemon, target) {
      const userHPPercentage = (pokemon.hp / pokemon.maxhp) * 100;
      let bp;
      if (userHPPercentage >= 68.75) {
        bp = 20;
      } else if (userHPPercentage >= 35.42) {
        bp = 40;
      } else if (userHPPercentage >= 20.83) {
        bp = 80;
      } else if (userHPPercentage >= 10.42) {
        bp = 100;
      } else if (userHPPercentage >= 4.17) {
        bp = 150;
      } else {
        bp = 200;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Special",
    name: "Cursed Wrath",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 },
    contestType: "Cute"
  },
  cut: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, hm: 1 }
  },
  cyberfist: {
    num: 3655,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Cyber Fist",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  cyclonebeatdown: {
    num: 3493,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Cyclone Beatdown",
    pp: 15,
    priority: 0,
    flags: {
      contact: 1,
      charge: 1,
      protect: 1,
      mirror: 1,
      distance: 1,
      nosleeptalk: 1,
      noassist: 1,
      failinstruct: 1
    },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 6, source, source, this.dex.conditions.get("High Jump Kick"));
    },
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
	onModifyType(move, pokemon, target) {
      const fightingTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Fighting";
      const windTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Wind";
      if (fightingTypeEffectiveness === windTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Fighting")){
          move.type = "Fighting";
        }
      } else if(windTypeEffectiveness>fightingTypeEffectiveness){
        move.type = "Fighting"
      }
    },
    secondary: null,
    target: "any",
    type: "Wind",
    contestType: "Clever"
  },
  cymbalcrash: {
    num: 3082,
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
  ddrkicks: {
    num: 3638,
    accuracy: 100,
    basePower: 0,
	basePowerCallback(pokemon, target, move) {
      // Track the number of hits and set base power accordingly
      const hitCount = move.hit;
      let bp = 0;
    
      if (hitCount === 1) {
        bp = 20; // First hit has 20 power
      } else if (hitCount === 2) {
        bp = 40; // Second hit has 40 power
      } else if (hitCount === 3 || hitCount > 3) {
        bp = 60; // Third hit has 60 power
      }
    
      this.debug("Hit count: " + hitCount + ", BP: " + bp);
      return bp;
	},
    category: "Physical",
    name: "DDR Kicks",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, kick: 1 },
    multihit: [1, 3],
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { basePower: 120 },
    maxMove: { basePower: 80 },
    contestType: "Clever"
  },
  darkbargain: {
    num: 3083,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dark Bargain",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, magic: 1  },
	volatileStatus: "curse",
    boosts: {
      spa: 2,
      spe: 2,
	  accuracy: 2
    },
    secondary: null,
    target: "self",
    type: "Dark",
    zMove: { boost: { spa: 1 } },
    contestType: "Beautiful"
  },
  darkeningbolt: {
    num: 3084,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Darkening Bolt",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1  },
    secondary: {
      chance: 10,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  darkmatter: {
    num: 3085,
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
  darknetwork: {
    num: 3593,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Dark Network",
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
    type: "Poison",
    contestType: "Beautiful"
  },
  darkpulse: {
    inherit: true,
	flags: { protect: 1, mirror: 1, distance: 1, metronome: 1, pulse: 1, magic: 1 }
  },
  darkroar: {
    num: 3086,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Dark Roar",
    pp: 30,
    priority: 1,
	flags: { protect: 1, mirror: 1, sound: 1, speed: 1, magic: 1  },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  darkroarsound: {
    num: 3087,
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
    flags: { protect: 1, mirror: 1, sound: 1, speed: 1, magic: 1  },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  darkshot: {
    num: 3594,
    accuracy: true,
    basePower: 80,
    category: "Special",
    name: "Dark Shot",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, pulse: 1, magic: 1  },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Beautiful"
  },
  darkwhispers: {
    num: 3571,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Dark Whispers",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Cute"
  },
  datadrill: {
    num: 3661,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Data Drill",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  dataoverflow: {
    num: 3648,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Data Overflow",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Digital",
    contestType: "Clever"
  },
  datatransfer: {
    num: 3088,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Data Transfer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Clever"
  },
  dazzledust: {
    num: 3089,
    accuracy: 95,
    basePower: 0,
    damageCallback(pokemon, target) {
      return this.clampIntRange(target.getUndynamaxedHP() / 2, 1);
    },
    category: "Special",
    name: "Dazzle Dust",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, powder: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  ddosattack: {
    num: 3519,
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "DDOS Attack",
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
    type: "Digital",
    contestType: "Tough"
  },
  deathnail: {
    num: 3595,
    accuracy: 95,
    basePower: 85,
    category: "Physical",
    name: "Death Nail",
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
    type: "Ghost",
    contestType: "Cool"
  },
  decapattack: {
    num: 3090,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    isNonstandard: "Past",
    name: "Decap Attack",
    pp: 10,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1 },
	recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  deafeningnoise: {
    num: 3091,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Deafening Noise",
    pp: 10,
    priority: 0,
    flags: {sound: 1, protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1},
	onTryHit(target) {
      if (target.getAbility().flags["cantsuppress"] || target.ability === "soundproof" || target.ability === "truant") {
        return false;
      }
    },
    onHit(pokemon) {
      const oldAbility = pokemon.setAbility("soundproof");
      if (oldAbility) {
        this.add("-ability", pokemon, "soundproof", "[from] move: Deafening Noise");
        return;
      }
      return oldAbility;
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Clever"
  },
  decode: {
	num: 3092,
	accuracy: 100,
	basePower: 60,
	category: "Special",
	name: "Decode",
	pp: 20,
	priority: 0,
	flags: { protect: 1, mirror: 1 },
	secondary: null,
	target: "normal",
	type: "Digital",
	contestType: "Clever"
  },
  deepyawn: {
    num: 3093,
    accuracy: 75,
    basePower: 0,
    category: "Status",
    name: "Deep Yawn",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, sound: 1 },
    status: "slp",
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  defendorder: {
    inherit: true,
	onModifyMove(move, pokemon) {
      if (["pheromones"].includes(pokemon.effectiveWeather()))
        move.boosts = { def: 2, spd: 2 };
    }
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
		"hawthorns",
		"scorchedashes",
		"velvetscales",
        "stickyweb",
        "gmaxsteelsurge",
		"slimetrail",
		"bloodsigil",
		"livewire",
		"permafrost",
		"hotcoals"
      ];
      const removeAll = [
        "constructionblocks",
		"fiesta",
		"spikes",
        "toxicspikes",
        "stealthrock",
		"hawthorns",
		"scorchedashes",
		"velvetscales",
        "stickyweb",
        "gmaxsteelsurge",
		"slimetrail",
		"bloodsigil",
		"livewire",
		"permafrost",
		"hotcoals"
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
    num: 3094,
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
		"hawthorns",
		"scorchedashes",
		"velvetscales",
        "stickyweb",
        "gmaxsteelsurge",
		"slimetrail",
		"bloodsigil",
		"livewire",
		"permafrost",
		"hotcoals"
      ];
      const removeAll = [
        "constructionblocks",
		"fiesta",
		"spikes",
        "toxicspikes",
        "stealthrock",
		"hawthorns",
		"scorchedashes",
		"velvetscales",
        "stickyweb",
        "gmaxsteelsurge",
		"slimetrail",
		"bloodsigil",
		"livewire",
		"permafrost",
		"hotcoals"
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
  defragmentation: {
    num: 3645,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Defragmentation",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spe: 2
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  dejavu: {
    num: 3095,
    accuracy: true,
    basePower: 105,
    category: "Special",
    name: "Deja-Vu",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Psychic",
    contestType: "Cool"
  },
  demoncore: {
    num: 3810,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Demon Core",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    secondary: {
      chance: 10,
      status: "tox"
    },
    target: "normal",
    type: "Nuclear"
  },
  demoralize: {
    num: 3096,
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
  denialofservice: {
    num: 3646,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Denial of Service",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, bypasssub: 1, metronome: 1 },
    volatileStatus: "disable",
    onTryHit(target) {
      if (!target.lastMove || target.lastMove.isZ || target.lastMove.isMax || target.lastMove.id === "struggle") {
        return false;
      }
    },
    
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  depthcharge: {
    num: 3097,
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
  desanguination: {
    num: 3743,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Desanguination",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1, magic: 1 },
    onHit(pokemon) {
      if (pokemon.hp <= pokemon.maxhp / 4 || pokemon.maxhp === 1) {
        return false;
      }
      this.directDamage(pokemon.maxhp / 4, pokemon, pokemon);
      this.boost({ atk: 2, spe: 1 }, pokemon);
    },
    secondary: null,
    target: "self",
    type: "Blood",
    zMove: { effect: "heal" },
    contestType: "Cool"
  },
  detox: {
    num: 3098,
    accuracy: 100,
    basePower: 130,
    category: "Special",
    name: "Detox",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onTry(source) {
      return source.status === "psn" || source.status === "tox";
    },
	onHit(target, source, move) {
      const success = source.cureStatus();
      if (success) {
        this.add('-clearstatus', source, source.status);
      }
      return success;
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Cute"
  },
  devastate: {
    num: 3099,
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
    num: 3100,
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
  devillishfavor: {
    num: 3572,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Devillish Favor",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1, magic: 1 },
    boosts: {
      atk: 1,
      spa: 1
    },
    secondary: null,
    target: "self",
    type: "Eldritch",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  devilsdeed: {
    num: 3596,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Devil's Deed",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, magic: 1  },
    boosts: {
      atk: 1,
      spe: 1
    },
    secondary: null,
    target: "self",
    type: "Dark",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  diablerie: {
    num: 3733,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Diablerie",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1, magic: 1 },
    onHit(target) {
      if (target.hp <= target.maxhp / 2 || target.boosts.atk >= 6 || target.maxhp === 1) {
        return false;
      }
      this.directDamage(target.maxhp / 2);
      this.boost({ atk: 12 }, target);
    },
    secondary: null,
    target: "self",
    type: "Blood",
    zMove: { effect: "heal" },
    contestType: "Cool"
  },
  diamondaxe: {
    num: 3554,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Diamond Axe",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Tough"
  },
  diamondclaw: {
    num: 3101,
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
    num: 3102,
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
  diamonddrop: {
    num: 3558,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Diamond Drop",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Psychic",
    contestType: "Cool"
  },
  diamonddust: {
    num: 3652,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Diamond Dust",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, powder: 1 },
    secondary: {
      chance: 100,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Crystal",
    contestType: "Cute"
  },
  diamondstorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  diamondstormcrystal: {
    num: 3103,
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
  diamondsword: {
    num: 3555,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Diamond Sword",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Cool"
  },
  dig: {
    num: 91,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Dig",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, nonsky: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
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
      onImmunity(type, pokemon) {
        if (type === "sandstorm" || type === "hail")
          return false;
      },
      onInvulnerability(target, source, move) {
        if (["earthquake", "magnitude", "earthmover", "gaiasfury", "anvilsmash", "terraforce", "webwrecker", "earthbreaker"].includes(move.id)) {
          return;
        }
        return false;
      },
      onSourceModifyDamage(damage, source, target, move) {
        if (move.id === "earthquake" || move.id === "magnitude" || move.id === "gaiasfury" || move.id === "anvilsmash" || move.id === "terraforce" || move.id === "webwrecker") {
          return this.chainModify(2);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  digibeam: {
    num: 3641,
    accuracy: 90,
    basePower: 80,
    category: "Special",
    name: "Digibeam",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Beautiful"
  },
  dinokick: {
    num: 3597,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Dino Kick",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
    onBasePower(basePower, source, target, move) {
      const item = target.getItem();
      if (!this.singleEvent("TakeItem", item, target.itemState, target, target, move, item))
        return;
      if (item.id) {
        return this.chainModify(1.5);
      }
    },
    onAfterHit(target, source) {
      if (source.hp) {
        const item = target.takeItem();
        if (item) {
          this.add("-enditem", target, item.name, "[from] move: Dino Kick", "[of] " + source);
        }
      }
    },
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
  },
  disarmingvoice: {
    inherit: true,
	flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, magic: 1 }
  },
  disarmingvoicesound: {
    num: 3104,
    accuracy: true,
    basePower: 40,
    category: "Special",
    name: "Disarming Voice Sound",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, magic: 1 },
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
  disceject: {
    num: 3523,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Disc Eject",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Cool"
  },
  discofever: {
    num: 3105,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Disco Fever",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    volatileStatus: "confusion",
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  discrot: {
    num: 3522,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Disc Rot",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Digital",
    contestType: "Beautiful"
  },
  dissonancefang: {
    num: 3817,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Dissonance Fang",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1, sound: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Sound",
    contestType: "Tough"
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
      failinstruct: 1,
	  hm: 1
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
  divinecall: {
    num: 3106,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Divine Call",
    pp: 10,
    priority: 0,
    flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
    onHit(target, source, effect) {
      const moves = this.dex.moves.all().filter(move => (
        (![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
        (!move.isNonstandard || move.isNonstandard === "Unobtainable") &&
        move.flags["legendary"]
      ));
      let randomMove = "";
      if (moves.length) {
        moves.sort((a, b) => a.num - b.num);
        randomMove = this.sample(moves).id;
      }
      if (!randomMove) return false;
      source.side.lastSelectedMove = this.toID(randomMove);
      this.actions.useMove(randomMove, target);
    },
    callsMove: true,
    secondary: null,
    target: "self",
    type: "Cosmic",
    contestType: "Beautiful",
  },
  divinenova: {
    num: 3719,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Divine Nova",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "lightiniumz",
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  doomdesire: {
    inherit: true,
	flags: { metronome: 1, futuremove: 1, legendary: 1 }
  },
  doomscrolling: {
    num: 3515,
    accuracy: 90,
    basePower: 80,
    category: "Special",
    name: "Doom Scrolling",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Digital"
  },
  doublekick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  doubleshot: {
    num: 3107,
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
    num: 3108,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Draco Blitz",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1 },
    recoil: [33, 100],
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Dragon",
    contestType: "Cool"
  },
  dracojet: {
    num: 3109,
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
  dragonascent: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, distance: 1, legendary: 1 }
  },
  dragonbeat: {
    num: 3110,
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
  dragonendurance: {
    num: 3111,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Dragon Endurance",
    pp: 15,
    priority: 0,
    flags: { nonsky: 1 },
    pseudoWeather: "dragonendurance",
    condition: {
      duration: 5,
      onFieldStart(field, source) {
        this.add("-fieldstart", "move: Dragon Endurance", "[of] " + source);
      },
      onBasePowerPriority: 1,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Electric" || move.type === "Fire" || move.type === "Grass" || move.type === "Water") {
          this.debug("dragon endurance weaken");
          return this.chainModify([1352, 4096]);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 3,
      onFieldEnd() {
        this.add("-fieldend", "move: Dragon Endurance");
      }
    },
    secondary: null,
    target: "all",
    type: "Dragon",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
  },
  dragonenergy: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  dragonforce: {
    num: 3112,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dragon Force",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "dragonforce",
    secondary: null,
    target: "all",
    type: "Dragon",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  dragonhide: {
    num: 3113,
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
  dragonify: {
    num: 3114,
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
  dragonicbloom: {
    num: 3115,
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
    num: 3116,
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
    num: 3117,
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
    num: 3118,
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
    num: 3119,
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
    num: 3120,
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
  dragonpledge: {
    num: 3121,
    accuracy: 100,
	basePower: 80,
    category: "Special",
    name: "Dragon Pledge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  drainlife: {
    num: 3122,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Drain Life",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, magic: 1  },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  drajectile: {
    num: 3123,
    accuracy: 80,
    basePower: 100,
    category: "Physical",
    name: "Drajectile",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Cool"
  },
  drakonvoice: {
    num: 3124,
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
    num: 3125,
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
  dreameater: {
    inherit: true,
	flags: { protect: 1, mirror: 1, heal: 1, metronome: 1, magic: 1 }
  },
  dryice: {
    num: 3126,
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
    num: 3127,
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
  duoscissorclaw: {
    num: 3598,
    accuracy: 90,
    basePower: 95,
    category: "Physical",
    name: "Duo Scissor Claw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  dustdevil: {
    num: 3128,
    accuracy: 80,
    basePower: 90,
    category: "Special",
    name: "Dust Devil",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1, powder: 1 },
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
  duststorm: {
    num: 3129,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Dust Storm",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "duststorm",
    secondary: null,
    target: "all",
    type: "Ground",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  dustydash: {
    num: 3130,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Dusty Dash",
    pp: 15,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1, powder: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "allAdjacentFoes",
    type: "Ground",
    contestType: "Cool"
  },
  dynamaxcannon: {
    inherit: true,
	flags: { protect: 1, failencore: 1, nosleeptalk: 1, failcopycat: 1, failmimic: 1, failinstruct: 1, noparentalbond: 1, legendary: 1 }
  },
  earthbreaker: {
    num: 3788,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Earthbreaker",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type) {
      if (type === "Ground")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  earthmover: {
    num: 3131,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Earthmover",
    pp: 15,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Ground")
        return 1;
    },
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  echoedvoicesound: {
    num: 3132,
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
    num: 3133,
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
  eeriespell: {
    inherit: true,
	flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1, magic: 1 }
  },
  eevoboost: {
    num: 3134,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Eevoboost",
    pp: 2,
    priority: -2,
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
    zMove: { boost: { atk: 1, def: 1, spa: 1, spd: 1, spe: 1 } },
    contestType: "Beautiful"
  },
  elasticwave: {
    num: 3649,
    accuracy: 100,
    basePower: 15,
    category: "Special",
    name: "Elastic Wave",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	multihit: [2, 5],
    secondary: {
      chance: 10,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Plastic",
    contestType: "Cool"
  },
  eldritchblast: {
    num: 3563,
    accuracy: 100,
    basePower: 25,
    category: "Special",
    name: "Eldritch Blast",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1, magic: 1 },
	multihit: [1, 4],
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Beautiful"
  },
  eldritchinvocation: {
    num: 3135,
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Eldritch Invocation",
    pp: 5,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1, magic: 1 },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Cool"
  },
  electrobash: {
    num: 3136,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Electro Bash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      status: "par"
    },
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  electroburst: {
    num: 3137,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    isNonstandard: "Past",
    name: "Electroburst",
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
  electrodrift: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, legendary: 1 }
  },
  electroswing: {
    num: 3138,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Electro Swing",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    status: "par",
    ignoreImmunity: false,
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { spd: 1 } },
    contestType: "Cool"
  },
  empblast: {
    num: 3524,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "EMP Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
	self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
	onEffectiveness(typeMod, target, type) {
      if (type === "Digital" || type === "Electric")
        return 1;
    },
    target: "allAdjacent",
    type: "Electric",
    contestType: "Beautiful"
  },
  emperorsedge: {
    num: 3139,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Emperor's Edge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  engorge: {
    num: 3140,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Engorge",
    pp: 35,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Tough"
  },
  engulf: {
    num: 3141,
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
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost","hotcoals"];
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
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost","hotcoals"];
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
  ermacpunch: {
    num: 3803,
    accuracy: true,
    basePower: 60,
    category: "Physical",
    name: "ErMac Punch",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Clever"
  },
  eternabeam: {
    inherit: true,
	flags: { recharge: 1, protect: 1, mirror: 1, legendary: 1 }
  },
  eternalhex: {
    num: 3142,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Eternal Hex",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1,
		def: -1,
		spa: -1,
		spd: -1,
		spe: -1
      }
    },
    target: "normal",
    type: "Eldritch",
    contestType: "Tough"
  },
  evaporate: {
    num: 3696,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Evaporate",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      const newTypes = target.types.map(type => {
        if (type === "Water") return "Wind";
        return type;
      });

      if (newTypes.join() === target.types.join()) {
        this.add("-fail", target);
        return null;
      }

      target.setType(newTypes);
      this.add("-start", target, "typechange", newTypes.join("/"));
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  eventhorizon: {
    num: 3582,
    accuracy: 30,
    basePower: 0,
    category: "Special",
    name: "Event Horizon",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    ohko: "Cosmic",
    target: "normal",
    type: "Cosmic",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  evilwing: {
    num: 3600,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Evil Wing",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, speed: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  excalibur: {
    num: 3601,
    accuracy: true,
    basePower: 105,
    category: "Physical",
    name: "Excalibur",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, magic: 1 },
    secondary: null,
	onEffectiveness(typeMod, target, type) {
      if (type === "Ghost" || type === "Steel")
        return 1;
    },
    target: "normal",
    type: "Fairy",
    contestType: "Clever"
  },
  excitebike: {
    num: 3662,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Excite Bike",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Digital",
    contestType: "Cool"
  },
  exsanguinate: {
    num: 3143,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Exsanguinate",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, bite: 1, magic: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Clever"
  },
  exploitsion: {
    num: 3491,
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "Exploitsion",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Questionmark",
    contestType: "Beautiful"
  },
  expunge: {
    num: 3144,
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
  extrasensory: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  extremespeed: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  faengrush: {
    num: 3145,
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
  fairypledge: {
    num: 3146,
    accuracy: 100,
	basePower: 80,
    category: "Special",
    name: "Fairy Pledge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Beautiful"
  },
  fairyrush: {
    num: 3147,
    accuracy: 75,
    basePower: 100,
    category: "Physical",
    name: "Fairy Rush",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  fakeout: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  fallout: {
    num: 3148,
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
  fangbarrage: {
    num: 3149,
    accuracy: 30,
    basePower: 0,
    category: "Physical",
    name: "Fang Barrage",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1, bite: 1 },
    ohko: true,
    secondary: null,
    target: "normal",
    type: "Poison",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  fatalexception: {
    num: 3560,
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "Fatal Exception",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Digital",
    contestType: "Beautiful"
  },
  feint: {
    inherit: true,
	flags: { mirror: 1, noassist: 1, failcopycat: 1, speed: 1 }
  },
  feralclutch: {
    num: 3150,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Feral Clutch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  fever: {
    num: 3151,
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
    num: 3152,
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Fey Hammer",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  fiatopirotecnico: {
    num: 3635,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Fiato Pirotecnico",
    pp: 5,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Electric", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  fiesta: {
    num: 3153,
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
  fierywrath: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  fincutter: {
    num: 3602,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Fin Cutter",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Tough"
  },
  finsmack: {
    num: 3672,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Fin Smack",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Tough"
  },
  firecracker: {
    num: 3154,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Firecracker",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1, speed: 1 },
    self: {
      volatileStatus: "followme"
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  firekunai: {
    num: 3155,
    accuracy: 95,
    basePower: 40,
    category: "Physical",
    name: "Fire Kunai",
    pp: 10,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1, speed: 1 },
    willCrit: true,
    secondary: null,
    target: "normal",
    type: "Fire"
  },
  firewall: {
    num: 3478,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Firewall",
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
    type: "Digital",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
  },
  fireworks: {
    num: 3156,
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
    flags: { protect: 1, mirror: 1, bullet: 1 },
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
    num: 3157,
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
    num: 3158,
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
    num: 3159,
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
  flamingfists: {
    num: 3160,
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Flaming Fists",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 40,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  flareup: {
    num: 3835,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Flare Up",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, allyanim: 1, metronome: 1 },
    volatileStatus: "flareup",
    onTryHit(target) {
      if (!this.queue.willMove(target) && target.activeTurns)
        return false;
    },
    condition: {
      onModifyTypePriority: -2,
      onModifyType(move) {
        if (move.id !== "struggle" && move.type === "Normal") {
          this.debug("Flare Up making move type fire");
          move.type = "Fire";
        }
      }
    },
    secondary: null,
    target: "self",
    type: "Fire",
    zMove: { boost: { spa: 1 } },
    contestType: "Clever"
  },
  flash: {
    inherit: true,
	flags: { protect: 1, reflectable: 1, mirror: 1, hm: 1 },
	onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
        move.boosts = { accuracy: -2 };
    }
  },
  flashinglightning: {        
	num: 3161,
	accuracy: 100,
	basePower: 90,
	category: "Physical",
	name: "Flashing Lightning",
	pp: 15,
	priority: 0,
	flags: { contact: 1, protect: 1, mirror: 1 },
	secondary: null,
	critRatio: 2,
	target: "normal",
	type: "Electric",
	contestType: "Cool"
  },
  flashlight: {
    num: 3162,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Flash Light",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, hm: 1 },
    boosts: {
      accuracy: -1
    },
	onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland"].includes(pokemon.effectiveWeather()))
        move.boosts = { accuracy: -2 };
    },
    secondary: null,
    target: "normal",
    type: "Light",
    zMove: { boost: { evasion: 1 } },
    contestType: "Beautiful"
  },
  flashflood: {
    num: 3163,
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
    num: 3164,
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
    num: 3165,
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
    num: 3166,
    accuracy: 90,
    basePower: 85,
    category: "Special",
    name: "Flash Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Light",
    contestType: "Clever"
  },
  flavortest: {
    num: 3167,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Flavor Test",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
	onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Ice", type);
    },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Fairy"
  },
  fleurcannon: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1, legendary: 1 }
  },
  flop: {
    num: 3168,
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
  flowerpower: {
    num: 3169,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Flower Power",
    pp: 20,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fairy", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Grass",
    zMove: { basePower: 170 },
    contestType: "Tough"
  },
  flubberfang: {
    num: 3170,
    accuracy: 95,
    basePower: 65,
    category: "Physical",
    name: "Flubber Fang",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1, magic: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
  },
  fly: {
    inherit: true,
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
  },
  foamarrows: {
    num: 3567,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Foam Arrows",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    multihit: [1, 3],
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  foambullets: {
    num: 3568,
    accuracy: 100,
    basePower: 10,
    category: "Physical",
    name: "Foam Bullets",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    multihit: [5, 10],
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  foamdarts: {
    num: 3503,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Foam Darts",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  focalforce: {
    num: 3171,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Focal Force",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1 },
    recoil: [33, 100],
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  focusedram: {
    num: 3172,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    isNonstandard: "Past",
    name: "Focused Ram",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Tough"
  },
  foggystrike: {
    num: 3173,
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
  foghorn: {
    num: 3174,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Foghorn",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "fog",
    secondary: null,
    target: "all",
    type: "Normal",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  forcedcoagulation: {
    num: 3749,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Forced Coagulation",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	recoil: [33, 100],
    onEffectiveness(typeMod, target, type) {
      if (type === "Slime" || type === "Water")
        return 1;
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  freezeshock: {
    inherit: true,
	flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, legendary: 1 }
  },
  freezingglare: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1, magic: 1 }
  },
  frostbite: {
    num: 3175,
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
  frostclaw: {
    num: 3176,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Frost Claw",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  frostslash: {
    num: 3177,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    isNonstandard: "Past",
    name: "Frost Slash",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1, slicing: 1 },
    critRatio: 2,
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  fullbattery: {
    num: 3639,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Full Battery",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spe: 1,
	  accuracy: -1
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  funnel: {
    num: 3731,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Funnel",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Blood",
    zMove: { basePower: 120 },
    contestType: "Clever"
  },
  fusionbolt: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  fusionflare: {
    inherit: true,
	flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1, legendary: 1 }
  },
  futuresight: {
    inherit: true,
	flags: { allyanim: 1, metronome: 1, futuremove: 1, magic: 1 }
  },
  gaiasfury: {
    num: 3178,
    accuracy: 100,
    basePower: 110,
    category: "Physical",
    name: "Gaia's Fury",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1, magic: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "allAdjacent",
    type: "Ground",
    contestType: "Tough"
  },
  galaxyslash: {
    num: 3538,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Galaxy Slash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  galerush: {
    num: 3179,
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
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  galeslash: {
    num: 3823,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Gale Slash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Wind",
    contestType: "Cool"
  },
  gammahammer: {
    num: 3809,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Gamma Hammer",
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
    type: "Nuclear",
    contestType: "Tough"
  },
  gammaray: {
    num: 3180,
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
  gammaslash: {
    num: 3808,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Gamma Slash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
  },
  garnetbeam: {
    num: 3654,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Garnet Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, beam: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Clever"
  },
  garurukick: {
    num: 3603,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Garuru-Kick",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Cute"
  },
  gatlinglaser: {
    num: 3181,
    accuracy: 100,
    basePower: 25,
    category: "Special",
	overrideDefensiveStat: "def",
    name: "Gatling Laser",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, beam: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Light",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  gelatinousdoom: {
    num: 3508,
    accuracy: 30,
    basePower: 0,
    category: "Physical",
    name: "Gelatinous Doom",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    ohko: true,
    secondary: null,
    target: "normal",
    type: "Slime",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  gemstoneglimmer: {
    num: 3182,
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
    num: 3183,
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
  gemstoneimpact: {
    num: 3556,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Gemstone Impact",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Tough"
  },
  geodecannon: {
    num: 3184,
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
    num: 3185,
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
    num: 3186,
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
  geomancy: {
    inherit: true,
	flags: { charge: 1, nonsky: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, legendary: 1 },
    onModifyMove(move, pokemon) {
      const weather = pokemon.effectiveWeather();
      if (["darkness", "eclipse"].includes(weather)) {
        move.boosts = { spa: 1, spd: 1, spe: 1 };
      }
      if (weather === "fairydust") {
        move.boosts = { spa: 3, spd: 3, spe: 3 };
      }
    },
  },
  geosphere: {
    num: 3187,
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
  geosplinter: {
    num: 3188,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Geosplinter",
    pp: 5,
    priority: 3,
    flags: { snatch: 1 },
    volatileStatus: "powertrick",
    secondary: null,
    target: "self",
    type: "Rock",
    zMove: { boost: { atk: 1 } },
    contestType: "Clever"
  },
  ghastlywail: {
    num: 3189,
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
  giantstep: {
    num: 3534,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Giant Step",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  gigabyte: {
    num: 3659,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Giga Byte",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  gigadestroyer: {
    num: 3604,
    accuracy: 90,
    basePower: 55,
    category: "Special",
    name: "Giga Destroyer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: 2,
    secondary: null,
    target: "normal",
    type: "Fire",
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  giganumecluster: {
    num: 3553,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Giganume Cluster",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  giggle: {
    num: 3466,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Giggle",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    boosts: {
      atk: -1
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Sound",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  giraternalgrip: {
    num: 3190,
    accuracy: 95,
    basePower: 75,
    category: "Physical",
    name: "Giraternal Grip",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Eldritch"
  },
  glaciallance: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  glaciate: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  glaciercrash: {
    num: 3191,
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
    num: 3192,
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
  glisteningstrike: {
    num: 3579,
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Glistening Strike",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  glitch: {
    num: 3488,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Glitch",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        atk: -1,
        def: -1,
        spa: -1,
        spd: -1,
        spe: -1
      }
    },
    target: "normal",
    type: "Questionmark",
    contestType: "Cute"
  },
  glorp: {
    num: 3193,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Glorp",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
  },
  glorywing: {
    num: 3673,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Glory Wing",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
    target: "normal",
    type: "Flying"
  },
  glowingorb: {
    num: 3194,
    accuracy: 100,
    basePower: 45,
    category: "Special",
    name: "Glowing Orb",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  glowwhack: {
    num: 3576,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Glow Whack",
    pp: 30,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          evasion: 1
        }
      }
    },
    target: "normal",
    type: "Light"
  },
  goldenfist: {
    num: 3195,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Golden Fist",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "normal",
    type: "Fighting",
    contestType: "Clever"
  },
  gooeyencasement: {
    num: 3773,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Gooey Encasement",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        this.boost({ def: 1, spd: 1 }, pokemon, pokemon, move);
    },
    secondary: null,
    target: "normal",
    type: "Slime",
    contestType: "Cool"
  },
  gooeystrike: {
    num: 3196,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Gooey Strike",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
  },
  goopelt: {
    num: 3197,
    accuracy: 100,
    basePower: 25,
    category: "Special",
    name: "Goo Pelt",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Slime",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  gravitybeam: {
    num: 3545,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Gravity Beam",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1 },
    thawsTarget: true,
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  gravitycosmic: {
    num: 3198,
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
    num: 3199,
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
    num: 3200,
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
  grimebuster: {
    num: 3674,
    accuracy: 90,
    basePower: 130,
    category: "Physical",
    name: "Grimebuster",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        atk: -2
      }
    },
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
  },
  grimstinger: {
    num: 3201,
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
    num: 3202,
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
	onHit(target, source, move) {
      if (move.isZ) {
        source.side.addSideCondition("safeguard");
      }
    },
    secondary: null,
    target: "self",
    type: "Normal",
    contestType: "Cute"
  },
  groundpound: {
    num: 3477,
    accuracy: 100,
    basePower: 0,
    basePowerCallback(pokemon, target) {
      const targetWeight = target.getWeight();
      const pokemonWeight = pokemon.getWeight();
      let bp;
      if (pokemonWeight >= targetWeight * 5) {
        bp = 120;
      } else if (pokemonWeight >= targetWeight * 4) {
        bp = 100;
      } else if (pokemonWeight >= targetWeight * 3) {
        bp = 80;
      } else if (pokemonWeight >= targetWeight * 2) {
        bp = 60;
      } else {
        bp = 40;
      }
      this.debug("BP: " + bp);
      return bp;
    },
    category: "Physical",
    name: "Ground Pound",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onTryHit(target, source, move) {
      if (target.volatiles["dynamax"]) {
        this.add("-fail", source, "move: Grass Knot", "[from] Dynamax");
        this.attrLastMove("[still]");
        return null;
      }
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 },
    contestType: "Cute"
  },
  growth: {
    num: 74,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Growth",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    onModifyMove(move, pokemon) {
      if (["sunnyday", "desolateland", "fallout"].includes(pokemon.effectiveWeather()))
        move.boosts = { atk: 2, spa: 2 };
    },
    boosts: {
      atk: 1,
      spa: 1
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { boost: { spa: 1 } },
    contestType: "Beautiful"
  },
  guardianleaf: {
    num: 3203,
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
    num: 3204,
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
  h4k41: {
    num: 3205,
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "H4K41",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Cool"
  },
  hairpinturn: {
    num: 3675,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hairpin Turn",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1 },
    boosts: {
      spe: 1,
      evasion: 1
    },
    secondary: null,
    target: "self",
    type: "Flying",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  halflife: {
    num: 3206,
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
  hammerclaw: {
    num: 3549,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Hammerclaw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  hardknock: {
    num: 3676,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Hard Knock",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    overrideOffensiveStat: "def",
    secondary: null,
    target: "normal",
    type: "Rock"
  },
  haunt: {
    num: 3207,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Haunt",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "cursedwinds",
    secondary: null,
    target: "all",
    type: "Ghost",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  hawthorns: {
    num: 3208,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hawthorns",
    pp: 15,
    priority: 0,
    flags: { snatch: 1, mirror: 1 },
    sideCondition: "hawthorns",
    condition: {
      onSideStart(side) {
        this.add('-sidestart', side, 'move: Hawthorns');
      },
      onResidualOrder: 5,
      onResidual(side) {
        this.heal(pokemon.baseMaxhp / 16);
      }
    },
    secondary: null,
    target: "allySide",
    type: "Grass",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  healbellsound: {
    num: 3209,
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
  healorder: {
    num: 456,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Heal Order",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, heal: 1, metronome: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (this.field.isWeather(["Pheromones"])) {
        factor = 0.667;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Bug",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  heartswap: {
    inherit: true,
	flags: { protect: 1, mirror: 1, bypasssub: 1, allyanim: 1, legendary: 1 }
  },
  heavensgale: {
    num: 3726,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Heaven’s Gale",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "windiumz",
    secondary: null,
    target: "normal",
    type: "Wind",
    contestType: "Cool"
  },
  heavensknuckle: {
    num: 3605,
    accuracy: 85,
    basePower: 80,
    category: "Physical",
    name: "Heaven's Knuckle",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, punch: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  heavypunch: {
    num: 3210,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Heavy Punch",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Normal",
    contestType: "Cute"
  },
  hedriumray: {
    num: 3548,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Hedrium Ray",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1 },
    thawsTarget: true,
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Tough"
  },
  hedriumsludge: {
    num: 3547,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Hedrium Sludge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Poison",
    contestType: "Tough"
  },
  hemophagefrenzy: {
    num: 3739,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Hemophage Frenzy",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, failinstruct: 1 },
    drain: [1, 6],
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
    type: "Blood",
    contestType: "Cool"
  },
  highjumpkick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 }
  },
  hiss: {
    num: 3211,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Hiss",
    pp: 30,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    boosts: {
      spd: -2
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  hitandrun: {
    num: 3212,
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
    num: 3213,
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
  hololaser: {
    num: 3564,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Holo Laser",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Beautiful"
  },
  honeclaws: {
    inherit: true,
	onModifyMove(move, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather()))
        move.boosts = { atk: 2, accuracy: 2 };
    }
  },
  horizonmaw: {
    num: 3769,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Horizon Maw",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    onBasePower(basePower) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(1.5);
      }
    },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Eldritch"
  },
  hornbuster: {
    num: 3606,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Horn Buster",
    pp: 10,
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
    type: "Bug",
    contestType: "Cool"
  },
  hotchilipepper: {
    num: 3214,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Hot Chili Pepper",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Grass",
    contestType: "Tough"
  },
  hotcoals: {
    num: 3828,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Hot Coals",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, mustpressure: 1 },
    sideCondition: "hotcoals",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Hot Coals");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("hotcoals")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Fire",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  hotspot: {
    num: 3775,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Hotspot",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onTryHit(target, source, move) {
      if (!source.status)
        return false;
      move.status = source.status;
    },
    self: {
      onHit(pokemon) {
        pokemon.cureStatus();
      }
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    zMove: { boost: { spa: 2 } },
    contestType: "Clever"
  },
  howlsound: {
    num: 3215,
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
  hurricane: {
    num: 3216,
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Hurricane",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, wind: 1 },
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
		case "acidrain":
		case "thunderstorm":
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
    type: "Flying",
    contestType: "Tough"
  },
  hurricanewind: {
    num: 3217,
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
		case "acidrain":
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
  hydrosteam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1, legendary: 1 }
  },
  hyperbeam: {
    inherit: true,
	flags: { recharge: 1, protect: 1, mirror: 1, beam: 1 }
  },
  hyperspacefury: {
    inherit: true,
	flags: { mirror: 1, bypasssub: 1 }
  },
  hyperspacehole: {
    inherit: true,
	flags: { mirror: 1, bypasssub: 1, legendary: 1 }
  },
  hyperstinkshot: {
    num: 3607,
    accuracy: 90,
    basePower: 95,
    category: "Special",
    name: "Hyper-Stink-Shot",
    pp: 5,
    priority: 0,
    flags: { bypasssub: 1, bullet: 1 },
    breaksProtect: true,
    secondary: null,
    target: "normal",
    type: "Poison",
    contestType: "Clever"
  },
  hypervoicesound: {
    num: 3218,
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
    num: 3219,
    accuracy: 90,
    basePower: 55,
    category: "Special",
    name: "Hypnopulse",
    pp: 25,
    priority: 0,
    flags: { protect: 1, pulse: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      status: "slp"
    },
    target: "any",
    type: "Psychic",
    contestType: "Beautiful"
  },
  hypnosis: {
    inherit: true,
	flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  hystericalslap: {
    num: 3220,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Hysterical Slap",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
	multihit: [1, 3],
     secondary: {
      chance: 5,
      volatileStatus: "confusion"
        },
    target: "normal",
    type: "Fighting",
  },
  icebeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  iceblast: {
    num: 3608,
    accuracy: 100,
    basePower: 70,
    category: "Special",
    name: "Ice Blast",
    pp: 10,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Water")
        return 1;
    },
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Beautiful"
  },
  iceburn: {
    inherit: true,
	flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, legendary: 1 }
  },
  icecoldtouch: {
    num: 3699,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Ice-Cold Touch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, reflectable: 1, mirror: 1 },
    status: "fbt",
    secondary: null,
    target: "normal",
    type: "ice",
    zMove: { boost: { atk: 1 } },
    contestType: "Beautiful"
  },
  iceentomb: {
    num: 3677,
    accuracy: 40,
    basePower: 0,
    category: "Status",
    name: "Ice Entomb",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "frz",
    secondary: null,
    target: "normal",
    type: "Ice",
    zMove: { boost: { atk: 1 } },
    contestType: "Beautiful"
  },
  iceshard: {
    inherit: true,
	flags: { protect: 1, mirror: 1, speed: 1 }
  },
  iceslash: {
    num: 3609,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Ice Slash",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  icewall: {
    num: 3221,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Ice Wall",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      sideCondition: "reflect"
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Clever"
  },
  iceweave: {
    num: 3222,
    accuracy: 95,
    basePower: 0,
    category: "Status",
    name: "Ice Weave",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    boosts: {
      spe: -2
    },
	secondary: null,
    target: "allAdjacentFoes",
    type: "Ice",
    zMove: { boost: { spe: 1 } },
    contestType: "Cute"
  },
  icewolflcaw: {
    num: 3610,
    accuracy: 100,
    basePower: 35,
    category: "Special",
    name: "Ice Wolf Claw",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, slicing: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Ice",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  imbibe: {
    num: 3730,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Imbibe",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, metronome: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
  },
  increasedram: {
    num: 3644,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Increased Ram",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spa: 3
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  infernalblade: {
    num: 3223,
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
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, magic: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  infinityarrow: {
    num: 3611,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Infinity Arrow",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      status: "par"
    },
    target: "normal",
    type: "Electric",
    contestType: "Clever"
  },
  infobeam: {
    num: 3475,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Info Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Digital",
    contestType: "Clever"
  },
  instantcrush: {
    num: 3224,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Instant Crush",
    pp: 10,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  integeroverflow: {
    num: 3490,
    accuracy: 100,
    basePower: 120,
    category: "Special",
	overrideOffensivePokemon: "target",
    name: "Integer Overflow",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Beautiful"
  },
  invasivevector: {
    num: 3746,
    accuracy: 80,
    basePower: 100,
    category: "Special",
    name: "Invasive Vector",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
	recoil: [1, 6],
    secondary: {
      chance: 35,
      volatileStatus: "perishsong"
    },
    target: "normal",
    type: "Blood",
    contestType: "Clever"
  },
  irradiation: {
    num: 3813,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Irradiation",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Nuclear" || !target.setType("Nuclear")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Nuclear");
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  ironsphere: {
    num: 3225,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Iron Sphere",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  ivycudgel: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  jellybounce: {
    num: 3226,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Jelly Bounce",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Slime",
    contestType: "Beautiful"
  },
  jethammer: {
    num: 3825,
    accuracy: 90,
    basePower: 100,
    category: "Physical",
    name: "Jet Hammer",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        spe: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Wind",
    contestType: "Tough"
  },
  jetpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, speed: 1 }
  },
  jetshoot: {
    num: 3678,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Jet Shoot",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      self: {
        boosts: {
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Flying"
  },
  jetstrike: {
    num: 3227,
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
    num: 3228,
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
    num: 3229,
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
  jewelshards: {
    num: 3559,
    accuracy: 100,
    basePower: 20,
    category: "Special",
    name: "Jewel Shards",
    pp: 35,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: 3,
    secondary: null,
    target: "normal",
    type: "Crystal"
  },
  judgment: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  jumpkick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 }
  },
  junglehealing: {
    inherit: true,
	flags: { heal: 1, bypasssub: 1, allyanim: 1, legendary: 1 }
  },
  kablow: {
    num: 3779,
    accuracy: 100,
    basePower: 155,
    category: "Physical",
    name: "Kablow!",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
	onHit(target, source, move) {
      if (!move.hasSheerForce) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("spikes");
		  side.addSideCondition("toxicspikes");
        }
      }
    },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Steel",
    contestType: "Beautiful"
  },
  killingfrenzy: {
    num: 3754,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Killing Frenzy",
    pp: 30,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    multihit: [2, 5],
    secondary: null,
	onAfterMove(source, target, move) {
      if (source && !source.fainted) {
        this.boost({ def: -1 }, source, source, move);
      }
    },
    target: "normal",
    type: "Blood",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  kilobyte: {
    num: 3660,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Kilo Byte",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  kindle: {
    num: 3784,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Kindle",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, distance: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "any",
    type: "Fire",
    contestType: "Tough"
  },
  kindleseed: {
    num: 3230,
    accuracy: 90,
    basePower: 60,
    category: "Special",
    name: "Kindleseed",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    volatileStatus: "leechseed",
    onTryImmunity(target) {
      return !target.hasType("Fire");
    },
    secondary: null,
    target: "normal",
    type: "Fire",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  knightsvow: {
    num: 3231,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Unobtainable",
    name: "Knight's Vow",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, distance: 1, bypasssub: 1, magic: 1 },
	self: {
      volatileStatus: "followme",
	  sideCondition: "luckychant"
    },
    onHit(target, source) {
      this.add("-activate", source, "move: Knight's Bow");
      let success = false;
      const allies = [...target.side.pokemon, ...target.side.allySide?.pokemon || []];
      for (const ally of allies) {
        if (ally !== source)
          continue;
        if (ally.cureStatus())
          success = true;
      }
      return success;
    },
    target: "allyTeam",
    type: "Fairy",
    zMove: { effect: "heal" },
    contestType: "Beautiful"
  },
  knucklefins: {
    num: 3232,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Knucklefins",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 100,
      volatileStatus: "torment"
    },
    target: "normal",
    type: "Water",
    contestType: "Tough"
  },
  lagspike: {
    num: 3805,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Lag Spike",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Beautiful"
  },
  landsliderush: {
    num: 3233,
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
  landswrath: {
    inherit: true,
	flags: { protect: 1, mirror: 1, nonsky: 1, metronome: 1, legendary: 1 }
  },
  lasso: {
    num: 3467,
    accuracy: 95,
    basePower: 0,
    category: "Status",
    name: "Lasso",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    boosts: {
      spe: -2
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Normal",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  latentpower: {
    num: 3234,
    accuracy: 100,
    basePower: 130,
    category: "Special",
    name: "Latent Power",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
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
    num: 3235,
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
  leekcutter: {
    num: 3236,
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Leek Cutter",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, slicing: 1 },
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Grass",
    contestType: "Tough"
  },
  liftoff: {
    num: 3531,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Lift Off",
    pp: 15,
    priority: 0,
    flags: { protect: 1, contact: 1, charge: 1, mirror: 1, gravity: 1, distance: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1 },
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
    target: "any",
    type: "Cosmic",
    contestType: "Cool"
  },
  lightburst: {
    num: 3836,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Light Burst",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: {
      chance: 30,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  lightburstlight: {
    num: 3837,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Light Burst Light",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: {
      chance: 30,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  lightcharge: {
    num: 3237,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Light Charge",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  lightningstrike: {
    num: 3238,
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
  lightofruin: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  lightscreen: {
    inherit: true,
	flags: { snatch: 1, metronome: 1, magic: 1 }
  },
  lightscreenlight: {
    num: 3239,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Light Screen Light",
    pp: 30,
    priority: 0,
    flags: { snatch: 1, magic: 1 },
    sideCondition: "lightscreen",
    secondary: null,
    target: "allySide",
    type: "Light",
    zMove: { boost: { spd: 1 } },
    contestType: "Beautiful"
  },
  lighttouch: {
    num: 3468,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Light Touch",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onDamagePriority: -20,
    onDamage(damage, target, source, effect) {
      if (damage >= target.hp)
        return target.hp - 1;
    },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  lionsword: {
    num: 3612,
    accuracy: true,
    basePower: 75,
    category: "Physical",
    name: "Lion Sword",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    secondary: null,
    target: "normal",
    type: "Steel"
  },
  livewire: {
    num: 3777,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Livewire",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "livewire",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Livewire");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 5) return false;
        this.effectState.layers++;
        this.add("-sidestart", side, "move: Livewire", "[up to " + this.effectState.layers + " layers]");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots")) return;
        if (
          pokemon.hasType("Electric") ||
          pokemon.hasType("Ground") ||
          pokemon.hasType("Plastic")
        ) {
          this.add("-sideend", pokemon.side, "move: Livewire", "[of] " + pokemon);
          pokemon.side.removeSideCondition("livewire");
          return;
        }
        const chance = this.effectState.layers * 20;
        if (this.randomChance(chance, 100)) {
          pokemon.trySetStatus("par", pokemon.side.foe.active[0]);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Electric",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  lovecraftianmaw: {
    num: 3570,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Lovecraftian Maw",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Tough"
  },
  lowkick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  lunarblessing: {
    inherit: true,
	flags: { snatch: 1, heal: 1, metronome: 1, legendary: 1 }
  },
  lunarcannon: {
    num: 3240,
    accuracy: 100,
    basePower: 105,
    category: "Special",
    name: "Lunar Cannon",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, beam: 1, magic: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness", "eclipse"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["sunnyday", "desolateland"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  lunardance: {
    inherit: true,
	flags: { snatch: 1, dance: 1, heal: 1, metronome: 1, legendary: 1 }
  },
  lusterbloom: {
    num: 3241,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Luster Bloom",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 10,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Electric",
    contestType: "Beautiful"
  },
  lusterpurge: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  machpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, speed: 1 }
  },
  magicalleaf: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  magicpowder: {
    inherit: true,
	flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, metronome: 1, powder: 1, magic: 1 }
  },
  magicwall: {
    num: 3242,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Magic Wall",
    pp: 15,
    priority: 0,
    flags: { nonsky: 1, magic: 1 },
    pseudoWeather: "magicwall",
    condition: {
      duration: 5,
      onFieldStart(field, source) {
        this.add("-fieldstart", "move: Magic Wall", "[of] " + source);
      },
      onBasePowerPriority: 1,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Dragon" || move.type === "Fighting" || move.type === "Dark" || move.type === "Bug") {
          this.debug("magic wall weaken");
          return this.chainModify([1352, 4096]);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 3,
      onFieldEnd() {
        this.add("-fieldend", "move: Magic Wall");
      }
    },
    secondary: null,
    target: "all",
    type: "Fairy",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
  },
  magmablade: {
    num: 3243,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Magma Blade",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Fire",
    contestType: "Cool"
  },
  magmaring: {
    num: 3244,
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
  magmastorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  magnetforce: {
    num: 3245,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Magnet Force",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          this.boost({atk: -1}, target, source, null, true);
        } else if(result === 1) {
          this.boost({spa: -1}, target, source, null, true);
        }
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  magnetize: {
    num: 3246,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Magnetize",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "magnetosphere",
    secondary: null,
    target: "all",
    type: "Steel",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  magnetpulse: {
    num: 3247,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Magnet Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
    secondary: {
      chance: 30,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  magnumpunch: {
    num: 3248,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Magnum Punch",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          target.addVolatile("flinch");
        } else if(result === 1) {
          this.boost({def: -1}, target, source, null, true);
        }
      }
    },
    target: "normal",
    type: "Fighting",
    contestType: "Beautiful"
  },
  malignantchain: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  massproduction: {
    num: 3496,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Mass Production",
    pp: 15,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    boosts: {
      atk: 2,
      spa: 2
    },
	status: "tox",
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  maxdreadvoid: {
    num: 3704,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Dreadvoid",
    pp: 10,
    priority: 0,
    flags: { magic: 1 },
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spa: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Eldritch",
    contestType: "Cool"
  },
  maxgalaxy: {
    num: 3701,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Galaxy",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      pseudoWeather: "gravity"
    },
    target: "adjacentFoe",
    type: "Cosmic",
    contestType: "Cool"
  },
  maxleechrush: {
    num: 3713,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Leechrush",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(target, source, move) {
        for (const pokemon of source.alliesAndSelf()) {
          this.heal(pokemon.maxhp / 6, pokemon, source, move);
        }
      }
    },
    target: "adjacentFoe",
    type: "Blood",
    contestType: "Cool"
  },
  maxmeltdown: {
    num: 3706,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Meltdown",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        this.field.setWeather("fallout");
      }
    },
    target: "adjacentFoe",
    type: "Nuclear",
    contestType: "Cool"
  },
  maxoozeflood: {
    num: 3710,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Ooze Flood",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spe: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Slime",
    contestType: "Cool"
  },
  maxoverclock: {
    num: 3703,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Overclock",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.alliesAndSelf()) {
          this.boost({ spe: 1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Digital",
    contestType: "Cool"
  },
  maxquestionmark: {
    num: 3708,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Questionmark",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        const stats = ["atk", "def", "spa", "spd", "spe"];
		const statToLower = this.sample(stats);
		for (const pokemon of source.foes()) {
          this.boost({ [statToLower]: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Questionmark",
    contestType: "Cool"
  },
  maxradiance: {
    num: 3705,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Radiance",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spa: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Light",
    contestType: "Cool"
  },
  maxrecast: {
    num: 3707,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Recast",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(target, source, move) {
        for (const pokemon of source.alliesAndSelf()) {
          this.heal(pokemon.maxhp / 6, pokemon, source, move);
        }
      }
    },
    target: "adjacentFoe",
    type: "Plastic",
    contestType: "Cool"
  },
  maxreverb: {
    num: 3711,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Reverb",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ spd: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Sound",
    contestType: "Cool"
  },
  maxshatterstorm: {
    num: 3702,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Shatterstorm",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        for (const pokemon of source.foes()) {
          this.boost({ def: -1 }, pokemon);
        }
      }
    },
    target: "adjacentFoe",
    type: "Crystal",
    contestType: "Cool"
  },
  maxtempest: {
    num: 3712,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Tempest",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        source.side.addSideCondition("tailwind");
      }
    },
    target: "adjacentFoe",
    type: "Wind",
    contestType: "Cool"
  },
  maxumbrage: {
    num: 3709,
    accuracy: true,
    basePower: 10,
    category: "Physical",
    isNonstandard: "Past",
    name: "Max Umbrage",
    pp: 10,
    priority: 0,
    flags: {},
    isMax: true,
    self: {
      onHit(source) {
        if (!source.volatiles["dynamax"])
          return;
        this.field.setWeather("shadowyaura");
      }
    },
    target: "adjacentFoe",
    type: "Shadow",
    contestType: "Cool"
  },
  megabyte: {
    num: 3658,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Mega Byte",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  megakick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  megalofang: {
    num: 3249,
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
  magicaltorque: {
    inherit: true,
	flags: {
      protect: 1,
      failencore: 1,
      failmefirst: 1,
      nosleeptalk: 1,
      noassist: 1,
      failcopycat: 1,
      failmimic: 1,
      failinstruct: 1,
	  magic: 1
    }
  },
  melt: {
    num: 3695,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Melt",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
	onHit(target) {
      const newTypes = target.types.map(type => {
        // Replace Ice with Water
        if (type === "Ice") return "Water";
        // Replace Steel with Normal
        if (type === "Steel") return "Normal";
        // Replace Plastic with Poison
        if (type === "Plastic") return "Poison";
        // Keep other types as is
        return type;
      });

      // If no change occurred (no Ice, Steel, or Plastic type), move fails
      if (newTypes.join() === target.types.join()) {
        this.add("-fail", target);
        return null;
      }

      target.setType(newTypes);
      this.add("-start", target, "typechange", newTypes.join("/"));
	},
    secondary: null,
    target: "normal",
    type: "Fire",
    zMove: { boost: { spa: 1 } },
    contestType: "Tough"
  },
  meltdown: {
    num: 3250,
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "MEltdown",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Poison",
    contestType: "Beautiful"
  },
  meltdownnuclear: {
    num: 3251,
    accuracy: 100,
    basePower: 250,
    category: "Physical",
    name: "Meltdown Nuclear",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    selfdestruct: "always",
    secondary: null,
    target: "allAdjacent",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  mentalanguish: {
    num: 3252,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Mental Anguish",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Eldritch",
    contestType: "Clever"
  },
  mesmersmoke: {
    num: 3253,
    accuracy: 70,
    basePower: 0,
    category: "Status",
    name: "Mesmer Smoke",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, magic: 1 },
    status: "slp",
    secondary: null,
    target: "allAdjacent",
    type: "Poison",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  metalcruncher: {
    num: 3254,
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
    num: 3255,
    accuracy: 90,
    basePower: 50,
    category: "Physical",
    name: "Metal Whip",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  meteorbeam: {
    inherit: true,
	flags: { charge: 1, protect: 1, mirror: 1, beam: 1 }
  },
  meteorblitz: {
    num: 3525,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Meteor Blitz",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1 },
    recoil: [33, 100],
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  meteormashcosmic: {
    num: 3256,
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
  meteorstormpunisher: {
    num: 3535,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Meteor Storm Punisher",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  meteorstrike: {
    num: 3532,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Meteor Strike",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, punch: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Cosmic",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  midnightterrain: {
    num: 3838,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Midnight Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1 },
    terrain: "midnightterrain",
    condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Dark" && attacker.isGrounded()) {
          this.debug("midnight terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
	  onModifyAccuracy(accuracy, target, source, move) {
        if (!source || !source.isGrounded() || !source.isActive) return;
        if (["Dark", "Ghost", "Eldritch", "Blood"].some(t => source.hasType(t))) return;
        this.debug("Midnight Terrain - Accuracy reduced");
        return this.chainModify(0.9);
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Midnight Terrain", "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-fieldstart", "move: Midnight Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Midnight Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Dark",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
  },
  mightycleave: {
    inherit: true,
	flags: { contact: 1, mirror: 1, metronome: 1, slicing: 1, legendary: 1 }
  },
  mightykick: {
    num: 3461,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Mighty Kick",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1, kick: 1 },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Fire"
  },
  mindblast: {
    num: 3257,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Mind Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  mindblown: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  mindcharge: {
    num: 3258,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Mind Charge",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, dance: 1, metronome: 1, cantusetwice: 1 },
    boosts: {
      spa: 2
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  minimize: {
    num: 107,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Minimize",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, metronome: 1 },
    volatileStatus: "minimize",
    condition: {
      noCopy: true,
      onRestart: () => null,
      onSourceModifyDamage(damage, source, target, move) {
        const boostedMoves = [
          "fairyrush",
		  "stomp",
          "steamroller",
          "bodyslam",
          "flyingpress",
          "dragonrush",
          "heatcrash",
          "heavyslam",
          "maliciousmoonsault"
        ];
        if (boostedMoves.includes(move.id)) {
          return this.chainModify(2);
        }
      },
      onAccuracy(accuracy, target, source, move) {
        const boostedMoves = [
          "fairyrush",
		  "stomp",
          "steamroller",
          "bodyslam",
          "flyingpress",
          "dragonrush",
          "heatcrash",
          "heavyslam",
          "maliciousmoonsault"
        ];
        if (boostedMoves.includes(move.id)) {
          return true;
        }
        return accuracy;
      }
    },
    boosts: {
      evasion: 2
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  minmax: {
    num: 3517,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "MinMax",
    pp: 5,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      atk: 2,
      def: -2,
      spa: 2,
	  spd: -2
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  miraclewill: {
    num: 3259,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Miracle Will",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, allyanim: 1, magic: 1 },
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
  miresurge: {
    num: 3260,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Mire Surge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  miresurgeslime: {
    num: 3261,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Mire Surge Slime",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 50,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Cool"
  },
  mirrorcoat: {
    inherit: true,
	flags: { protect: 1, failmefirst: 1, noassist: 1, magic: 1 }
  },
  mistball: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1, legendary: 1 }
  },
  moltenplasticblast: {
    num: 3656,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Molten Plastic Blast",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1 },
	recoil: [1, 2],
    thawsTarget: true,
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  moonblast: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  moongeistbeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1, legendary: 1 }
  },
  moonimpact: {
    num: 3262,
    accuracy: 80,
    basePower: 150,
    category: "Physical",
    name: "Moon Impact",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, magic: 1 },
    recoil: [1, 2],
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  moonlight: {
    num: 236,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Moonlight",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, magic: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
		case "darkness":
        case "desolateland":
		case "pollenstorm":
		case "fairydust":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
        case "snow":
		case "acidrain":
		case "thunderstorm":
		case "fog":
		case "duststorm":
		case "cursedwinds":
          factor = 0.25;
          break;
		case "fallout":
		case "shadowyaura":
		case "smog":
          factor = 0.125;
          break;
		case "eclipse":
          factor = 0;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Fairy",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  moonrazer: {
    num: 3263,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Moonrazer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      status: "slp"
    },
    target: "normal",
    type: "Fairy"
  },
  morningsun: {
    num: 234,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Morning Sun",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
		case "pollenstorm":
		case "fairydust":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
        case "snow":
		case "acidrain":
		case "thunderstorm":
		case "fog":
		case "duststorm":
		case "cursedwinds":
          factor = 0.25;
          break;
		case "fallout":
		case "shadowyaura":
		case "smog":
          factor = 0.125;
          break;
		case "darkness":
          factor = 0;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Normal",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
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
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost", "hotcoals"];
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
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost", "hotcoals"];
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
  movemountains: {
    num: 3264,
    accuracy: 90,
    basePower: 105,
    category: "Physical",
    name: "Move Mountains",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, legendary: 1 },
    self: {
      onHit(source) {
        for (const side of source.side.foeSidesWithConditions()) {
          side.addSideCondition("stealthrock");
        }
      }
    },
    secondary: null,
    // allows sheer force to trigger
    target: "normal",
    type: "Rock"
  },
  mowdown: {
    num: 3265,
    accuracy: 90,
    basePower: 80,
    category: "Physical",
    name: "Mow Down",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
	onEffectiveness(typeMod, target, type) {
      if (type === "Grass")
        return 1;
    },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Dark",
    contestType: "Tough"
  },
  mucustsunami: {
    num: 3724,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Mucus Tsunami",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "slimiumz",
    secondary: null,
    target: "normal",
    type: "Slime",
    contestType: "Cool"
  },
  mudslide: {
    num: 3266,
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
  mugencannon: {
    num: 3613,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Mugen Cannon",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
	secondary: {
      chance: 30,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Steel",
    contestType: "Beautiful"
  },
  multipower: {
    num: 3830,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Multi-Power",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onModifyType(move, pokemon) {
      if (pokemon.ignoringItem())
        return;
      const item = pokemon.getItem();
      if (item.id && item.onPlate && !item.zMove) {
        move.type = item.onPlate;
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
  },
  mysticalfire: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  mysticalpower: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1, magic: 1 }
  },
  mysticchant: {
    num: 3267,
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "Mystic Chant",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Beautiful"
  },
  nailcrusher: {
    num: 3614,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Nail Crusher",
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
    type: "Steel",
    contestType: "Cool"
  },
  nailflick: {
    num: 3268,
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
    num: 3269,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Nanorepair",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, legendary: 1 },
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
  napalmshells: {
    num: 3551,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Napalm Shells",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    multihit: [2, 5],
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  naturepower: {
    num: 267,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Nature Power",
    pp: 20,
    priority: 0,
    flags: { failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1 },
    onTryHit(target, pokemon) {
      let move = "triattack";
      if (this.field.isTerrain("electricterrain")) {
        move = "thunderbolt";
      } else if (this.field.isTerrain("grassyterrain")) {
        move = "energyball";
      } else if (this.field.isTerrain("mistyterrain")) {
        move = "moonblast";
      } else if (this.field.isTerrain("psychicterrain")) {
        move = "psychic";
      } else if (this.field.isTerrain("snowyterrain")) {
        move = "icebeam";
      } else if (this.field.isTerrain("midnightterrain")) {
        move = "darkpulse";
      } else if (this.field.isTerrain("shiningterrain")) {
        move = "flamethrower";
      }
      this.actions.useMove(move, pokemon, target);
      return null;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
  },
  naturesmadness: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  necromagic: {
    num: 3615,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Necro Magic",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, magic: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Clever"
  },
  necromagiceldritch: {
    num: 3616,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Necro Magic Eldritch",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, magic: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Clever"
  },
  necroticpunch: {
    num: 3270,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Necrotic Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1, magic: 1 },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Eldritch",
    contestType: "Cool"
  },
  networking: {
    num: 3520,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Networking",
    pp: 40,
    priority: 0,
    flags: {},
    onHit(target) {
      if (!this.canSwitch(target.side) || target.volatiles["commanded"]) {
        this.attrLastMove("[still]");
        this.add("-fail", target);
        return this.NOT_FAIL;
      }
    },
    self: {
      onHit(source) {
        source.skipBeforeSwitchOutEventFlag = true;
      }
    },
    selfSwitch: "copyvolatile",
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  newmoon: {
    num: 3271,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "New Moon",
    pp: 5,
    priority: 0,
    flags: { magic: 1 },
    weather: "Darkness",
    secondary: null,
    target: "all",
    type: "Dark",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  niflheim: {
    num: 3272,
    accuracy: 80,
    basePower: 110,
    category: "Special",
    name: "Niflheim",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
	onModifyMove(move) {
      if (this.field.isWeather(["hail", "snow"]))
        move.accuracy = true;
	},
    secondary: {
      chance: 15,
      status: "frz"
    },
    target: "normal",
    type: "Ice",
  },
  nightslash: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, magic: 1 }
  },
  nimbusfist: {
    num: 3273,
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
    num: 3274,
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
  noiseburst: {
    num: 3275,
    accuracy: 90,
    basePower: 150,
    category: "Special",
    name: "Noise Burst",
    pp: 5,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1, sound: 1 },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  nosferatu: {
    num: 3767,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Nosferatu",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1, metronome: 1, magic: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Clever"
  },
  nostrilflare: {
    num: 3276,
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
  novablast: {
    num: 3617,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Nova Blast",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
	secondary: {
      chance: 15,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  nuclearfang: {
    num: 3807,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Nuclear Fang",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 30,
      status: "tox"
    },
    target: "normal",
    type: "Nuclear",
    contestType: "Clever"
  },
  nuclearpulse: {
    num: 3542,
    accuracy: 85,
    basePower: 110,
    category: "Special",
    name: "Nuclear Pulse",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, pulse: 1 },
	secondary: {
      chance: 30,
      status: "psn"
    },
    target: "allAdjacent",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  nuclearpunch: {
    num: 3780,
    accuracy: 90,
    basePower: 105,
    category: "Physical",
    isNonstandard: "Past",
    name: "Nuclear Punch",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
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
    contestType: "Tough"
  },
  nuclearpunchnuclear: {
    num: 3781,
    accuracy: 90,
    basePower: 105,
    category: "Physical",
    isNonstandard: "Past",
    name: "Nuclear Punch Nuclear",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 20,
      self: {
        boosts: {
          atk: 1
        }
      }
    },
    target: "normal",
    type: "Nuclear",
    contestType: "Tough"
  },
  nuclearslash: {
    num: 3277,
    accuracy: 90,
    basePower: 55,
    category: "Physical",
    name: "Nuclear Slash",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    secondary: null,
	critRatio: 2,
    target: "normal",
    type: "Nuclear",
    contestType: "Cute"
  },
  nuclearwaste: {
    num: 3278,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Nuclear waste",
    pp: 10,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "tox",
    secondary: null,
    target: "normal",
    type: "Nuclear",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  nullpulse: {
    num: 3806,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Null Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, pulse: 1 },
    secondary: null,
    target: "any",
    type: "Questionmark",
    contestType: "Beautiful"
  },
  oblivionwing: {
    inherit: true,
	flags: { protect: 1, mirror: 1, distance: 1, heal: 1, metronome: 1, legendary: 1 }
  },
  oceanswrath: {
    num: 3279,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Ocean's Wrath",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, legendary: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Beautiful"
  },
  omniblast: {
    num: 3618,
    accuracy: 100,
    basePower: 100,
    category: "Special",
    name: "Omni Blast",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 20,
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
    target: "normal",
    type: "Electric",
    contestType: "Beautiful"
  },
  omnihowl: {
    num: 3619,
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Omni Howl",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Tough"
  },
  omnihowlsound: {
    num: 3620,
    accuracy: 100,
    basePower: 140,
    category: "Special",
    name: "Omni Howl Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Sound",
    contestType: "Tough"
  },
  oozeslash: {
    num: 3814,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Ooze Slash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Slime",
    contestType: "Cool"
  },
  originpulse: {
    inherit: true,
	flags: { protect: 1, pulse: 1, mirror: 1, beam: 1, legendary: 1 }
  },
  otherworldlyrevelations: {
    num: 3766,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    isNonstandard: "Past",
    name: "Otherworldly Revelations",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Eldritch",
    contestType: "Beautiful"
  },
  otherworldlytentacles: {
    num: 3569,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Otherworldly Tentacles",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    onHit(target, source, move) {
      target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Tough"
  },
  overclock: {
    num: 3518,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Overclock",
    pp: 30,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spe: 2
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cool"
  },
  overheadstrike: {
    num: 3280,
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
    num: 3281,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Ozone Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    secondary: {
      chance: 30,
      status: "psn"
    },
    target: "normal",
    type: "Wind",
    contestType: "Tough"
  },
  pacstrike: {
    num: 3637,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Pac Strike",
    pp: 15,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Beautiful"
  },
  pagefault: {
    num: 3621,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Page Fault",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1, slicing: 1 },
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
    type: "Poison",
    contestType: "Cool"
  },
  parasiteload: {
    num: 3737,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Parasite Load",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: {
      chance: 20,
      onHit(target, source) {
        const result = this.random(3);
        if (result === 0) {
          target.trySetStatus("psn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else {
          target.trySetStatus("fbt", source);
        }
      }
    },
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  parasiticfungi: {
    num: 3282,
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
    num: 3283,
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
  pepperbreath: {
    num: 3622,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Pepper Breath",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  perfectglare: {
    num: 3284,
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Perfect Glare",
    pp: 20,
    priority: 1,
    flags: { protect: 1, reflectable: 1, mirror: 1, speed: 1 },
    status: "par",
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { spd: 1 } },
    contestType: "Tough"
  },
  perishsongsound: {
    num: 3285,
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
  permafrost: {
    num: 3778,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Permafrost",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, nonsky: 1, metronome: 1, mustpressure: 1 },
    sideCondition: "permafrost",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Permafrost");
        this.effectState.layers = 1;
      },
      onSideRestart(side) {
        if (this.effectState.layers >= 5) return false;
        this.effectState.layers++;
        this.add("-sidestart", side, "move: Permafrost", "[up to " + this.effectState.layers + " layers]");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots")) return;
        if (pokemon.hasType("Fire") || pokemon.hasType("Ice")) {
          this.add("-sideend", pokemon.side, "move: Permafrost", "[of] " + pokemon);
          pokemon.side.removeSideCondition("permafrost");
          return;
        }
        let chance = this.effectState.layers * 10;
        // Double the freeze chance in Hail or Snow
        const weather = this.field.weather;
        if (weather === "hail" || weather === "snow") {
          chance *= 2;
        }
        if (this.randomChance(chance, 100)) {
          pokemon.trySetStatus("frz", pokemon.side.foe.active[0]);
        }
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Ice",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  perplex: {
    num: 3286,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Perplex",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
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
    num: 3287,
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
  phantomforce: {
    inherit: true,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness", "cursedwinds"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    }
  },
  phantomgrip: {
    num: 3288,
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
  photonblitz: {
    num: 3577,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Photon Blitz",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        def: -1,
        spd: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Beautiful"
  },
  photongeyser: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  photongeyserlight: {
    num: 3289,
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
  pianoslam: {
    num: 3821,
    accuracy: 100,
    basePower: 160,
    category: "Physical",
    name: "Piano Slam",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, cantusetwice: 1, sound: 1 },
    secondary: null,
    target: "normal",
    type: "Sound"
  },
  piercepincer: {
    num: 3290,
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
    num: 3291,
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
  plague: {
    num: 3292,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Plague",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Bug" || !target.setType("Bug")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Bug");
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  planepound: {
    num: 3479,
    accuracy: 100,
    basePower: 35,
    category: "Physical",
    name: "Plane Pound",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  plasmafists: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, legendary: 1 }
  },
  plasticblade: {
    num: 3500,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Plastic Blade",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Cool"
  },
  plasticexplosive: {
    num: 3497,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Plastic Explosive",
    pp: 10,
    priority: 0,
    flags: { allyanim: 1, futuremove: 1 },
    ignoreImmunity: true,
    onTry(source, target) {
      if (!target.side.addSlotCondition(target, "futuremove"))
        return false;
      Object.assign(target.side.slotConditions[target.position]["futuremove"], {
        duration: 3,
        move: "plasticexplosive",
        source,
        moveData: {
          id: "plasticexplosive",
          name: "Plastic Explosive",
          accuracy: 100,
          basePower: 120,
          category: "Special",
          priority: 0,
          flags: { allyanim: 1, futuremove: 1 },
          ignoreImmunity: false,
          effectType: "Move",
          type: "Plastic"
        }
      });
      this.add("-start", source, "move: Plastic Explosive");
      return this.NOT_FAIL;
    },
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Clever"
  },
  plasticrings: {
    num: 3498,
    accuracy: 90,
    basePower: 80,
    category: "Physical",
    name: "Plastic Rings",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Plastic"
  },
  plasticseal: {
    num: 3486,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Plastic Seal",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      if (target.getTypes().join() === "Plastic" || !target.setType("Plastic")) {
        this.add("-fail", target);
        return null;
      }
      this.add("-start", target, "typechange", "Plastic");
    },
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { boost: { spa: 1 } },
    contestType: "Cute"
  },
  plasticstorm: {
    num: 3650,
    accuracy: 70,
    basePower: 110,
    category: "Special",
    name: "Plastic Storm",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      boosts: {
        spe: -2
      }
    },
    target: "normal",
    type: "Plastic",
    contestType: "Beautiful"
  },
  poisonbubbles: {
    num: 3623,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Poison Bubbles",
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
  poisonleaf: {
    num: 3293,
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
  pokeburststream: {
	num: 3294,
	accuracy: 100,
	basePower: 100,
	category: "Physical",
	name: "Pokéburst Stream",
	pp: 5,
	priority: 0,
	flags: { contact: 1, protect: 1, mirror: 1},
	secondary: null,
	target: "normal",
	type: "Dark",
	contestType: "Beautiful"
  },
  pollinate: {
    num: 3295,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Pollinate",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "pollenstorm",
    secondary: null,
    target: "all",
    type: "Grass",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  polyblast: {
    num: 3296,
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
  polymercannon: {
    num: 3485,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Polymer Cannon",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    recoil: [1, 2],
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  polymerpelt: {
    num: 3481,
    accuracy: 100,
    basePower: 65,
    category: "Special",
    name: "Polymer Pelt",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  polygonalsword: {
    num: 3297,
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
    num: 3298,
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
    num: 3299,
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
  precipiceblades: {
    inherit: true,
	flags: { protect: 1, mirror: 1, nonsky: 1, legendary: 1 }
  },
  pressurize: {
    num: 3300,
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
    zMove: { boost: { atk: 1 } },
    contestType: "Tough"
  },
  pressurizedfang: {
    num: 3822,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Pressurized Fang",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 20,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Wind",
    contestType: "Tough"
  },
  preyingbite: {
    num: 3747,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Preying Bite",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1 },
    onBasePower(basePower, source, target, move) {
      if (target.status) {
        return this.chainModify(2);
      }
	},
	onAfterHit(target, source, move) {
      if (target.status && move.totalDamage) {
        this.heal(move.totalDamage / 4, source);
      }
	},
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Clever"
  },
  primalscream: {
    num: 3301,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Primal Scream",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "allAdjacentFoes",
    type: "Sound",
    contestType: "Tough"
  },
  prismarush: {
    num: 3302,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Prisma Rush",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    self: {
      boosts: {
        def: -1,
        spd: -1
      }
    },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  prismaticlaser: {
    inherit: true,
	flags: { recharge: 1, protect: 1, mirror: 1, beam: 1, legendary: 1 }
  },
  prismaticlaserlight: {
    num: 3303,
    accuracy: 100,
    basePower: 160,
    category: "Special",
    isNonstandard: "Past",
    name: "Prismatic Laser Light",
    pp: 10,
    priority: 0,
    flags: { recharge: 1, protect: 1, mirror: 1, beam: 1, legendary: 1 },
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
  prismbeam: {
    num: 3826,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Prism Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.getTypes()[0];
      if (type === "Bird")
        type = "???";
      if (type === "Stellar")
        type = pokemon.getTypes(false, true)[0];
      move.type = type;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
  },
  prismbreakerbeam: {
    num: 3716,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Prism Breaker Beam",
    pp: 1,
    priority: 0,
    flags: { beam: 1 },
    isZ: "crystaliumz",
    secondary: null,
    target: "normal",
    type: "Crystal",
    contestType: "Cool"
  },
  prismpunch: {
    num: 3573,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Prism Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
	onEffectiveness(typeMod, target, type) {
      if (type === "Light")
        return 1;
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  probepunch: {
    num: 3304,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Probe Punch",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
  },
  protectivelayer: {
    num: 3506,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Protective Layer",
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
    type: "Slime",
    zMove: { boost: { evasion: 1 } },
    contestType: "Cool"
  },
  protonbeam: {
    num: 3305,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Proton Beam",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
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
  psychic: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  psychicfangs: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, bite: 1, magic: 1 }
  },
  psychicnoise: {
    inherit: true,
	flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1, magic: 1 }
  },
  psybeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, beam: 1, magic: 1 }
  },
  psyblade: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, legendary: 1, magic: 1 }
  },
  psybolt: {
    num: 3306,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "Psybolt",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1, speed: 1, magic: 1 },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  psyburn: {
    num: 3307,
    accuracy: 70,
    basePower: 120,
    category: "Special",
    name: "Psyburn",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
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
  psychoboost: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1, magic: 1 }
  },
  psychocut: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1, magic: 1 }
  },
  psylight: {
    num: 3308,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Psylight",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "confusion"
    },
    target: "allAdjacentFoes",
    type: "Psychic",
    contestType: "Cool"
  },
  psyshieldbash: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  psyshock: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  psystrike: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1, magic: 1 }
  },
  psywave: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  puffup: {
    num: 3309,
    accuracy: true,
    basePower: 120,
    category: "Special",
    name: "Puff Up",
    pp: 1,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    forceSwitch: true,
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { def: 1 } },
    contestType: "Cool"
  },
  pummel: {
    num: 3310,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Pummel",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
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
  puncture: {
    num: 3729,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Puncture",
    pp: 35,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Tough"
  },
  pursuant: {
    num: 3311,
    accuracy: 100,
    basePower: 125,
    category: "Physical",
    name: "Pursuant",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, bypasssub: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Normal",
    contestType: "Tough"
  },
  quantumleap: {
    num: 3312,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Quantum Leap",
    pp: 5,
    priority: 0,
    flags: { contact: 1, charge: 1, mirror: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1, legendary: 1 },
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
  questionmarkprotocol: {
    num: 3722,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Questionmark Protocol",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "mysteriumz",
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Cool"
  },
  quickattack: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  quicksand: {
    num: 3313,
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
  quickturn: {
    num: 3679,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Quick Turn",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Dragon"
  },
  radiantblade: {
    num: 3314,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Radiant Blade",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  radioacid: {
    num: 3315,
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
  ragingflame: {
    num: 3316,
    accuracy: 100,
    basePower: 110,
    category: "Physical",
    name: "Raging Flame",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      self: {
        volatileStatus: "confusion"
      }
    },
    target: "normal",
    type: "Fire",
    contestType: "Beautiful"
  },
  ragingwaves: {
    num: 3317,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "RAging Waves",
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
  rainbowpunch: {
    num: 3318,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Rainbow Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      onHit(target, source) {
        const result = this.random(4);
        if (result === 0) {
          target.trySetStatus("brn", source);
        } else if (result === 1) {
          target.trySetStatus("par", source);
        } else if (result === 2) {
          target.trySetStatus("psn", source);
        } else {
          target.trySetStatus("frz", source);
        }
      }
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
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
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost", "hotcoals"];
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
      const sideConditions = ["constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns", "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge", "slimetrail", "bloodsigil", "livewire", "permafrost", "hotcoals"];
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
    num: 3319,
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
    num: 3320,
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
    num: 3321,
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
  recklessrend: {
    num: 3756,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Reckless Rend",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
	critRatio: 2,
    secondary: {
      chance: 100,
      self: {
        volatileStatus: "confusion"
      }
    },
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  reconstitute: {
    num: 3771,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reconstitute",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, metronome: 1 },
    heal: [1, 2],
    secondary: null,
    target: "self",
    type: "Slime",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  reflectivecloak: {
    num: 3322,
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
  reflect: {
    inherit: true,
	flags: { snatch: 1, metronome: 1, magic: 1 }
  },
  reflectlight: {
    num: 3323,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reflect Light",
    pp: 20,
    priority: 0,
    flags: { snatch: 1, magic: 1 },
    sideCondition: "reflect",
    secondary: null,
    target: "allySide",
    type: "Light",
    zMove: { boost: { def: 1 } },
    contestType: "Clever"
  },
  reforgedflesh: {
    num: 3757,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Reforged Flesh",
    pp: 20,
    priority: 0,
    flags: { metronome: 1, magic: 1 },
    onHit(target) {
      if (target.hp <= target.maxhp / 10) return false; // Prevent fainting from sacrifice
	  this.directDamage(target.maxhp / 10, target); // Sacrifice 10% max HP
	  const stats = [];
	  let stat;
      for (stat in target.boosts) {
        if (target.boosts[stat] < 6) {
          stats.push(stat);
        }
      }
      if (stats.length) {
        const randomStat = this.sample(stats);
        const boost = {};
        boost[randomStat] = 3;
        this.boost(boost);
      } else {
        return false;
      }
    },
    secondary: null,
    target: "adjacentAllyOrSelf",
    type: "Blood",
    zMove: { effect: "crit2" },
    contestType: "Tough"
  },
  reformat: {
	num: 3324,
	accuracy: 100,
	basePower: 0,
	category: "Status",
	name: "Reformat",
	pp: 20,
	priority: 0,
	flags: { snatch: 1 },
	secondary: null,
	boosts: {
      def: 1,
	  spd: 1,
      spe: -1
    },
	target: "self",
	type: "Digital",
    zMove: { effect: "clearnegativeboost" },
	contestType: "Cool"
  },
  regalfang: {
    num: 3680,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Regal Fang",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
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
  relicsong: {
    inherit: true,
	flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, legendary: 1 }
  },
  relicsongsound: {
    num: 3325,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Relic Song Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, legendary: 1 },
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
  remoraidcannon: {
    num: 3326,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Remoraid Cannon",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, noparentalbond: 1 },
    multihit: 2,
    smartTarget: true,
    secondary: null,
    target: "normal",
    type: "Water",
    maxMove: { basePower: 130 }
  },
  remotecontrol: {
    num: 3647,
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Remote Control",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    overrideOffensivePokemon: "target",
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Clever"
  },
  replicate: {
    num: 3327,
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
      failmimic: 1,
	  magic: 1
    },
    onHit(target, source) {
      const disallowedMoves = ["chatter", "sketch", "replicate", "copypaste", "amalgamate", "struggle"];
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
  reprisal: {
    num: 3328,
    accuracy: 100,
    basePower: 60,
    basePowerCallback(pokemon, target, move) {
      const damagedByTarget = pokemon.attackedBy.some(
        (p) => p.source === target && p.damage > 0 && p.thisTurn
      );
      if (damagedByTarget) {
        this.debug("BP doubled for getting hit by " + target);
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Special",
    name: "Reprisal",
    pp: 10,
    priority: -4,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Beautiful"
  },
  revup: {
    num: 3329,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Rev Up",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, sound: 1 },
    secondary: {
      chance: 100,
      self: {
        boosts: {
          spe: 1
        }
      }
    },
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  rhythmstrike: {
    num: 3330,
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
  riderkick: {
    num: 3460,
    accuracy: 90,
    basePower: 130,
    category: "Physical",
    name: "Rider Kick",
    pp: 10,
    priority: 0,
    flags: { recharge: 1, contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
	self: {
      volatileStatus: "mustrecharge"
    },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Fighting", type);
    },
    secondary: null,
    target: "normal",
    type: "Bug",
    contestType: "Cool"
  },
  riffrend: {
    num: 3818,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Riff Rend",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, sound: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  ripen: {
    num: 3331,
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
    num: 3332,
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
  risingimpact: {
    num: 3462,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Rising Impact",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, gravity: 1, kick: 1 },
    hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  risingvoltage: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  roaroftime: {
    inherit: true,
	flags: { recharge: 1, protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  roarsound: {
    num: 3333,
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
  rockclimb: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, hm: 1 }
  },
  rocketdrillkick: {
    num: 3536,
    accuracy: 90,
    basePower: 120,
    category: "Physical",
    name: "Rocket Drill Kick",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, kick: 1 },
	hasCrashDamage: true,
    onMoveFail(target, source, move) {
      this.damage(source.baseMaxhp / 2, source, source, this.dex.conditions.get("High Jump Kick"));
    },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Steel", type);
    },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  rocketdrive: {
    num: 3681,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Rocket Drive",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    recoil: [1, 4],
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Tough"
  },
  rocksmash: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, hm: 1 }
  },
  rollingkick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  roundsound: {
    num: 3334,
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
  rottingsparks: {
    num: 3335,
    accuracy: 90,
    basePower: 25,
    category: "Special",
    name: "Rotting Sparks",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Eldritch",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  royalbreath: {
    num: 3336,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Royal Breath",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      self: {
        boosts: {
          spa: 1
        }
      }
    },
    target: "normal",
    type: "Dragon",
    contestType: "Beautiful"
  },
  rubblerush: {
    num: 3337,
    accuracy: 80,
    basePower: 140,
    category: "Physical",
    name: "Rubble Rush",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  ruination: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  sacredfire: {
    inherit: true,
	flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1, legendary: 1, magic: 1 }
  },
  sacredsword: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, slicing: 1, legendary: 1, magic: 1 }
  },
  sacrificialpact: {
    num: 3338,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Sacrificial Pact",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, magic: 1 },
    recoil: [50, 100],
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Tough"
  },
  saltcrash: {
    num: 3339,
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
    num: 3340,
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
      onSideStart(side) {
        this.add("-sidestart", side, "move: Salt Therapy");
      },
      onResidualOrder: 6,
      onResidual(side) {
        this.heal(side.baseMaxhp / 12);
      },
      onSideEnd(side) {
        this.add("-sideend", side, "move: Salt Therapy");
      },
    },
    secondary: null,
    target: "allySide",
    type: "Rock",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful",
  },
  sandsearstorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, wind: 1, legendary: 1 }
  },
  saurtooth: {
    num: 3341,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Saurtooth",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Tough"
  },
  scorchedashes: {
    num: 3342,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Scorched Ashes",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1 },
    sideCondition: "scorchedashes",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Scorched Ashes");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots"))
          return;
        this.add("-activate", pokemon, "move: Scorched Ashes");
        this.boost({ atk: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove("scorchedashes"));
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Fire",
    zMove: { boost: { atk: 1 } },
    contestType: "Tough"
  },
  screechsound: {
    num: 3343,
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
  searingplasma: {
    num: 3752,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Searing Plasma",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, defrost: 1, metronome: 1 },
    thawsTarget: true,
	recoil: [1, 4],
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Blood",
    contestType: "Tough"
  },
  searingshot: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, bullet: 1, legendary: 1 }
  },
  searingslash: {
    num: 3344,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Searing Slash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
	critRatio: 2,
    target: "normal",
    type: "Fire",
    contestType: "Cute"
  },
  secondwind: {
    num: 3469,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Second Wind",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    heal: [1, 2],
    secondary: null,
    target: "self",
    type: "Wind",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  secretpower: {
    num: 290,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    isNonstandard: "Past",
    name: "Secret Power",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    onModifyMove(move, pokemon) {
      if (this.field.isTerrain(""))
        return;
      move.secondaries = [];
      if (this.field.isTerrain("electricterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "par"
        });
      } else if (this.field.isTerrain("grassyterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "slp"
        });
      } else if (this.field.isTerrain("mistyterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spa: -1
          }
        });
      } else if (this.field.isTerrain("psychicterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      } else if (this.field.isTerrain("snowyterrain")) {
        move.secondaries.push({
          chance: 30,
          boosts: {
            spe: -1
          }
        });
      } else if (this.field.isTerrain("midnightterrain")) {
        move.secondaries.push({
          chance: 30,
          volatileStatus: "flinch"
        });
      } else if (this.field.isTerrain("shiningterrain")) {
        move.secondaries.push({
          chance: 30,
          status: "brn"
        });
      }
    },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Normal",
    contestType: "Clever"
  },
  secretsword: {
    inherit: true,
	flags: { protect: 1, mirror: 1, slicing: 1, legendary: 1 }
  },
  seedflare: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  seedyrecede: {
    num: 3345,
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
  segfaultslash: {
    num: 3802,
    accuracy: 95,
    basePower: 75,
    category: "Physical",
    name: "Segfault Slash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    secondary: {
      chance: 50,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Questionmark",
    contestType: "Cool"
  },
  shadetrance: {
    num: 3346,
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
  shadowbarrage: {
    num: 3800,
    accuracy: 100,
    basePower: 25,
    category: "Physical",
    name: "Shadow Barrage",
    pp: 30,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Shadow",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  shadowblast: {
    num: 3347,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Shadow Blast",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, legendary: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "any",
    type: "Shadow",
    contestType: "Cool"
  },
  shadowblitz: {
    num: 3348,
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
    num: 3349,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Shadow Bolt",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, legendary: 1 },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Shadow",
    contestType: "Cool"
  },
  shadowbreak: {
    num: 3350,
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
    num: 3351,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Shadow Chill",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, legendary: 1 },
    secondary: {
      chance: 10,
      status: "frz"
    },
    target: "normal",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowclamp: {
    num: 3352,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Shadow Clamp",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondary: {
      chance: 30,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          target.addVolatile("confusion");
        } else if(result === 1) {
          target.setStatus("slp");
        }
      }
    },
    target: "normal",
    type: "Ghost",
    contestType: "Beautiful"
  },
  shadowdown: {
    num: 3353,
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
    num: 3354,
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
  shadowfang: {
    num: 3793,
    accuracy: 95,
    basePower: 65,
    category: "Physical",
    name: "Shadow Fang",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, bite: 1 },
    secondaries: [
      {
        chance: 20,
        volatileStatus: "flinch"
      }
    ],
    target: "normal",
    type: "Shadow",
    contestType: "Cool"
  },
  shadowfin: {
    num: 3682,
    accuracy: 100,
    basePower: 80,
	basePowerCallback(pokemon) {
      const speedBoosts = pokemon.boosts.spe || 0; // Get the user's Speed stat boost stages
      const extraPower = speedBoosts > 0 ? 10 * speedBoosts : 0; // Increase base power by 10 for each Speed stage
      return 80 + extraPower; // Base power starts at 80, adds 10 per Speed boost stage
	},
    category: "Physical",
    name: "Shadow Fin",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Tough"
  },
  shadowfire: {
    num: 3355,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    name: "Shadow Fire",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, legendary: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowforce: {
    inherit: true,
	flags: { contact: 1, charge: 1, mirror: 1, metronome: 1, nosleeptalk: 1, noassist: 1, failinstruct: 1, legendary: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return this.chainModify(1.5);
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    }
  },
  shadowhalf: {
    num: 3356,
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
  shadowhammer: {
    num: 3796,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Shadow Hammer",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Tough"
  },
  shadowhold: {
    num: 3357,
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
  shadowjab: {
    num: 3795,
    accuracy: true,
    basePower: 60,
    category: "Physical",
    name: "Shadow Jab",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Clever"
  },
  shadowjet: {
    num: 3797,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Shadow Jet",
    pp: 30,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowmist: {
    num: 3358,
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
    num: 3359,
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
  shadowpulse: {
    num: 3799,
    accuracy: true,
    basePower: 80,
    category: "Special",
    name: "Shadow Pulse",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, distance: 1, pulse: 1 },
    secondary: null,
    target: "any",
    type: "Shadow",
    contestType: "Beautiful"
  },
  shadowrave: {
    num: 3360,
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
  shadowrend: {
    num: 3794,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Shadow Rend",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Cool"
  },
  shadowrush: {
    num: 3361,
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
    num: 3362,
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
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  shadowsky: {
    num: 3363,
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
  shadowslip: {
    num: 3798,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Shadow Slip",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    selfSwitch: true,
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Cute"
  },
  shadowsneak: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  shadowsplit: {
    num: 3683,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Shadow Split",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Ghost",
    contestType: "Tough"
  },
  shadowstorm: {
    num: 3364,
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
    num: 3365,
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
  shatterfist: {
    num: 3494,
    accuracy: 100,
    basePower: 30,
    category: "Physical",
    name: "Shatterfist",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
	recoil: [33, 100],
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Crystal",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Beautiful"
  },
  shieldbash: {
    num: 3366,
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
    num: 3367,
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
    num: 3368,
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
  shine: {
    num: 3574,
    accuracy: 100,
    basePower: 45,
    category: "Special",
    name: "Shine",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        accuracy: -1
      }
    },
    target: "normal",
    type: "Light",
    contestType: "Cool"
  },
  shininglaser: {
    num: 3578,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Shining Laser",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Light",
    contestType: "Clever"
  },
  shiningterrain: {
    num: 3839,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shining Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1 },
    terrain: "shiningterrain",
    condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if ((move.type === "Fire" || move.type === "Light") && attacker.isGrounded()) {
          this.debug("shining terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Shining Terrain", "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-fieldstart", "move: Shining Terrain");
        }
      },
	  onResidualOrder: 5,
      onResidualSubOrder: 2,
      onResidual(pokemon) {
        if (
          pokemon.isGrounded() &&
          !pokemon.isSemiInvulnerable() &&
          !pokemon.hasType("Fire") &&
		  !pokemon.hasType("Light")
        ) {
          this.damage(pokemon.baseMaxhp / 16, pokemon);
        } else {
          this.debug(`Pokemon semi-invuln, Fire type, or not grounded; Shining Terrain damage skipped`);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Shining Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Fire",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
  },
  shootingstar: {
    num: 3470,
    accuracy: true,
    basePower: 60,
    category: "Special",
    name: "Shooting Star",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  shoreup: {
    num: 659,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shore Up",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1, metronome: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      if (this.field.isWeather(["sandstorm", "duststorm"])) {
        factor = 0.667;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Ground",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  shrinkwrap: {
    num: 3776,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Shrink Wrap",
    pp: 5,
    priority: 0,
    flags: { reflectable: 1, mirror: 1, metronome: 1 },
    onHit(target, source, move) {
      return target.addVolatile("trapped", source, move, "trapper");
    },
    secondary: null,
    target: "normal",
    type: "Plastic",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
  },
  sigiltransfer: {
    num: 3764,
    accuracy: 95,
    basePower: 60,
    category: "Special",
    name: "Sigil Transfer",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 },
    onTry(source) {
      const userSide = source.side;
      const foeSide = source.side.foe;
      if (!userSide.sideConditions["bloodsigil"] && !foeSide.sideConditions["bloodsigil"]) {
        this.add("-fail", source, "move: Sigil Transfer");
        return false;
      }
    },
    onModifyMove(move, source) {
      const userSide = source.side;
      const foeSide = source.side.foe;

      let totalSigils = 0;
      if (userSide.sideConditions["bloodsigil"]) totalSigils += 1;
      if (foeSide.sideConditions["bloodsigil"]) totalSigils += 1;

      // Prevent edge case errors: if no sigils, move won't be used anyway due to onTry()
      if (totalSigils > 1) {
        move.multihit = totalSigils;
      }
    },
    onAfterMove(source) {
      const userSide = source.side;
      const foeSide = source.side.foe;

      if (userSide.sideConditions["bloodsigil"]) {
        userSide.removeSideCondition("bloodsigil");
      }
      if (foeSide.sideConditions["bloodsigil"]) {
        foeSide.removeSideCondition("bloodsigil");
      }
    },
    secondary: null,
    target: "normal",
    type: "Blood",
    contestType: "Beautiful"
  },
  signalbeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  signalbeamlight: {
    num: 3369,
    accuracy: 100,
    basePower: 75,
    category: "Special",
    isNonstandard: "Past",
    name: "Signal Beam Light",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
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
  simplebeam: {
    inherit: true,
	flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1, beam: 1 }
  },
  simulateddread: {
    num: 3492,
    accuracy: 30,
    basePower: 0,
    category: "Special",
    name: "Simulated Dread",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    ohko: true,
    secondary: null,
    target: "normal",
    type: "Questionmark",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  singsound: {
    num: 3370,
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
    num: 3371,
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
    num: 3372,
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
  spiritbreak: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, magic: 1 }
  },
  sizzlebeak: {
    num: 3373,
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
  sizzleslam: {
    num: 3624,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Sizzle Slam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    onHit(pokemon, source) {
      const item = pokemon.getItem();
      if ((item.isBerry || item.isGem) && pokemon.takeItem(source)) {
        this.add("-enditem", pokemon, item.name, "[from] move: Sizzle Slam");
      }
    },
    secondary: {
      chance: 100,
      status: "brn"
    },
    target: "normal",
    type: "Fire",
    contestType: "Tough"
  },
  sketch: {
    inherit: true,
	onHit(target, source) {
      const disallowedMoves = ["chatter", "sketch", "replicate", "copypaste", "amalgamate", "struggle"];
      const move = target.lastMove;
      if (source.transformed || !move || source.moves.includes(move.id))
        return false;
      if (move.noSketch || move.isZ || move.isMax)
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
    }
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
    num: 3374,
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
    num: 3375,
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
  sleetstrike: {
    num: 3728,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Sleet Strike",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    secondaries: [
      {
        chance: 10,
        status: "fbt"
      },
      {
        chance: 10,
        boosts: {
          atk: -1
        }
      }
    ],
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  slimeball: {
    num: 3505,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Slimeball",
    pp: 15,
    priority: 0,
    flags: { protect: 1, mirror: 1, bullet: 1 },
    secondary: {
      chance: 20,
      boosts: {
        spd: -1
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Clever"
  },
  slimecannon: {
    num: 3507,
    accuracy: 80,
    basePower: 110,
    category: "Special",
    name: "Slime Cannon",
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
    contestType: "Beautiful"
  },
  slimetrail: {
    num: 3511,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Slime Trail",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1, metronome: 1 },
    sideCondition: "slimetrail",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Slime Trail");
      },
	  onAfterMoveSecondarySelf(source, target, move) {
        if (move.flags["contact"] && target && !target.fainted) {
          const recoilDamage = this.clampIntRange(move.totalDamage * 50 / 100, 1);
          this.damage(recoilDamage, source, source, "slimetrail");
        }
	  }
    },
    secondary: null,
    target: "foeSide",
    type: "Slime",
    zMove: { boost: { spe: 1 } },
    contestType: "Tough"
  },
  slimeyslam: {
    num: 3509,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Slimey Slam",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, nonsky: 1 },
    secondary: {
      chance: 30,
      status: "par"
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
  },
  slimyspit: {
    num: 3376,
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
  sludgehammer: {
    num: 3816,
    accuracy: 100,
    basePower: 160,
    category: "Physical",
    name: "Sludge Hammer",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, cantusetwice: 1 },
    secondary: null,
    target: "normal",
    type: "Slime"
  },
  sluggishbrew: {
    num: 3471,
    accuracy: 90,
    basePower: 0,
    category: "Status",
    name: "Sluggish Brew",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "par",
    ignoreImmunity: false,
    secondary: null,
    target: "normal",
    type: "Poison",
    zMove: { boost: { spd: 1 } },
    contestType: "Cool"
  },
  smartpunch: {
    num: 3377,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Smart Punch",
    pp: 40,
    priority: 0,
    flags: { contact: 1, protect: 1, punch: 1, mirror: 1 },
    onDamagePriority: -20,
    onDamage(damage, target, source, effect) {
      if (damage >= target.hp)
        return target.hp - 1;
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Cool"
  },
  smogdiffusion: {
    num: 3378,
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
  smogscreen: {
    num: 3379,
    accuracy: 95,
    basePower: 55,
    category: "Special",
    name: "Smogscreen",
    pp: 25,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      onHit(target, source) {
        const result = this.random(2);
        if (result === 0) {
          this.boost({accuracy: -1}, target, source, null, true);
        } else if(result === 1) {
          target.setStatus("psn");
        }
      }
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful"
  },
  smogspread: {
    num: 3380,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Smog Spread",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "smog",
    secondary: null,
    target: "all",
    type: "Poison",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  snakeeyes: {
    num: 3831,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Snake Eyes",
    pp: 30,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "par",
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { boost: { spd: 1 } },
    contestType: "Tough"
  },
  snarehit: {
    num: 3819,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Snare Hit",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1, sound: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Sound",
    contestType: "Cute"
  },
  snoresound: {
    num: 3381,
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
  snowyterrain: {
    num: 3827,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Snowy Terrain",
    pp: 10,
    priority: 0,
    flags: { nonsky: 1 },
    terrain: "snowyterrain",
    condition: {
      duration: 5,
      durationCallback(source, effect) {
        if (source?.hasItem("terrainextender")) {
          return 8;
        }
        return 5;
      },
      onBasePowerPriority: 6,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Ice" && attacker.isGrounded()) {
          this.debug("snowy terrain boost");
          return this.chainModify([5325, 4096]);
        }
      },
	  onModifySpe(spe, pokemon) {
        if (
          pokemon.isGrounded() &&
          !pokemon.hasType("Ice")
        ) {
          this.debug("Snowy Terrain Speed drop for non-Ice grounded Pokémon");
          return this.chainModify([2731, 4096]);
        }
      },
      onFieldStart(field, source, effect) {
        if (effect?.effectType === "Ability") {
          this.add("-fieldstart", "move: Snowy Terrain", "[from] ability: " + effect.name, "[of] " + source);
        } else {
          this.add("-fieldstart", "move: Snowy Terrain");
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 7,
      onFieldEnd() {
        this.add("-fieldend", "move: Snowy Terrain");
      }
    },
    secondary: null,
    target: "all",
    type: "Ice",
    zMove: { boost: { def: 1 } },
    contestType: "Beautiful"
  },
  soilthrow: {
    num: 3684,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Soil Throw",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      boosts: {
        def: -1
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  solarbeam: {
    inherit: true,
	flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, beam: 1 },
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "acidrain", "darkness", "eclipse", "fallout", "thunderstorm", "fog", "duststorm", "cursedwinds"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    }
  },
  solarblade: {
    num: 669,
    accuracy: 100,
    basePower: 125,
    category: "Physical",
    name: "Solar Blade",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1, nosleeptalk: 1, failinstruct: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["sunnyday", "desolateland"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["raindance", "primordialsea", "sandstorm", "hail", "snow", "acidrain", "darkness", "eclipse", "fallout", "thunderstorm", "fog", "duststorm", "cursedwinds"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("weakened by weather");
        return this.chainModify(0.5);
      }
    },
    secondary: null,
    target: "normal",
    type: "Grass",
    contestType: "Cool"
  },
  solarflare: {
    num: 3528,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Solar Flare",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, bypasssub: 1 },
	onModifyType(move, pokemon, target) {
      const cosmicTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Light";
      const lightTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Cosmic";
      if (cosmicTypeEffectiveness === lightTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Light")){
          move.type = "Light";
        }
      } else if(lightTypeEffectiveness>cosmicTypeEffectiveness){
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
    type: "Cosmic",
    contestType: "Beautiful"
  },
  solarpunch: {
    num: 3382,
    accuracy: 100,
    basePower: 75,
    category: "Physical",
    name: "Solar Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 10,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  solarspear: {
    num: 3383,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Solar Spear",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Tough"
  },
  solidificate: {
    num: 3698,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Solidificate",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, allyanim: 1 },
    onHit(target) {
      const newTypes = target.types.map(type => {
        if (type === "Water") return "Ice";
        return type;
      });

      if (newTypes.join() === target.types.join()) {
        this.add("-fail", target);
        return null;
      }

      target.setType(newTypes);
      this.add("-start", target, "typechange", newTypes.join("/"));
    },
    secondary: null,
    target: "normal",
    type: "Ice",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  somnismog: {
    num: 3384,
    accuracy: 60,
    basePower: 0,
    category: "Status",
    name: "Somnismog",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1 },
    status: "slp",
    secondary: null,
    target: "normal",
    type: "Psychic",
    zMove: { boost: { spe: 1 } },
    contestType: "Clever"
  },
  sonicboomsound: {
    num: 3385,
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
  souldevour: {
    num: 3386,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Soul Devour",
    pp: 10,
    priority: 0,
    flags: { mirror: 1, bypasssub: 1 },
    breaksProtect: true,
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Clever"
  },
  soulrend: {
    num: 3768,
    accuracy: 100,
    basePower: 85,
    category: "Physical",
    name: "Soul Rend",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1, magic: 1 },
    onAfterMoveSecondarySelf(pokemon, target, move) {
      if (!target || target.fainted || target.hp <= 0)
        this.boost({ atk: 1, spe: 1 }, pokemon, pokemon, move);
    },
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Cool"
  },
  soulshock: {
    num: 3685,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Soulshock",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower, pokemon, target) {
      if (target.hp * 2 <= target.maxhp) {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Tough"
  },
  soulstealing7starstrike: {
    inherit: true,
	flags: { contact: 1, kick: 1 }
  },
  soundbarrier: {
    num: 3387,
    accuracy: true,
    basePower: 0,
    category: "Status",
    isNonstandard: "Past",
    name: "Sound Barrier",
    pp: 15,
    priority: 0,
    flags: { nonsky: 1 },
    pseudoWeather: "soundbarrier",
    condition: {
      duration: 5,
      onFieldStart(field, source) {
        this.add("-fieldstart", "move: Sound Barrier", "[of] " + source);
      },
      onBasePowerPriority: 1,
      onBasePower(basePower, attacker, defender, move) {
        if (move.type === "Flying" || move.type === "Water" || move.type === "Fairy") {
          this.debug("sound barrier weaken");
          return this.chainModify([1352, 4096]);
        }
      },
      onFieldResidualOrder: 27,
      onFieldResidualSubOrder: 3,
      onFieldEnd() {
        this.add("-fieldend", "move: Sound Barrier");
      }
    },
    secondary: null,
    target: "all",
    type: "Sound",
    zMove: { boost: { spd: 1 } },
    contestType: "Cute"
  },
  soundpledge: {
    num: 3388,
    accuracy: 100,
	basePower: 80,
    category: "Special",
    name: "Sound Pledge",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Beautiful"
  },
  soundpound: {
    num: 3389,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Sound Pound",
    pp: 15,
    priority: 0,
    flags: {protect: 1, mirror: 1, metronome: 1, sound: 1},
    secondary: {
      chance: 20,
      boosts: {
        def: -1,
      },
    },
    target: "normal",
    type: "Sound",
    contestType: "Clever",
  },
  spaceslam: {
    num: 3581,
    accuracy: 100,
    basePower: 50,
    category: "Physical",
    name: "Space Slam",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onBasePower(basePower) {
      if (this.field.getPseudoWeather("gravity")) {
        return this.chainModify(2);
      }
    },
    secondary: null,
    target: "normal",
    type: "Cosmic"
  },
  spacialrend: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, legendary: 1 }
  },
  spaciumbeam: {
    num: 3463,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Spacium Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, beam: 1 },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  spaghettification: {
    num: 3529,
    accuracy: 30,
    basePower: 0,
    category: "Physical",
    name: "Spaghettification",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    ohko: true,
    secondary: null,
    target: "normal",
    type: "Cosmic",
    zMove: { basePower: 180 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  spam: {
    num: 3390,
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
    num: 3391,
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
  spectralthief: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, bypasssub: 1, legendary: 1 }
  },
  speedmite: {
    num: 3686,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Speedmite",
    pp: 20,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  spindash: {
    num: 3476,
    accuracy: 85,
    basePower: 100,
    category: "Physical",
    name: "Spin Dash",
    pp: 5,
    priority: 1,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Tough"
  },
  spiralheatray: {
    num: 3541,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Spiral Heat Ray",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, beam: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["fallout"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    secondary: null,
    target: "normal",
    type: "Nuclear",
    contestType: "Cool"
  },
  spiritaway: {
    num: 3458,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    isNonstandard: "Past",
    name: "Spirit Away",
    pp: 5,
    priority: 0,
    flags: {
      contact: 1,
      charge: 1,
      protect: 1,
      mirror: 1,
      distance: 1,
      metronome: 1,
      nosleeptalk: 1,
      noassist: 1,
      failinstruct: 1,
	  magic: 1
    },
    onModifyMove(move, source) {
      if (!source.volatiles["spiritaway"]) {
        move.accuracy = true;
        delete move.flags["contact"];
      }
    },
    onMoveFail(target, source) {
      if (source.volatiles["twoturnmove"] && source.volatiles["twoturnmove"].duration === 1) {
        source.removeVolatile("spiritaway");
        source.removeVolatile("twoturnmove");
        if (target === this.effectState.target) {
          this.add("-end", target, "Spirit Away", "[interrupt]");
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
        if (target.hasType("Fairy")) {
          this.add("-immune", target);
          return null;
        }
      } else {
        if (target.volatiles["substitute"] || target.isAlly(source)) {
          return false;
        }
        if (target.getWeight() >= 2e3) {
          this.add("-fail", target, "move: Spirit Away", "[heavy]");
          return null;
        }
        this.add("-prepare", source, move.name, target);
        source.addVolatile("twoturnmove", target);
        return null;
      }
    },
    onHit(target, source) {
      if (target.hp)
        this.add("-end", target, "Spirit Away");
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
          this.debug("Spirit Away nullifying.");
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
        if (["placeholermove"].includes(move.id)) {
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
        if (move.id === "placeholdermove") {
          this.debug("BP doubled on banished target");
          return this.chainModify(2);
        }
      },
      onFaint(target) {
        if (target.volatiles["spiritaway"] && target.volatiles["twoturnmove"].source) {
          this.add("-end", target.volatiles["twoturnmove"].source, "Spirit Away", "[interrupt]");
        }
      }
    },
    secondary: null,
    target: "any",
    type: "Fairy",
    contestType: "Tough"
  },
  spookysound: {
    num: 3687,
    accuracy: 95,
    basePower: 0,
    category: "Status",
    name: "Spooky Sound",
    pp: 20,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1 },
    boosts: {
      spa: -1,
      spd: -1
    },
    secondary: null,
    target: "allAdjacent",
    type: "Ghost",
    zMove: { boost: { def: 1 } },
    contestType: "Tough"
  },
  spotlightlight: {
    num: 3392,
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
  springtidestorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, wind: 1, legendary: 1 }
  },
  sprinkle: {
    num: 3393,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sprinkle",
    pp: 5,
    priority: 0,
    flags: { magic: 1 },
    weather: "fairydust",
    secondary: null,
    target: "all",
    type: "Fairy",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  squallstrike: {
    num: 3394,
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
  squeezehug: {
    num: 3472,
    accuracy: 90,
    basePower: 15,
    category: "Physical",
    name: "Squeeze Hug",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    volatileStatus: "partiallytrapped",
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  squishpunch: {
    num: 3815,
    accuracy: 90,
    basePower: 25,
    category: "Physical",
    name: "Squish Punch",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    onModifyMove(move, source) {
      const hpRatio = source.hp / source.maxhp;
      if (hpRatio > 0.75) {
        move.multihit = 1;
      } else if (hpRatio > 0.5) {
        move.multihit = 2;
      } else if (hpRatio > 0.25) {
        move.multihit = 3;
      } else {
        move.multihit = 4;
      }
    },
    target: "normal",
    type: "Slime",
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  squishstrike: {
    num: 3770,
    accuracy: 90,
    basePower: 30,
    category: "Physical",
    name: "Squish Strike",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onModifyMove(move, source) {
      const hpRatio = source.hp / source.maxhp;
      if (hpRatio > 0.75) {
        move.multihit = 1;
      } else if (hpRatio > 0.5) {
        move.multihit = 2;
      } else if (hpRatio > 0.25) {
        move.multihit = 3;
      } else {
        move.multihit = 4;
      }
    },
    target: "normal",
    type: "Slime",
    maxMove: { basePower: 130 },
    contestType: "Tough"
  },
  sssslash: {
    num: 3489,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "S-S-S-Slash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, nosleeptalk: 1, failinstruct: 1, slicing: 1 },
	multihit: 2,
	critRatio: 2,
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
    secondary: null,
    target: "normal",
    type: "Questionmark",
    contestType: "Beautiful"
  },
  standoff: {
    num: 3395,
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
  starburstdragon: {
    num: 3790,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Star Burst Dragon",
    pp: 5,
    priority: 0,
    flags: { mirror: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    secondary: null,
    target: "normal",
    type: "Dragon",
    contestType: "Cool"
  },
  starburstfairy: {
    num: 3791,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Star Burst Fairy",
    pp: 5,
    priority: 0,
    flags: { mirror: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  starburstsound: {
    num: 3792,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Star Burst Sound",
    pp: 5,
    priority: 0,
    flags: { mirror: 1 },
    onModifyMove(move, pokemon) {
      if (pokemon.getStat("atk", false, true) > pokemon.getStat("spa", false, true))
        move.category = "Physical";
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  stardust: {
    num: 3396,
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
    num: 3397,
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
  starlightshower: {
    num: 3533,
    accuracy: 100,
    basePower: 25,
    category: "Special",
    name: "Starlight Shower",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1, punch: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  starshot: {
    num: 3398,
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
  starstorm: {
    num: 3399,
    accuracy: 100,
    basePower: 110,
    category: "Special",
    name: "Starstorm",
    pp: 5,
    priority: 0,
    flags: { magic: 1 },
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Tough"
  },
  starstormcosmic: {
    num: 3400,
    accuracy: 100,
    basePower: 110,
    category: "Special",
    name: "Starstorm Cosmic",
    pp: 5,
    priority: 0,
    flags: { magic: 1 },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Tough"
  },
  stealthrock: {
    inherit: true,
	sideCondition: "stealthrock",
    condition: {
      // this is a side condition
      onSideStart(side) {
        this.add("-sidestart", side, "move: Stealth Rock");
      },
      onEntryHazard(pokemon) {
        if (pokemon.hasItem("heavydutyboots"))
          return;
        const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove("stealthrock")), -6, 6);
        this.damage(pokemon.maxhp * Math.pow(2, typeMod) / 8);
      }
    }
  },
  steameruption: {
    inherit: true,
	flags: { protect: 1, mirror: 1, defrost: 1, legendary: 1 }
  },
  steelbeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  stingfreeze: {
    num: 3401,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Sting Freeze",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "par"
    },
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  fakemonstonesurge: {
    num: 3402,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Fakemon Stone Surge",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  storedpower: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  stormbomb: {
    num: 3540,
    accuracy: 90,
    basePower: 130,
    category: "Special",
    name: "Storm Bomb",
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
  stormforecast: {
    num: 3403,
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
  strength: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, hm: 1 }
  },
  stretch: {
    num: 3688,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Stretch",
    pp: 10,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      atk: 1,
      spe: 1,
	  evasion: 1
    },
    secondary: null,
    target: "self",
    type: "Fighting",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  subduction: {
    num: 3829,
    accuracy: 90,
    basePower: 140,
    category: "Physical",
    name: "Subduction",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
	self: {
      volatileStatus: "confusion"
    },
    secondary: {
      chance: 100,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  subwoofer: {
    num: 3404,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Subwoofer",
    pp: 20,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "allAdjacentFoes",
    type: "Sound",
    contestType: "Cool"
  },
  suckerpunch: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  suddenstrike: {
    num: 3405,
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
  sugarrush: {
    num: 3406,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Sugar Rush",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  suitup: {
    num: 3527,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Suit Up",
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
  sulfuricspray: {
    num: 3407,
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
  sunbath: {
    num: 3473,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Sun Bath",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    heal: [1, 2],
    secondary: null,
    target: "self",
    type: "Light",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  sunsteelstrike: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, legendary: 1 }
  },
  supercell: {
    num: 3783,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Supercell",
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
  superembomber: {
    num: 3537,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Super EM Bomber",
    pp: 10,
    priority: 0,
    flags: { charge: 1, protect: 1, mirror: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1, beam: 1 },
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["magnetosphere"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
	onModifyType(move, pokemon, target) {
      const electricTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Steel";
      const steelTypeEffectiveness = target.runEffectiveness(move);
      move.type = "Electric";
      if (electricTypeEffectiveness === steelTypeEffectiveness) {
        if(pokemon.getTypes(false, true).includes("Steel")){
          move.type = "Steel";
        }
      } else if(steelTypeEffectiveness>electricTypeEffectiveness){
        move.type = "Steel"
      }
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Cool"
  },
  superluminalstrike: {
    num: 3408,
    accuracy: 100,
    basePower: 40,
    category: "Physical",
    name: "Superluminal Strike",
    pp: 30,
    priority: 1,
    flags: { protect: 1, mirror: 1, metronome: 1 },
    secondary: null,
    target: "normal",
    type: "Light",
    contestType: "Beautiful"
  },
  supernova: {
    num: 3409,
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
  supernovaimplosion: {
    num: 3715,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Supernova Implosion",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "cosmiumz",
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Cool"
  },
  supersonicsound: {
    num: 3410,
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
    num: 3411,
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
  supremecannon: {
    num: 3625,
    accuracy: 100,
    basePower: 95,
    category: "Special",
    name: "Supreme Cannon",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 25,
      status: "frz"
    },
    target: "allAdjacentFoes",
    type: "Ice",
    contestType: "Beautiful"
  },
  surf: {
    inherit: true,
	flags: { cprotect: 1, mirror: 1, nonsky: 1, hm: 1 },
	onBasePower(basePower, pokemon, target) {
      const weakWeathers = ["darkness"];
      if (weakWeathers.includes(pokemon.effectiveWeather())) {
        this.debug("boost by weather");
        return this.chainModify(1.5);
      }
    }
  },
  surgingstrikes: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, legendary: 1 }
  },
  survivalprotocol: {
    num: 3562,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Survival Protocol",
    pp: 10,
    priority: 0,
    flags: {failencore: 1, nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1},
    onHit(target, source, effect) {
      const moves = this.dex.moves.all().filter(move => (
        (![2, 4].includes(this.gen) || !source.moves.includes(move.id)) &&
        (!move.isNonstandard || move.isNonstandard === "Unobtainable") &&
        move.flags["heal"]
      ));
      let randomMove = "";
      if (moves.length) {
        moves.sort((a, b) => a.num - b.num);
        randomMove = this.sample(moves).id;
      }
      if (!randomMove) return false;
      source.side.lastSelectedMove = this.toID(randomMove);
      this.actions.useMove(randomMove, target);
    },
    callsMove: true,
    secondary: null,
    target: "self",
    type: "Digital",
    contestType: "Beautiful",
  },
  spectralsap: {
    num: 3412,
    accuracy: 100,
    basePower: 65,
    category: "Physical",
    name: "Spectral Sap",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    stealsBoosts: true,
    // Boost stealing implemented in scripts.js
    secondary: null,
    target: "normal",
    type: "Ghost",
    contestType: "Cool"
  },
  swarmsignal: {
    num: 3413,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Swarm Signal",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "pheromones",
    secondary: null,
    target: "all",
    type: "Bug",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  swiftcosmic: {
    num: 3414,
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
    num: 3415,
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
  symphony: {
    num: 3832,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Symphony",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, sound: 1, metronome: 1 },
    boosts: {
      atk: 1,
      spe: 1
    },
    secondary: null,
    target: "allies",
    type: "Normal",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  symphonysound: {
    num: 3833,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Symphony Sound",
    pp: 10,
    priority: 0,
    flags: { snatch: 1, sound: 1, metronome: 1 },
    boosts: {
      atk: 1,
      spe: 1
    },
    secondary: null,
    target: "allies",
    type: "Sound",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  synapticbleed: {
    num: 3741,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Synaptic Bleed",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 },
    secondary: null,
	onBasePower(basePower, source, target, move) {
      if (target.hasType("Psychic")) {
        this.debug("Synaptic Bleed vs Psychic: power doubled");
        return this.chainModify(2); // Doubles base power
      }
	},
	onHit(target, source, move) {
      if (target.hasType("Psychic") && this.randomChance(3, 10)) {
        if (target.addVolatile("flinch")) {
          this.add("-start", target, "flinch");
        }
      }
	},
    target: "normal",
    type: "Blood",
    contestType: "Tough"
  },
  synthesis: {
    num: 235,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Synthesis",
    pp: 5,
    priority: 0,
    flags: { snatch: 1, heal: 1 },
    onHit(pokemon) {
      let factor = 0.5;
      switch (pokemon.effectiveWeather()) {
        case "sunnyday":
        case "desolateland":
		case "pollenstorm":
		case "fairydust":
          factor = 0.667;
          break;
        case "raindance":
        case "primordialsea":
        case "sandstorm":
        case "hail":
        case "snow":
		case "acidrain":
		case "thunderstorm":
		case "fog":
		case "duststorm":
		case "cursedwinds":
          factor = 0.25;
          break;
		case "fallout":
		case "shadowyaura":
		case "smog":
          factor = 0.125;
          break;
		case "darkness":
		case "eclipse":
          factor = 0;
          break;
      }
      const success = !!this.heal(this.modify(pokemon.maxhp, factor));
      if (!success) {
        this.add("-fail", pokemon, "heal");
        return this.NOT_FAIL;
      }
      return success;
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  syntheticevolution: {
    num: 3721,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Synthetic Evolution",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "plastinium",
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Cool"
  },
  syntheticsurge: {
    num: 3651,
    accuracy: 100,
    basePower: 85,
    category: "Special",
    name: "Synthetic Surge",
    pp: 10,
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
    target: "normal",
    type: "Plastic",
    contestType: "Beautiful"
  },
  tachyoncutter: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, slicing: 1, legendary: 1 }
  },
  tagout: {
    num: 3474,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Tag Out",
    pp: 40,
    priority: 0,
    flags: {},
    onHit(target) {
      if (!this.canSwitch(target.side) || target.volatiles["commanded"]) {
        this.attrLastMove("[still]");
        this.add("-fail", target);
        return this.NOT_FAIL;
      }
    },
    self: {
      onHit(source) {
        source.skipBeforeSwitchOutEventFlag = true;
      }
    },
    selfSwitch: "copyvolatile",
    secondary: null,
    target: "self",
    type: "Fighting",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Cute"
  },
  taiga: {
    num: 3416,
    accuracy: 95,
    basePower: 120,
    category: "Physical",
    name: "Taiga",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    critRatio: 2,
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Cool"
  },
  tailwindwind: {
    num: 3417,
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
  takeheart: {
    inherit: true,
	flags: { snatch: 1, metronome: 1, legendary: 1 }
  },
  talongash: {
    num: 3418,
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
    num: 3419,
    accuracy: 95,
    basePower: 90,
    category: "Physical",
    name: "Tar-Tantrum",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, defrost: 1, punch: 1 },
    secondary: {
      chance: 30,
      boosts: {
        spe: -1
      }
    },
    target: "normal",
    type: "Rock",
    contestType: "Cool"
  },
  technoblast: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1, legendary: 1 }
  },
  teleport: {
    inherit: true,
	flags: { metronome: 1, magic: 1 }
  },
  tempest: {
    num: 3420,
    accuracy: 100,
    basePower: 60,
    category: "Special",
    name: "Tempest",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
	onHit(target, source) {
      // Clear weather conditions
      this.field.clearWeather();
      this.add("-weather", "none", "[from] move: Tempest", "[of]" + source.fullname);
    },
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Cool"
  },
  tendril: {
    num: 3421,
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
  terastarstorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, noassist: 1, failcopycat: 1, failmimic: 1, legendary: 1 }
  },
  terrafirm: {
    num: 3689,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Terrafirm",
    pp: 25,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      atk: 1,
      def: 1,
	  spe: -1
    },
    secondary: null,
    target: "self",
    type: "Ground",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  terraforce: {
    num: 3626,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Terra Force",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Fire",
    contestType: "Tough"
  },
  terrainpulse: {
    num: 805,
    accuracy: 100,
    basePower: 50,
    category: "Special",
    name: "Terrain Pulse",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, metronome: 1, pulse: 1 },
    onModifyType(move, pokemon) {
      if (!pokemon.isGrounded())
        return;
      switch (this.field.terrain) {
        case "snowyterrain":
          move.type = "Ice";
          break;
		case "midnightterrain":
          move.type = "Dark";
          break;
		case "shiningterrain":
          move.type = "Fire";
          break;
		case "electricterrain":
          move.type = "Electric";
          break;
        case "grassyterrain":
          move.type = "Grass";
          break;
        case "mistyterrain":
          move.type = "Fairy";
          break;
        case "psychicterrain":
          move.type = "Psychic";
          break;
      }
    },
    onModifyMove(move, pokemon) {
      if (this.field.terrain && pokemon.isGrounded()) {
        move.basePower *= 2;
        this.debug("BP doubled in Terrain");
      }
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    zMove: { basePower: 160 },
    maxMove: { basePower: 130 }
  },
  terrorize: {
    num: 3422,
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
  thicketslip: {
    num: 3690,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Thicket Slip",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      spe: 1,
      evasion: 1
    },
    secondary: null,
    target: "self",
    type: "Grass",
    zMove: { boost: { atk: 1 } },
    contestType: "Cool"
  },
  thornwhip: {
    num: 3423,
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
  thousandarrows: {
    inherit: true,
	flags: { protect: 1, mirror: 1, nonsky: 1, legendary: 1 }
  },
  thousandwaves: {
    inherit: true,
	flags: { protect: 1, mirror: 1, nonsky: 1, legendary: 1 }
  },
  thunder: {
    inherit: true,
    onModifyMove(move, pokemon, target) {
      switch (target?.effectiveWeather()) {
        case "raindance":
        case "primordialsea":
		case "acidrain":
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
  thundercage: {
    inherit: true,
	flags: { protect: 1, mirror: 1, legendary: 1 }
  },
  thundercrush: {
    num: 3425,
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
  thunderouskick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1, legendary: 1 }
  },
  thunderslash: {
    num: 3426,
    accuracy: 100,
    basePower: 95,
    category: "Physical",
    name: "Thunder Slash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, slicing: 1 },
    secondary: null,
	critRatio: 2,
    target: "normal",
    type: "Electric",
    contestType: "Cute"
  },
  thunderstorm: {
    num: 3427,
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
  thunderstruck: {
    num: 3428,
    accuracy: 90,
    basePower: 150,
    category: "Physical",
    name: "Thunderstruck",
    pp: 5,
    priority: 0,
    flags: { contact: 1, recharge: 1, protect: 1, mirror: 1 },
    self: {
      volatileStatus: "mustrecharge"
    },
    secondary: null,
    target: "normal",
    type: "Electric",
    contestType: "Tough"
  },
  tidaldragoon: {
    num: 3429,
    accuracy: 100,
    basePower: 25,
    category: "Special",
    name: "Tidal Dragoon",
    pp: 30,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    multihit: [2, 5],
    secondary: null,
    target: "normal",
    type: "Dragon",
    zMove: { basePower: 140 },
    maxMove: { basePower: 130 },
    contestType: "Cool"
  },
  tikitorch: {
    num: 3430,
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
  titanichorn: {
    num: 3691,
    accuracy: 85,
    basePower: 120,
    category: "Physical",
    name: "Titanic Horn",
    pp: 5,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  tornado: {
    num: 3431,
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
  toxibolle: {
    num: 3634,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Toxibolle",
    pp: 5,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Poison", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Water",
    contestType: "Tough"
  },
  toxifume: {
    num: 3432,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    isNonstandard: "Past",
    name: "Toxifume",
    pp: 5,
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
        // Apply the Special Attack boost on the first turn
        this.boost({ spa: 1 }, attacker, attacker, move);
        return null;
    },
    secondary: {
      chance: 100,
      status: "tox"
    },
    target: "normal",
    type: "Poison",
    contestType: "Beautiful",
  },
  toycarcrash: {
    num: 3483,
    accuracy: 90,
    basePower: 90,
    category: "Physical",
    name: "Toy-Car Crash",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, speed: 1 },
    secondary: null,
    target: "normal",
	type: "Plastic",
    contestType: "Tough"
  },
  toyhammer: {
    num: 3504,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Toy Hammer",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Plastic",
    contestType: "Tough"
  },
  transcendentsword: {
    num: 3782,
    accuracy: 100,
    basePower: 240,
    category: "Physical",
    name: "Transcendent Sword",
    pp: 1,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    onAfterHit(target, pokemon) {
      if (pokemon.hp && pokemon.removeVolatile("leechseed")) {
        this.add("-end", pokemon, "Leech Seed", "[from] move: Rapid Spin", "[of] " + pokemon);
      }
      const sideConditions = [
        "constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns",
        "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge",
        "slimetrail", "bloodsigil", "livewire", "permafrost", "safeguard", "reflect",
        "lightscreen", "auroraveil", "hotcoals"
      ];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
        }
        if (pokemon.hp && target.side.removeSideCondition(condition)) {
          this.add("-sideend", target.side, this.dex.conditions.get(condition).name, "[from] move: Transcendent Sword", "[of] " + pokemon);
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
      const sideConditions = [
        "constructionblocks", "fiesta", "spikes", "toxicspikes", "stealthrock", "hawthorns",
        "scorchedashes", "velvetscales", "salttherapy", "stickyweb", "gmaxsteelsurge",
        "slimetrail", "bloodsigil", "livewire", "permafrost", "safeguard", "reflect",
        "lightscreen", "auroraveil", "hotcoals"
      ];
      for (const condition of sideConditions) {
        if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
          this.add("-sideend", pokemon.side, this.dex.conditions.get(condition).name, "[from] move: Rapid Spin", "[of] " + pokemon);
        }
        if (pokemon.hp && target.side.removeSideCondition(condition)) {
          this.add("-sideend", target.side, this.dex.conditions.get(condition).name, "[from] move: Transcendent Sword", "[of] " + pokemon);
        }
      }
      if (pokemon.hp && pokemon.volatiles["partiallytrapped"]) {
        pokemon.removeVolatile("partiallytrapped");
      }
    },
	boosts: {
      evasion: -1
    },
    secondary: null,
    target: "normal",
    type: "Steel",
    contestType: "Cool"
  },
  tripleaxel: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  triplekick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  tropkick: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, kick: 1 }
  },
  trematerra: {
    num: 3632,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Trematerra",
    pp: 5,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Sound", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Tough"
  },
  triattack: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1 }
  },
  trickshot: {
    num: 3435,
    accuracy: 90,
    basePower: 30,
    category: "Special",
    name: "Trick Shot",
    pp: 15,
    priority: 0,
    flags: { bullet: 1, protect: 1, mirror: 1, magic: 1 },
    secondary: {
      chance: 30,
      volatileStatus: "flinch"
    },
    target: "normal",
    type: "Fairy",
    contestType: "Cool"
  },
  trojanhorse: {
    num: 3436,
    accuracy: 100,
    basePower: 40,
    basePowerCallback(pokemon, target, move) {
      if (target.beingCalledBack || target.switchFlag) {
        this.debug("Trojan Horse damage boost");
        return move.basePower * 2;
      }
      return move.basePower;
    },
    category: "Physical",
    isNonstandard: "Past",
    name: "Trojan Horse",
    pp: 20,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    beforeTurnCallback(pokemon) {
      for (const side of this.sides) {
        if (side.hasAlly(pokemon))
          continue;
        side.addSideCondition("pursuit", pokemon);
        const data = side.getSideConditionData("pursuit");
        if (!data.sources) {
          data.sources = [];
        }
        data.sources.push(pokemon);
      }
    },
    onModifyMove(move, source, target) {
      if (target?.beingCalledBack || target?.switchFlag)
        move.accuracy = true;
    },
    onTryHit(target, pokemon) {
      target.side.removeSideCondition("pursuit");
    },
    secondary: null,
    target: "normal",
    type: "Digital",
    contestType: "Clever"
  },
  turbofalata: {
    num: 3633,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Turbofalata",
    pp: 5,
    flags: { protect: 1, mirror: 1 },
    onEffectiveness(typeMod, target, type, move) {
      return typeMod + this.dex.getEffectiveness("Steel", type);
    },
    priority: 0,
    secondary: null,
    target: "normal",
    type: "Flying",
    contestType: "Tough"
  },
  twinbeam: {
    inherit: true,
	flags: { protect: 1, mirror: 1, beam: 1, magic: 1 }
  },
  twirlenade: {
    num: 3433,
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
    zMove: { effect: "clearnegativeboost" },
    contestType: "Clever"
  },
  twisterwind: {
    num: 3434,
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
  typhoon: {
    num: 3437,
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
  typhoonhook: {
    num: 3824,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Typhoon Hook",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, punch: 1 },
    secondary: {
      chance: 20,
      volatileStatus: "confusion"
    },
    target: "normal",
    type: "Wind",
    contestType: "Cute"
  },
  undegradeable: {
    num: 3495,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Undegradeable",
    pp: 10,
    priority: 4,
    flags: { noassist: 1, failcopycat: 1 },
    stallingMove: true,
    volatileStatus: "endure",
    onPrepareHit(pokemon) {
      return !!this.queue.willAct() && this.runEvent("StallMove", pokemon);
    },
    onHit(pokemon) {
      pokemon.addVolatile("stall");
    },
    secondary: null,
    target: "self",
    type: "Plastic",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Tough"
  },
  universalcutter: {
    num: 3552,
    accuracy: 100,
    basePower: 90,
    category: "Physical",
    name: "Universal Cutter",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, heal: 1, slicing: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Cosmic"
  },
  upgrade: {
    num: 3643,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Upgrade",
    pp: 20,
    priority: 0,
    flags: { snatch: 1 },
    boosts: {
      atk: 2
    },
    secondary: null,
    target: "self",
    type: "Digital",
    zMove: { effect: "clearnegativeboost" },
    contestType: "Beautiful"
  },
  upheaval: {
    num: 3692,
    accuracy: 80,
    basePower: 120,
    category: "Special",
    name: "Upheaval",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    self: {
      boosts: {
        spa: -2
      }
    },
    secondary: null,
    target: "normal",
    type: "Ground",
    contestType: "Beautiful"
  },
  uproarsound: {
    num: 3459,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Uproar Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1, nosleeptalk: 1, failinstruct: 1 },
    self: {
      volatileStatus: "uproar"
    },
    onTryHit(target) {
      const activeTeam = target.side.activeTeam();
      const foeActiveTeam = target.side.foe.activeTeam();
      for (const [i, allyActive] of activeTeam.entries()) {
        if (allyActive && allyActive.status === "slp")
          allyActive.cureStatus();
        const foeActive = foeActiveTeam[i];
        if (foeActive && foeActive.status === "slp")
          foeActive.cureStatus();
      }
    },
    secondary: null,
    target: "randomNormal",
    type: "Sound",
    contestType: "Cute"
  },
  uraniumheatbeam: {
    num: 3546,
    accuracy: 85,
    basePower: 110,
    category: "Special",
    name: "Uranium Heat Beam",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 10,
      status: "brn"
    },
    target: "normal",
    type: "Nuclear",
    contestType: "Beautiful"
  },
  usbwhip: {
    num: 3642,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "USB Whip",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1 },
    recoil: [33, 100],
    secondary: null,
    target: "normal",
    type: "Digital"
  },
  uvray: {
    num: 3438,
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
    num: 3439,
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
    zMove: { effect: "crit2" },
    contestType: "Cool"
  },
  vcreate: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, legendary: 1 }
  },
  veiledsky: {
    num: 3440,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Veiled Sky",
    pp: 5,
    priority: 0,
    flags: {},
    weather: "eclipse",
    secondary: null,
    target: "all",
    type: "Dark",
    zMove: { boost: { spe: 1 } },
    contestType: "Beautiful"
  },
  veilofoblivion: {
    num: 3723,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Veil of Oblivion",
    pp: 1,
    priority: 0,
    flags: {},
    isZ: "shadiumz",
    secondary: null,
    target: "normal",
    type: "Shadow",
    contestType: "Cool"
  },
  velvetscales: {
    num: 3441,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Velvet Scales",
    pp: 20,
    priority: 0,
    flags: { reflectable: 1 },
    sideCondition: "velvetscales",
    condition: {
      onSideStart(side) {
        this.add("-sidestart", side, "move: Velvet Scales");
      },
      onEntryHazard(pokemon) {
        if (!pokemon.isGrounded() || pokemon.hasItem("heavydutyboots"))
          return;
        this.add("-activate", pokemon, "move: Velvet Scales");
        this.boost({ def: -1, spd: -1 }, pokemon, this.effectState.source, this.dex.getActiveMove("velvetscales"));
      }
    },
    secondary: null,
    target: "foeSide",
    type: "Dragon",
    zMove: { boost: { atk: 1 } },
    contestType: "Tough"
  },
  venomswipe: {
    num: 3442,
    accuracy: 90,
    basePower: 100,
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
  vexation: {
    num: 3714,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "Vexation",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, reflectable: 1, mirror: 1, magic: 1 },
    status: "fbt",
    secondary: null,
    target: "normal",
    type: "ice",
    zMove: { boost: { atk: 1 } },
    contestType: "Beautiful"
  },
  virugait: {
    num: 3443,
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
  virusskater: {
    num: 3627,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Virus Skater",
    pp: 10,
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
  virusskaterdigital: {
    num: 3628,
    accuracy: 100,
    basePower: 70,
    category: "Physical",
    name: "Virus Skater Digital",
    pp: 10,
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
    type: "Digital",
    contestType: "Cool"
  },
  viscosityslam: {
    num: 3444,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Viscosity Slam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 100,
      onHit(target, source, move) {
        if (source.isActive)
          target.addVolatile("trapped", source, move, "trapper");
      }
    },
    target: "normal",
    type: "Slime",
    contestType: "Tough"
  },
  viscousmimicry: {
    num: 3772,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Viscous Mimicry",
    pp: 10,
    priority: 0,
    flags: { bypasssub: 1, allyanim: 1, metronome: 1 },
    onHit(target, source) {
      let i;
      for (i in target.boosts) {
        source.boosts[i] = target.boosts[i];
      }
      const volatilesToCopy = ["focusenergy", "gmaxchistrike", "laserfocus"];
      for (const volatile of volatilesToCopy) {
        if (target.volatiles[volatile]) {
          source.addVolatile(volatile);
          if (volatile === "gmaxchistrike")
            source.volatiles[volatile].layers = target.volatiles[volatile].layers;
        } else {
          source.removeVolatile(volatile);
        }
      }
      this.add("-copyboost", source, target, "[from] move: Viscous Mimicry");
    },
    secondary: null,
    target: "normal",
    type: "Slime",
    zMove: { effect: "heal" },
    contestType: "Clever"
  },
  voidstar: {
    num: 3445,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Void Star",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, heal: 1 },
    drain: [1, 2],
    secondary: null,
    target: "normal",
    type: "Ice",
    contestType: "Clever"
  },
  vulcanshammer: {
    num: 3629,
    accuracy: 100,
    basePower: 100,
    category: "Physical",
    name: "Vulcan's Hammer",
    pp: 5,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    secondary: {
      chance: 30,
      status: "brn"
    },
    target: "normal",
    type: "Rock"
  },
  warble: {
    num: 3693,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Warble",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    boosts: {
      spd: -1
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Flying",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  warblesound: {
    num: 3694,
    accuracy: 100,
    basePower: 0,
    category: "Status",
    name: "Warble Sound",
    pp: 40,
    priority: 0,
    flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1 },
    boosts: {
      spd: -1
    },
    secondary: null,
    target: "allAdjacentFoes",
    type: "Sound",
    zMove: { boost: { def: 1 } },
    contestType: "Cute"
  },
  waterfall: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, hm: 1 }
  },
  watershuriken: {
    inherit: true,
	flags: { protect: 1, mirror: 1, speed: 1 }
  },
  wavedash: {
    num: 3516,
    accuracy: true,
    basePower: 0,
    category: "Status",
    name: "Wavedash",
    pp: 15,
    priority: 0,
    flags: { snatch: 1, wind: 1 },
    sideCondition: "tailwind",
    secondary: null,
    target: "allySide",
    type: "Digital",
    zMove: { effect: "crit2" },
    contestType: "Cool"
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
		case "pollenstorm":
          move.type = "Grass";
          break;
		case "duststorm":
          move.type = "Ground";
          break;
        case "pheromones":
          move.type = "Bug";
          break;
		case "sandstorm":
          move.type = "Rock";
          break;
        case "battleaura":
          move.type = "Fighting";
          break;
		case "hail":
        case "snow":
          move.type = "Ice";
          break;
		case "darkness":
		case "eclipse":
          move.type = "Dark";
          break;
		case "cursedwinds":
          move.type = "Ghost";
          break;
		case "psychicfield":
          move.type = "Psychic";
          break;
		case "acidrain":
		case "smog":
          move.type = "Poison";
          break;
		case "dragonforce":
          move.type = "Dragon";
          break;
		case "magnetosphere":
          move.type = "Steel";
          break;
		case "fairydust":
          move.type = "Fairy";
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
        case "pollenstorm":
          move.basePower *= 2;
          break;
		case "duststorm":
          move.basePower *= 2;
          break;
		case "pheromones":
          move.basePower *= 2;
          break;
		case "sandstorm":
          move.basePower *= 2;
          break;
        case "battleaura":
          move.basePower *= 2;
          break;
		case "hail":
        case "snow":
          move.basePower *= 2;
          break;
		case "darkness":
		case "eclipse":
          move.basePower *= 2;
          break;
		case "cursedwinds":
          move.basePower *= 2;
          break;
		case "psychicfield":
          move.basePower *= 2;
          break;
		case "acidrain":
		case "smog":
          move.basePower *= 2;
          break;
		case "dragonforce":
          move.basePower *= 2;
          break;
		case "magnetosphere":
          move.basePower *= 2;
          break;
		case "fairydust":
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
    num: 3446,
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
  webwrecker: {
    num: 3630,
    accuracy: 100,
    basePower: 120,
    category: "Special",
    name: "Web Wrecker",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, nonsky: 1 },
    secondary: null,
    target: "allAdjacent",
    type: "Dark",
    contestType: "Tough"
  },
  weepywail: {
    num: 3447,
    accuracy: 100,
    basePower: 80,
    category: "Special",
    name: "Weepy Wail",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      chance: 100,
      boosts: {
        spa: -1
      }
    },
    target: "normal",
    type: "Water",
    contestType: "Cute"
  },
  whispersbeyondtheveil: {
    num: 3718,
    accuracy: true,
    basePower: 1,
    category: "Physical",
    isNonstandard: "Past",
    name: "Whispers Beyond the Veil",
    pp: 1,
    priority: 0,
    flags: { magic: 1 },
    isZ: "eldriumz",
    secondary: null,
    target: "normal",
    type: "Eldritch",
    contestType: "Cool"
  },
  whirlpool: {
    inherit: true,
	flags: { protect: 1, mirror: 1, hm: 1 }
  },
  whirlwindwind: {
    num: 3448,
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
  whiteout: {
    num: 3786,
    accuracy: 85,
    basePower: 90,
    category: "Physical",
    name: "Whiteout",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, contact: 1 },
    weather: "Hail",
    status: "fbt",
    secondary: null,
    target: "allAdjacent",
    type: "Ice",
    contestType: "Beautiful"
  },
  whitewand: {
    num: 3785,
    accuracy: 85,
    basePower: 0,
    category: "Status",
    name: "White Wand",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, reflectable: 1, mirror: 1, magic: 1 },
    status: "fbt",
    secondary: null,
    target: "normal",
    type: "ice",
    zMove: { boost: { atk: 1 } },
    contestType: "Beautiful"
  },
  wickedblow: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, punch: 1, legendary: 1 }
  },
  wickedlash: {
    num: 3449,
    accuracy: 100,
    basePower: 110,
    category: "Physical",
    name: "Wicked Lash",
    pp: 10,
    priority: 0,
    flags: { contact: 1, charge: 1, protect: 1, mirror: 1, slicing: 1, nosleeptalk: 1, failinstruct: 1, magic: 1 },
	critRatio: 2,
    onTryMove(attacker, defender, move) {
      if (attacker.removeVolatile(move.id)) {
        return;
      }
      this.add("-prepare", attacker, move.name);
      if (["darkness", "eclipse"].includes(attacker.effectiveWeather())) {
        this.attrLastMove("[still]");
        this.addMove("-anim", attacker, move.name, defender);
        return;
      }
      if (!this.runEvent("ChargeMove", attacker, defender, move)) {
        return;
      }
      attacker.addVolatile("twoturnmove", defender);
      return null;
    },
    secondary: null,
    target: "normal",
    type: "Dark",
    contestType: "Cool"
  },
  wildboltstorm: {
    inherit: true,
	flags: { protect: 1, mirror: 1, metronome: 1, wind: 1, legendary: 1 }
  },
  wilddance: {
    num: 3450,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Wild Dance",
    pp: 10,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failinstruct: 1, sound: 1 },
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
    type: "Sound",
    contestType: "Cool"
  },
  wildfirefakemon: {
    num: 3787,
    accuracy: 85,
    basePower: 90,
    category: "Special",
    name: "Wildfire Fakemon",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1 },
    weather: "Sunnyday",
    status: "brn",
    secondary: null,
    target: "allAdjacent",
    type: "Fire",
    contestType: "Beautiful"
  },
  wildroar: {
    num: 3451,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Wild Roar",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Normal",
    contestType: "Cool"
  },
  wildroarsound: {
    num: 3452,
    accuracy: 90,
    basePower: 100,
    category: "Special",
    name: "Wild Roar Sound",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, sound: 1, bypasssub: 1 },
    secondary: {
      chance: 100,
      boosts: {
        atk: -1
      }
    },
    target: "normal",
    type: "Sound",
    contestType: "Cool"
  },
  willowisp: {
    inherit: true,
	flags: { protect: 1, reflectable: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  windshear: {
    num: 3453,
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
    num: 3454,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "wormhole",
    pp: 30,
    priority: 1,
    flags: { speed: 1, legendary: 1 },
    secondary: null,
    target: "normal",
    type: "Psychic",
    contestType: "Beautiful"
  },
  wormholecosmic: {
    num: 3455,
    accuracy: 100,
    basePower: 40,
    category: "Special",
    name: "wormhole Cosmic",
    pp: 30,
    priority: 1,
    flags: { speed: 1, legendary: 1 },
    secondary: null,
    target: "normal",
    type: "Cosmic",
    contestType: "Beautiful"
  },
  yoink: {
    num: 3657,
    accuracy: 100,
    basePower: 60,
    category: "Physical",
    name: "Yoink",
    pp: 25,
    priority: 0,
    flags: { contact: 1, protect: 1, mirror: 1, failmefirst: 1, noassist: 1, failcopycat: 1 },
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
      this.add("-enditem", target, yourItem, "[silent]", "[from] move: Yoink", "[of] " + source);
      this.add("-item", source, yourItem, "[from] move: Yoink", "[of] " + target);
    },
    secondary: null,
    target: "normal",
    type: "Sound",
    contestType: "Tough"
  },
  yuckytongue: {
    num: 3631,
    accuracy: 100,
    basePower: 80,
    category: "Physical",
    name: "Yucky Tongue",
    pp: 15,
    priority: 0,
    flags: { contact: 1, protect: 1, metronome: 1 },
    secondary: {
      chance: 45,
      status: "par"
    },
    target: "normal",
    type: "Dark",
    contestType: "Cute"
  },
  zenheadbutt: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, magic: 1 }
  },
  zenithbreak: {
    num: 3456,
    accuracy: 100,
    basePower: 120,
    category: "Physical",
    name: "Zenith Break",
    pp: 5,
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
  zippyzap: {
    inherit: true,
	flags: { contact: 1, protect: 1, mirror: 1, speed: 1 }
  },
  zombiestrike: {
    num: 3457,
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

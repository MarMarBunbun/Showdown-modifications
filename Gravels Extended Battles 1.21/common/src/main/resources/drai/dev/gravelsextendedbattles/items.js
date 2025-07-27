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
var items_exports = {};
__export(items_exports, {
  Items: () => Items
});
module.exports = __toCommonJS(items_exports);
const Items = {
  abomasite: {
    name: "Abomasite",
    spritenum: 575,
    megaStone: "Abomasnow-Mega",
    megaEvolves: "Abomasnow",
    itemUser: ["Abomasnow"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 674,
    gen: 6,
    isNonstandard: "Past"
  },
  absolite: {
    name: "Absolite",
    spritenum: 576,
    megaStone: "Absol-Mega",
    megaEvolves: "Absol",
    itemUser: ["Absol"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 677,
    gen: 6,
    isNonstandard: "Past"
  },
  aerodactylite: {
    name: "Aerodactylite",
    spritenum: 577,
    megaStone: "Aerodactyl-Mega",
    megaEvolves: "Aerodactyl",
    itemUser: ["Aerodactyl"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 672,
    gen: 6,
    isNonstandard: "Past"
  },
  aggronite: {
    name: "Aggronite",
    spritenum: 578,
    megaStone: "Aggron-Mega",
    megaEvolves: "Aggron",
    itemUser: ["Aggron"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 667,
    gen: 6,
    isNonstandard: "Past"
  },
  alakazite: {
    name: "Alakazite",
    spritenum: 579,
    megaStone: "Alakazam-Mega",
    megaEvolves: "Alakazam",
    itemUser: ["Alakazam"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 679,
    gen: 6,
    isNonstandard: "Past"
  },
  altarianite: {
    name: "Altarianite",
    spritenum: 615,
    megaStone: "Altaria-Mega",
    megaEvolves: "Altaria",
    itemUser: ["Altaria"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 755,
    gen: 6,
    isNonstandard: "Past"
  },
  ampharosite: {
    name: "Ampharosite",
    spritenum: 580,
    megaStone: "Ampharos-Mega",
    megaEvolves: "Ampharos",
    itemUser: ["Ampharos"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 658,
    gen: 6,
    isNonstandard: "Past"
  },
  amplifier: {
    name: "Amplifier",
    spritenum: 3143,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Sound") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3143,
    gen: 2
  },
  analysismap: {
    name: "Analysis Map",
    fling: {
      basePower: 0
    },
    spritenum: 3016,
    onModifyAtk(atk, user) {
      if (user.species.name === "Terubim") {
        return this.chainModify(2);
      }
	},
    itemUser: ["Terubim"],
    num: 3016,
    gen: 8,
    isNonstandard: "Past"
  },
  arkhaniumz: {
    name: "Arkhanium Z",
    spritenum: 3159,
    onTakeItem: false,
    zMove: "Biggest Bang",
    zMoveFrom: "Big Bang",
    itemUser: ["Arkhaos"],
    num: 3159,
    gen: 7,
    isNonstandard: "Past"
  },
  audinite: {
    name: "Audinite",
    spritenum: 617,
    megaStone: "Audino-Mega",
    megaEvolves: "Audino",
    itemUser: ["Audino"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 757,
    gen: 6,
    isNonstandard: "Past"
  },
  avocaberry: {
    name: "Avoca Berry",
    spritenum: 3155,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Sound"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Sound" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3155,
    gen: 4
  },
  banettite: {
    name: "Banettite",
    spritenum: 582,
    megaStone: "Banette-Mega",
    megaEvolves: "Banette",
    itemUser: ["Banette"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 668,
    gen: 6,
    isNonstandard: "Past"
  },
  bassbooster: {
    name: "Bass Booster",
    spritenum: 3160,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["Sound"]) {
        this.debug("Bass Booster boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3160,
    gen: 9
  },
  bassplate: {
    name: "Bass Plate",
    spritenum: 3105,
    onPlate: "Sound",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Sound") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Sound",
    num: 3105,
    gen: 4
  },
  beedrillite: {
    name: "Beedrillite",
    spritenum: 628,
    megaStone: "Beedrill-Mega",
    megaEvolves: "Beedrill",
    itemUser: ["Beedrill"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 770,
    gen: 6,
    isNonstandard: "Past"
  },
  benasiberry: {
    name: "Benasi Berry",
    spritenum: 3156,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Wind"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Wind" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3156,
    gen: 4
  },
  binaryplate: {
    name: "Binary Plate",
    spritenum: 3100,
    onPlate: "Digital",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Digital") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Digital",
    num: 3100,
    gen: 4
  },
  blastoisinite: {
    name: "Blastoisinite",
    spritenum: 583,
    megaStone: "Blastoise-Mega",
    megaEvolves: "Blastoise",
    itemUser: ["Blastoise"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 661,
    gen: 6,
    isNonstandard: "Past"
  },
  blazikenite: {
    name: "Blazikenite",
    spritenum: 584,
    megaStone: "Blaziken-Mega",
    megaEvolves: "Blaziken",
    itemUser: ["Blaziken"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 664,
    gen: 6,
    isNonstandard: "Past"
  },
  blooderaser: {
    name: "Blood Eraser",
    spritenum: 3208,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Blood")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.bloodEraserOriginalTypes = types;
        pokemon.itemData.bloodEraserActivated = false;
        const newTypes = types.filter(t => t !== "Blood");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Blood Eraser");
            pokemon.itemData.bloodEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.bloodEraserOriginalTypes &&
        !pokemon.itemData.bloodEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Blood Eraser");
          pokemon.itemData.bloodEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.bloodEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Blood Eraser");
        }
        const originalTypes = pokemon.itemData.bloodEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.bloodEraserOriginalTypes;
        delete pokemon.itemData.bloodEraserActivated;
      }
    },
    num: 3208,
    gen: 9
  },
  bloodgem: {
    name: "Blood Gem",
    spritenum: 3121,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Blood" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3121,
    gen: 5,
    isNonstandard: "Past"
  },
  bloodmemory: {
    name: "Blood Memory",
    spritenum: 3134,
    onMemory: "Blood",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Blood",
    itemUser: ["Silvally-Blood"],
    num: 3134,
    gen: 7,
    isNonstandard: "Past"
  },
  bloodiumz: {
    name: "Bloodium Z",
    spritenum: 3095,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Blood",
    onPlate: "Blood",
    forcedForme: "Arceus-Blood",
    num: 3095,
    gen: 7,
    isNonstandard: "Past"
  },
  blunderbuss: {
    name: "Blunderbuss",
    spritenum: 3163,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bullet"]) {
        this.debug("Blunderbuss boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["bullet"])
        delete move.flags["contact"];
    },
    num: 3163,
    gen: 9
  },
  boltorb: {
    name: "Bolt Orb",
    spritenum: 3000,
    fling: {
      basePower: 30,
      status: "par"
    },
    onResidualOrder: 28,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      pokemon.trySetStatus("par", pokemon);
    },
    num: 3000,
    gen: 4
  },
  bookofsins: {
    name: "Book of Sins",
    spritenum: 3146,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Blood") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3146,
    gen: 2
  },
  boostedcapacitor: {
    name: "Boosted Capacitor",
    spritenum: 3165,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["beam"]) {
        this.debug("Boosted Capacitor boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3165,
    gen: 9
  },
  boosterengines: {
    name: "Booster Engines",
    spritenum: 3164,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["speed"]) {
        this.debug("Booster Engines boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3164,
    gen: 9
  },
  bugeraser: {
    name: "Bug Eraser",
    spritenum: 3179,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Bug")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.bugEraserOriginalTypes = types;
        pokemon.itemData.bugEraserActivated = false;
        const newTypes = types.filter(t => t !== "Bug");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Bug Eraser");
            pokemon.itemData.bugEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.bugEraserOriginalTypes &&
        !pokemon.itemData.bugEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Bug Eraser");
          pokemon.itemData.bugEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.bugEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Bug Eraser");
        }
        const originalTypes = pokemon.itemData.bugEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.bugEraserOriginalTypes;
        delete pokemon.itemData.bugEraserActivated;
      }
    },
    num: 3179,
    gen: 9
  },
  cameruptite: {
    name: "Cameruptite",
    spritenum: 625,
    megaStone: "Camerupt-Mega",
    megaEvolves: "Camerupt",
    itemUser: ["Camerupt"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 767,
    gen: 6,
    isNonstandard: "Past"
  },
  carababerry: {
    name: "Caraba Berry",
    spritenum: 3152,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Light"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Light" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3152,
    gen: 4
  },
  charizarditex: {
    name: "Charizardite X",
    spritenum: 585,
    megaStone: "Charizard-Mega-X",
    megaEvolves: "Charizard",
    itemUser: ["Charizard"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 660,
    gen: 6,
    isNonstandard: "Past"
  },
  charizarditey: {
    name: "Charizardite Y",
    spritenum: 586,
    megaStone: "Charizard-Mega-Y",
    megaEvolves: "Charizard",
    itemUser: ["Charizard"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 678,
    gen: 6,
    isNonstandard: "Past"
  },
  chuvaberry: {
    name: "Chuva Berry",
    spritenum: 3157,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Eldritch"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Eldritch" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3157,
    gen: 4
  },
  clouddust: {
    name: "Cloud dust",
    fling: {
      basePower: 10
    },
    spritenum: 3001,
    onSwitchIn(pokemon) {
      this.effectState.switchingIn = true;
    },
    onStart(pokemon) {
      if (this.effectState.switchingIn) {
        this.add("-item", pokemon, "Cloud Dust");
        this.effectState.switchingIn = false;
      }
      this.eachEvent("WeatherChange", this.effect);
    },
    onEnd(pokemon) {
      this.eachEvent("WeatherChange", this.effect);
    },
    suppressWeather: true,
    num: 3001,
    gen: 9,
    isNonstandard: "Past"
  },
  cosmiceraser: {
    name: "Cosmic Eraser",
    spritenum: 3198,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Cosmic")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.cosmicEraserOriginalTypes = types;
        pokemon.itemData.cosmicEraserActivated = false;
        const newTypes = types.filter(t => t !== "Cosmic");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Cosmic Eraser");
            pokemon.itemData.cosmicEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.cosmicEraserOriginalTypes &&
        !pokemon.itemData.cosmicEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Cosmic Eraser");
          pokemon.itemData.cosmicEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.cosmicEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Cosmic Eraser");
        }
        const originalTypes = pokemon.itemData.cosmicEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.cosmicEraserOriginalTypes;
        delete pokemon.itemData.cosmicEraserActivated;
      }
    },
    num: 3198,
    gen: 9
  },
  cosmicgem: {
    name: "Cosmic Gem",
    spritenum: 3111,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Cosmic" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3111,
    gen: 5,
    isNonstandard: "Past"
  },
  cosmicmemory: {
    name: "Cosmic Memory",
    spritenum: 3124,
    onMemory: "Cosmic",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Cosmic",
    itemUser: ["Silvally-Cosmic"],
    num: 3124,
    gen: 7,
    isNonstandard: "Past"
  },
  cosmiumz: {
    name: "Cosmium Z",
    spritenum: 3083,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Cosmic",
	onPlate: "Cosmic",
    forcedForme: "Arceus-Cosmic",
    num: 3083,
    gen: 7,
    isNonstandard: "Past"
  },
  corruptedseed: {
    name: "Corrupted Seed",
    spritenum: 3002,
    fling: {
      basePower: 30
    },
    onSourceTryHeal(damage, target, source, effect) {
      this.debug("Heal is occurring: " + target + " <- " + source + " :: " + effect.id);
      const canOoze = ["drain", "leechseed", "strengthsap"];
      if (canOoze.includes(effect.id)) {
        this.damage(damage);
        return 0;
      }
    },
    num: 3002,
    gen: 2
  },
  crystaleraser: {
    name: "Crystal Eraser",
    spritenum: 3199,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Crystal")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.crystalEraserOriginalTypes = types;
        pokemon.itemData.crystalEraserActivated = false;
        const newTypes = types.filter(t => t !== "Crystal");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Crystal Eraser");
            pokemon.itemData.crystalEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.crystalEraserOriginalTypes &&
        !pokemon.itemData.crystalEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Crystal Eraser");
          pokemon.itemData.crystalEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.crystalEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Crystal Eraser");
        }
        const originalTypes = pokemon.itemData.crystalEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.crystalEraserOriginalTypes;
        delete pokemon.itemData.crystalEraserActivated;
      }
    },
    num: 3199,
    gen: 9
  },
  crystalgem: {
    name: "Crystal Gem",
    spritenum: 3112,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Crystal" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3112,
    gen: 5,
    isNonstandard: "Past"
  },
  crystaliumz: {
    name: "Crystalium Z",
    spritenum: 3084,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Crystal",
	onPlate: "Crystal",
    forcedForme: "Arceus-Crystal",
    num: 3084,
    gen: 7,
    isNonstandard: "Past"
  },
  crystalmemory: {
    name: "Crystal Memory",
    spritenum: 3125,
    onMemory: "Crystal",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Crystal",
    itemUser: ["Silvally-Crystal"],
    num: 3125,
    gen: 7,
    isNonstandard: "Past"
  },
  larimarplate: {
    name: "Larimar Plate",
    spritenum: 3099,
    onPlate: "Crystal",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Crystal") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Crystal",
    num: 3099,
    gen: 4
  },
  cursedsash: {
    name: "Cursed Sash",
    spritenum: 3018,
    fling: {
      basePower: 10
    },
    onDamagePriority: -40,
    onDamage(damage, target, source, effect) {
      if (target.hp === target.maxhp) {
        this.add("-activate", target, "item: Cursed Sash");
        this.boost({ def: -2, spd: -2 }, target);
        target.useItem();
        return 0;
      }
	},
    num: 3018,
    gen: 4
  },
  cycloneplate: {
    name: "Cyclone Plate",
    spritenum: 3106,
    onPlate: "Wind",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Wind") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Wind",
    num: 3106,
    gen: 4
  },
  darkeraser: {
    name: "Dark Eraser",
    spritenum: 3181,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Dark')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.darkEraserOriginalTypes = types;
        pokemon.itemData.darkEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Dark');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Dark Eraser');
            pokemon.itemData.darkEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.darkEraserOriginalTypes &&
        !pokemon.itemData.darkEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Dark Eraser');
          pokemon.itemData.darkEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.darkEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Dark Eraser');
        }
        const originalTypes = pokemon.itemData.darkEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.darkEraserOriginalTypes;
        delete pokemon.itemData.darkEraserActivated;
      }
    },
    num: 3181,
    gen: 9
  },
  darkrock: {
    name: "Dark Rock",
    spritenum: 3003,
    fling: {
      basePower: 60
    },
    num: 3003,
    gen: 4
  },
  deltavolcaronaarmor: {
    name: "Delta Volcarona Armor",
    spritenum: 3026,
    onTakeItem(item, pokemon, source) {
      if (pokemon.baseSpecies.num === 637 && pokemon.species.name === "Volcarona-Delta-Armored") {
        // Revert to "Volcarona-Delta" if item is removed from "Volcarona-Delta-Armored"
        pokemon.formeChange("Volcarona-Delta", item, true);
        this.add('-formechange', pokemon, 'Volcarona-Delta');
        return true;
      }
      return false;
	},
    forcedForme: "Volcarona-Delta-Armored",
    itemUser: ["Volcarona-Delta-Armored"],
    num: 3026,
    gen: 8
  },
  diancite: {
    name: "Diancite",
    spritenum: 624,
    megaStone: "Diancie-Mega",
    megaEvolves: "Diancie",
    itemUser: ["Diancie"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 764,
    gen: 6,
    isNonstandard: "Past"
  },
  digitaleraser: {
    name: "Digital Eraser",
    spritenum: 3200,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Digital")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.digitalEraserOriginalTypes = types;
        pokemon.itemData.digitalEraserActivated = false;
        const newTypes = types.filter(t => t !== "Digital");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Digital Eraser");
            pokemon.itemData.digitalEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.digitalEraserOriginalTypes &&
        !pokemon.itemData.digitalEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Digital Eraser");
          pokemon.itemData.digitalEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.digitalEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Digital Eraser");
        }
        const originalTypes = pokemon.itemData.digitalEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.digitalEraserOriginalTypes;
        delete pokemon.itemData.digitalEraserActivated;
      }
    },
    num: 3200,
    gen: 9
  },
  digitalgem: {
    name: "Digital Gem",
    spritenum: 3113,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Digital" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3113,
    gen: 5,
    isNonstandard: "Past"
  },
  digitalmemory: {
    name: "Digital Memory",
    spritenum: 3126,
    onMemory: "Digital",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Digital",
    itemUser: ["Silvally-Digital"],
    num: 3126,
    gen: 7,
    isNonstandard: "Past"
  },
  digiumz: {
    name: "Digium Z",
    spritenum: 3085,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Digital",
	onPlate: "Digital",
    forcedForme: "Arceus-Digital",
    num: 3085,
    gen: 7,
    isNonstandard: "Past"
  },
  dragoneraser: {
    name: "Dragon Eraser",
    spritenum: 3182,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Dragon')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.dragonEraserOriginalTypes = types;
        pokemon.itemData.dragonEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Dragon');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Dragon Eraser');
            pokemon.itemData.dragonEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.dragonEraserOriginalTypes &&
        !pokemon.itemData.dragonEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Dragon Eraser');
          pokemon.itemData.dragonEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.dragonEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Dragon Eraser');
        }
        const originalTypes = pokemon.itemData.dragonEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.dragonEraserOriginalTypes;
        delete pokemon.itemData.dragonEraserActivated;
      }
    },
    num: 3182,
    gen: 9
  },
  drashberry: {
    name: "Drash Berry",
    spritenum: 3149,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Questionmark"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Questionmark" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3149,
    gen: 4
  },
  earmuffs: {
    name: "Earmuffs",
    spritenum: 3176,
    fling: {
      basePower: 10
    },
	onSourceBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"] || move.type === "Sound") {
        return this.chainModify(0.5);
      }
    },
    num: 3176,
    gen: 9
  },
  eldriumz: {
    name: "Eldrium Z",
    spritenum: 3086,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Eldritch",
	onPlate: "Eldritch",
    forcedForme: "Arceus-Eldritch",
    num: 3086,
    gen: 7,
    isNonstandard: "Past"
  },
  eldritcheraser: {
    name: "Eldritch Eraser",
    spritenum: 3207,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Eldritch")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.eldritchEraserOriginalTypes = types;
        pokemon.itemData.eldritchEraserActivated = false;
        const newTypes = types.filter(t => t !== "Eldritch");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Eldritch Eraser");
            pokemon.itemData.eldritchEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.eldritchEraserOriginalTypes &&
        !pokemon.itemData.eldritchEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Eldritch Eraser");
          pokemon.itemData.eldritchEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.eldritchEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Eldritch Eraser");
        }
        const originalTypes = pokemon.itemData.eldritchEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.eldritchEraserOriginalTypes;
        delete pokemon.itemData.eldritchEraserActivated;
      }
    },
    num: 3207,
    gen: 9
  },
  eldritchgem: {
    name: "Eldritch Gem",
    spritenum: 3120,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Eldritch" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3120,
    gen: 5,
    isNonstandard: "Past"
  },
  eldritchmemory: {
    name: "Eldritch Memory",
    spritenum: 3133,
    onMemory: "Eldritch",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Eldritch",
    itemUser: ["Silvally-Eldritch"],
    num: 3133,
    gen: 7,
    isNonstandard: "Past"
  },
  electriceraser: {
    name: "Electric Eraser",
    spritenum: 3183,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Electric')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.electricEraserOriginalTypes = types;
        pokemon.itemData.electricEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Electric');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Electric Eraser');
            pokemon.itemData.electricEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.electricEraserOriginalTypes &&
        !pokemon.itemData.electricEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Electric Eraser');
          pokemon.itemData.electricEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.electricEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Electric Eraser');
        }
        const originalTypes = pokemon.itemData.electricEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.electricEraserOriginalTypes;
        delete pokemon.itemData.electricEraserActivated;
      }
    },
    num: 3183,
    gen: 9
  },
  energychannelizer: {
    name: "Energy Channelizer",
    spritenum: 3169,
    fling: {
      basePower: 60
    },
    num: 3169,
    gen: 4
  },
  ereader: {
    name: "E-Reader",
    spritenum: 3138,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Digital") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3138,
    gen: 2
  },
  everlite: {
    name: "EVerlite",
    spritenum: 3004,
    fling: {
      basePower: 40
    },
    onModifyDefPriority: 2,
    onModifyDef(def, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    num: 3004,
    gen: 5
  },
  fairyeraser: {
    name: "Fairy Eraser",
    spritenum: 3184,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Fairy')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fairyEraserOriginalTypes = types;
        pokemon.itemData.fairyEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Fairy');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Fairy Eraser');
            pokemon.itemData.fairyEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fairyEraserOriginalTypes &&
        !pokemon.itemData.fairyEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Fairy Eraser');
          pokemon.itemData.fairyEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fairyEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Fairy Eraser');
        }
        const originalTypes = pokemon.itemData.fairyEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.fairyEraserOriginalTypes;
        delete pokemon.itemData.fairyEraserActivated;
      }
    },
    num: 3184,
    gen: 9
  },
  fightingeraser: {
    name: "Fighting Eraser",
    spritenum: 3185,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Fighting')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fightingEraserOriginalTypes = types;
        pokemon.itemData.fightingEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Fighting');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Fighting Eraser');
            pokemon.itemData.fightingEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fightingEraserOriginalTypes &&
        !pokemon.itemData.fightingEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Fighting Eraser');
          pokemon.itemData.fightingEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fightingEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Fighting Eraser');
        }
        const originalTypes = pokemon.itemData.fightingEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.fightingEraserOriginalTypes;
        delete pokemon.itemData.fightingEraserActivated;
      }
    },
    num: 3185,
    gen: 9
  },
  fireeraser: {
    name: "Fire Eraser",
    spritenum: 3186,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Fire')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.fireEraserOriginalTypes = types;
        pokemon.itemData.fireEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Fire');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Fire Eraser');
            pokemon.itemData.fireEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.fireEraserOriginalTypes &&
        !pokemon.itemData.fireEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Fire Eraser');
          pokemon.itemData.fireEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.fireEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Fire Eraser');
        }
        const originalTypes = pokemon.itemData.fireEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.fireEraserOriginalTypes;
        delete pokemon.itemData.fireEraserActivated;
      }
    },
    num: 3186,
    gen: 9
  },
  fissionplate: {
    name: "Fission Plate",
    spritenum: 3102,
    onPlate: "Nuclear",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Nuclear") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Nuclear",
    num: 3102,
    gen: 4
  },
  flygonarmor: {
    name: "Flygon Armor",
    spritenum: 3023,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 330 || pokemon.baseSpecies.num === 330) {
        return false;
      }
      return true;
    },
    forcedForme: "Flygon-Armored",
    itemUser: ["Flygon-Armored"],
    num: 3023,
    gen: 8
  },
  flyingeraser: {
    name: "Flying Eraser",
    spritenum: 3187,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Flying')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.flyingEraserOriginalTypes = types;
        pokemon.itemData.flyingEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Flying');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Flying Eraser');
            pokemon.itemData.flyingEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.flyingEraserOriginalTypes &&
        !pokemon.itemData.flyingEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Flying Eraser');
          pokemon.itemData.flyingEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.flyingEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Flying Eraser');
        }
        const originalTypes = pokemon.itemData.flyingEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.flyingEraserOriginalTypes;
        delete pokemon.itemData.flyingEraserActivated;
      }
    },
    num: 3187,
    gen: 9
  },
  forecastmap: {
    name: "Forecast Map",
    fling: {
      basePower: 0
    },
    spritenum: 3017,
	onModifySpD(spd, user) {
      if (user.species.name === "Terubim") {
        return this.chainModify(2); // Doubles the Special Defense stat
      }
	},
    itemUser: ["Terubim"],
    num: 3017,
    gen: 8,
    isNonstandard: "Past"
  },
  foulrock: {
    name: "Foul Rock",
    spritenum: 3005,
    fling: {
      basePower: 60
    },
    num: 3005,
    gen: 4
  },
  frostorb: {
    name: "Frost Orb",
    spritenum: 3176,
    fling: {
      basePower: 30,
      status: "fbt"
    },
    onResidualOrder: 28,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      pokemon.trySetStatus("fbt", pokemon);
    },
    num: 3176,
    gen: 4
  },
  galaxyplate: {
    name: "Galaxy Plate",
    spritenum: 3098,
    onPlate: "Cosmic",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Cosmic") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Cosmic",
    num: 3098,
    gen: 4
  },
  galladite: {
    name: "Galladite",
    spritenum: 616,
    megaStone: "Gallade-Mega",
    megaEvolves: "Gallade",
    itemUser: ["Gallade"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 756,
    gen: 6,
    isNonstandard: "Past"
  },
  gamecartridge: {
    name: "Game Cartridge",
    spritenum: 3136,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Questionmark") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3136,
    gen: 2
  },
  garchompite: {
    name: "Garchompite",
    spritenum: 589,
    megaStone: "Garchomp-Mega",
    megaEvolves: "Garchomp",
    itemUser: ["Garchomp"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 683,
    gen: 6,
    isNonstandard: "Past"
  },
  gardevoirite: {
    name: "Gardevoirite",
    spritenum: 587,
    megaStone: "Gardevoir-Mega",
    megaEvolves: "Gardevoir",
    itemUser: ["Gardevoir"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 657,
    gen: 6,
    isNonstandard: "Past"
  },
  gengarite: {
    name: "Gengarite",
    spritenum: 588,
    megaStone: "Gengar-Mega",
    megaEvolves: "Gengar",
    itemUser: ["Gengar"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 656,
    gen: 6,
    isNonstandard: "Past"
  },
  ghosteraser: {
    name: "Ghost Eraser",
    spritenum: 3188,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ghost')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.ghostEraserOriginalTypes = types;
        pokemon.itemData.ghostEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ghost');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ghost Eraser');
            pokemon.itemData.ghostEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.ghostEraserOriginalTypes &&
        !pokemon.itemData.ghostEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ghost Eraser');
          pokemon.itemData.ghostEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.ghostEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ghost Eraser');
        }
        const originalTypes = pokemon.itemData.ghostEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.ghostEraserOriginalTypes;
        delete pokemon.itemData.ghostEraserActivated;
      }
    },
    num: 3188,
    gen: 9
  },
  glalitite: {
    name: "Glalitite",
    spritenum: 623,
    megaStone: "Glalie-Mega",
    megaEvolves: "Glalie",
    itemUser: ["Glalie"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 763,
    gen: 6,
    isNonstandard: "Past"
  },
  grasseraser: {
    name: "Grass Eraser",
    spritenum: 3189,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Grass')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.grassEraserOriginalTypes = types;
        pokemon.itemData.grassEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Grass');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Grass Eraser');
            pokemon.itemData.grassEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.grassEraserOriginalTypes &&
        !pokemon.itemData.grassEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Grass Eraser');
          pokemon.itemData.grassEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.grassEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Grass Eraser');
        }
        const originalTypes = pokemon.itemData.grassEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.grassEraserOriginalTypes;
        delete pokemon.itemData.grassEraserActivated;
      }
    },
    num: 3189,
    gen: 9
  },
  grounderaser: {
    name: "Ground Eraser",
    spritenum: 3190,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ground')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.groundEraserOriginalTypes = types;
        pokemon.itemData.groundEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ground');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ground Eraser');
            pokemon.itemData.groundEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.groundEraserOriginalTypes &&
        !pokemon.itemData.groundEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ground Eraser');
          pokemon.itemData.groundEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.groundEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ground Eraser');
        }
        const originalTypes = pokemon.itemData.groundEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.groundEraserOriginalTypes;
        delete pokemon.itemData.groundEraserActivated;
      }
    },
    num: 3190,
    gen: 9
  },
  gyaradosite: {
    name: "Gyaradosite",
    spritenum: 589,
    megaStone: "Gyarados-Mega",
    megaEvolves: "Gyarados",
    itemUser: ["Gyarados"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 676,
    gen: 6,
    isNonstandard: "Past"
  },
  hafliberry: {
    name: "Hafli Berry",
    spritenum: 3006,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Nuclear"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Nuclear" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3006,
    gen: 4
  },
  hailstone: {
    name: "Hailstone",
    spritenum: 3019,
    fling: {
      basePower: 60
    },
	onStart(source) {
      this.field.setWeather("hail");
    },
    num: 3019,
    gen: 8,
    isNonstandard: "Past"
  },
  heracronite: {
    name: "Heracronite",
    spritenum: 590,
    megaStone: "Heracross-Mega",
    megaEvolves: "Heracross",
    itemUser: ["Heracross"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 680,
    gen: 6,
    isNonstandard: "Past"
  },
  houndoominite: {
    name: "Houndoominite",
    spritenum: 591,
    megaStone: "Houndoom-Mega",
    megaEvolves: "Houndoom",
    itemUser: ["Houndoom"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 666,
    gen: 6,
    isNonstandard: "Past"
  },
  iceeraser: {
    name: "Ice Eraser",
    spritenum: 3191,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ice')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.iceEraserOriginalTypes = types;
        pokemon.itemData.iceEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ice');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ice Eraser');
            pokemon.itemData.iceEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.iceEraserOriginalTypes &&
        !pokemon.itemData.iceEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ice Eraser');
          pokemon.itemData.iceEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.iceEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ice Eraser');
        }
        const originalTypes = pokemon.itemData.iceEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.iceEraserOriginalTypes;
        delete pokemon.itemData.iceEraserActivated;
      }
    },
    num: 3191,
    gen: 9
  },
  iceshard: {
    name: "Ice Shard",
    spritenum: 3007,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Ice") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3007,
    gen: 2
  },
  ichorplate: {
    name: "Ichor Plate",
    spritenum: 3108,
    onPlate: "Blood",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Blood") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Blood",
    num: 3108,
    gen: 4
  },
  industrialfan: {
    name: "Industrial Fan",
    spritenum: 3144,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Wind") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3144,
    gen: 2
  },
  instepguard: {
    name: "Instep Guard",
    spritenum: 3166,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["kick"]) {
        this.debug("Instep Guard boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["kick"])
        delete move.flags["contact"];
    },
    num: 3166,
    gen: 9
  },
  irondentures: {
    name: "Iron Dentures",
    spritenum: 3162,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        this.debug("Iron Dentures boost");
        return this.chainModify([4506, 4096]);
      }
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      if (move.flags["bite"])
        delete move.flags["contact"];
    },
    num: 3162,
    gen: 9
  },
  iveolite: {
    name: "Iveolite",
    spritenum: 3008,
    fling: {
      basePower: 40
    },
    onModifyAtkPriority: 2,
    onModifyAtk(atk, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    onModifySpaPriority: 2,
    onModifySpa(spa, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    num: 3008,
    gen: 5
  },
  jimacaberry: {
    name: "Jimaca Berry",
    spritenum: 3150,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Crystal"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Crystal" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3150,
    gen: 4
  },
  kangaskhanite: {
    name: "Kangaskhanite",
    spritenum: 592,
    megaStone: "Kangaskhan-Mega",
    megaEvolves: "Kangaskhan",
    itemUser: ["Kangaskhan"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 675,
    gen: 6,
    isNonstandard: "Past"
  },
  latiasite: {
    name: "Latiasite",
    spritenum: 629,
    megaStone: "Latias-Mega",
    megaEvolves: "Latias",
    itemUser: ["Latias"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 684,
    gen: 6,
    isNonstandard: "Past"
  },
  latiosite: {
    name: "Latiosite",
    spritenum: 630,
    megaStone: "Latios-Mega",
    megaEvolves: "Latios",
    itemUser: ["Latios"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 685,
    gen: 6,
    isNonstandard: "Past"
  },
  lightbulb: {
    name: "Lightbulb",
    spritenum: 3139,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Light") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3139,
    gen: 2
  },
  lighteraser: {
    name: "Light Eraser",
    spritenum: 3201,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Light")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.lightEraserOriginalTypes = types;
        pokemon.itemData.lightEraserActivated = false;
        const newTypes = types.filter(t => t !== "Light");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Light Eraser");
            pokemon.itemData.lightEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.lightEraserOriginalTypes &&
        !pokemon.itemData.lightEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Light Eraser");
          pokemon.itemData.lightEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.lightEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Light Eraser");
        }
        const originalTypes = pokemon.itemData.lightEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.lightEraserOriginalTypes;
        delete pokemon.itemData.lightEraserActivated;
      }
    },
    num: 3201,
    gen: 9
  },
  lightgem: {
    name: "Light Gem",
    spritenum: 3114,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Light" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3114,
    gen: 5,
    isNonstandard: "Past"
  },
  lightmemory: {
    name: "Light Memory",
    spritenum: 3127,
    onMemory: "Light",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Light",
    itemUser: ["Silvally-Light"],
    num: 3127,
    gen: 7,
    isNonstandard: "Past"
  },
  longclub: {
    name: "Long Club",
    fling: {
      basePower: 60
    },
    spritenum: 3009,
    onModifyCritRatio(critRatio, user) {
      if (["terathwack"].includes(this.toID(user.baseSpecies.baseSpecies))) {
        return critRatio + 2;
      }
    },
    itemUser: ["Terathwack"],
    num: 3009,
    gen: 9,
    isNonstandard: "Past"
  },
  lopunnite: {
    name: "Lopunnite",
    spritenum: 626,
    megaStone: "Lopunny-Mega",
    megaEvolves: "Lopunny",
    itemUser: ["Lopunny"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 768,
    gen: 6,
    isNonstandard: "Past"
  },
  lucarionite: {
    name: "Lucarionite",
    spritenum: 594,
    megaStone: "Lucario-Mega",
    megaEvolves: "Lucario",
    itemUser: ["Lucario"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 673,
    gen: 6,
    isNonstandard: "Past"
  },
  lumenplate: {
    name: "Lumen Plate",
    spritenum: 3101,
    onPlate: "Light",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Light") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Light",
    num: 3101,
    gen: 4
  },
  lunargeode: {
    name: "Lunar Geode",
    spritenum: 3137,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Crystal") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3137,
    gen: 2
  },
  lightiniumz: {
    name: "Lightinium Z",
    spritenum: 3087,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Light",
	onPlate: "Light",
    forcedForme: "Arceus-Light",
    num: 3087,
    gen: 7,
    isNonstandard: "Past"
  },
  manectite: {
    name: "Manectite",
    spritenum: 596,
    megaStone: "Manectric-Mega",
    megaEvolves: "Manectric",
    itemUser: ["Manectric"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 682,
    gen: 6,
    isNonstandard: "Past"
  },
  mawilite: {
    name: "Mawilite",
    spritenum: 598,
    megaStone: "Mawile-Mega",
    megaEvolves: "Mawile",
    itemUser: ["Mawile"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 681,
    gen: 6,
    isNonstandard: "Past"
  },
  medichamite: {
    name: "Medichamite",
    spritenum: 599,
    megaStone: "Medicham-Mega",
    megaEvolves: "Medicham",
    itemUser: ["Medicham"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 665,
    gen: 6,
    isNonstandard: "Past"
  },
  melirunberry: {
    name: "Melirun Berry",
    spritenum: 3147,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Cosmic"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Cosmic" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3147,
    gen: 4
  },
  metagrossite: {
    name: "Metagrossite",
    spritenum: 618,
    megaStone: "Metagross-Mega",
    megaEvolves: "Metagross",
    itemUser: ["Metagross"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 758,
    gen: 6,
    isNonstandard: "Past"
  },
  mewtwoarmor: {
    name: "Mewtwo Armor",
    spritenum: 3027,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 150 || pokemon.baseSpecies.num === 150) {
        return false;
      }
      return true;
    },
    forcedForme: "Mewtwo-Armored",
    itemUser: ["Mewtwo-Armored"],
    num: 3027,
    gen: 8
  },
  mewtwonitex: {
    name: "Mewtwonite X",
    spritenum: 600,
    megaStone: "Mewtwo-Mega-X",
    megaEvolves: "Mewtwo",
    itemUser: ["Mewtwo"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 662,
    gen: 6,
    isNonstandard: "Past"
  },
  mewtwonitey: {
    name: "Mewtwonite Y",
    spritenum: 601,
    megaStone: "Mewtwo-Mega-Y",
    megaEvolves: "Mewtwo",
    itemUser: ["Mewtwo"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 663,
    gen: 6,
    isNonstandard: "Past"
  },
  midnightseed: {
    name: "Midnight Seed",
    spritenum: 3173,
    fling: {
      basePower: 10
    },
    onStart(pokemon) {
      if (!pokemon.ignoringItem() && this.field.isTerrain("midnightterrain")) {
        pokemon.useItem();
      }
    },
    onTerrainChange(pokemon) {
      if (this.field.isTerrain("midnightterrain")) {
        pokemon.useItem();
      }
    },
    boosts: {
      def: 1
    },
    num: 3173,
    gen: 7
  },
  moisturecream: {
    name: "Moisture Cream",
    spritenum: 3142,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Slime") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3142,
    gen: 2
  },
  mossshard: {
    name: "Moss Shard",
    spritenum: 3010,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Grass") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3010,
    gen: 2
  },
  mysteriumz: {
    name: "Mysterium Z",
    spritenum: 3090,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Questionmark",
	onPlate: "Questionmark",
    forcedForme: "Arceus-Questionmark",
    num: 3090,
    gen: 7,
    isNonstandard: "Past"
  },
  mysteryplate: {
    name: "Mystery Plate",
    spritenum: 3097,
    onPlate: "Questionmark",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Questionmark") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Questionmark",
    num: 3097,
    gen: 4
  },
  ninikuberry: {
    name: "Niniku Berry",
    spritenum: 3148,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Shadow"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Shadow" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3148,
    gen: 4
  },
  normaleraser: {
    name: "Normal Eraser",
    spritenum: 3192,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Ice')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.iceEraserOriginalTypes = types;
        pokemon.itemData.iceEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Ice');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Ice Eraser');
            pokemon.itemData.iceEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.iceEraserOriginalTypes &&
        !pokemon.itemData.iceEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Ice Eraser');
          pokemon.itemData.iceEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.iceEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Ice Eraser');
        }
        const originalTypes = pokemon.itemData.iceEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.iceEraserOriginalTypes;
        delete pokemon.itemData.iceEraserActivated;
      }
    },
    num: 3192,
    gen: 9
  },
  nucleareraser: {
    name: "Nuclear Eraser",
    spritenum: 3202,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Nuclear")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.nuclearEraserOriginalTypes = types;
        pokemon.itemData.nuclearEraserActivated = false;
        const newTypes = types.filter(t => t !== "Nuclear");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Nuclear Eraser");
            pokemon.itemData.nuclearEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.nuclearEraserOriginalTypes &&
        !pokemon.itemData.nuclearEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Nuclear Eraser");
          pokemon.itemData.nuclearEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.nuclearEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Nuclear Eraser");
        }
        const originalTypes = pokemon.itemData.nuclearEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.nuclearEraserOriginalTypes;
        delete pokemon.itemData.nuclearEraserActivated;
      }
    },
    num: 3202,
    gen: 9
  },
  nucleargem: {
    name: "Nuclear Gem",
    spritenum: 3115,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Nuclear" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3115,
    gen: 5,
    isNonstandard: "Past"
  },
  nucliumz: {
    name: "Nuclium Z",
    spritenum: 3088,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Nuclear",
	onPlate: "Nuclear",
    forcedForme: "Arceus-Nuclear",
    num: 3088,
    gen: 7,
    isNonstandard: "Past"
  },
  nuclearmemory: {
    name: "Nuclear Memory",
    spritenum: 3128,
    onMemory: "Nuclear",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Nuclear",
    itemUser: ["Silvally-Nuclear"],
    num: 3128,
    gen: 7,
    isNonstandard: "Past"
  },
  okabberry: {
    name: "Okab Berry",
    spritenum: 3154,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Slime"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Slime" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3154,
    gen: 4
  },
  oldshield: {
    name: "Old Shield",
    spritenum: 3175,
    fling: {
      basePower: 80
    },
	onModifyDefPriority: 1,
    onModifyDef(def) {
      return this.chainModify(1.5);
    },
    onDisableMove(pokemon) {
      for (const moveSlot of pokemon.moveSlots) {
        const move = this.dex.moves.get(moveSlot.id);
        if (move.category === 'Status' && move.id !== 'mefirst') {
		  pokemon.disableMove(moveSlot.id);
        }
      }
    },
    num: 3175,
    gen: 6,
    isNonstandard: "Past"
  },
  pechaberry: {
    name: "Pecha Berry",
    spritenum: 333,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Electric"
    },
    onUpdate(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        pokemon.cureStatus();
      }
    },
    num: 151,
    gen: 3
  },
  penumbraplate: {
    name: "Penumbra Plate",
    spritenum: 3096,
    onPlate: "Shadow",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Shadow") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Shadow",
    num: 3096,
    gen: 4
  },
  pidgeotite: {
    name: "Pidgeotite",
    spritenum: 622,
    megaStone: "Pidgeot-Mega",
    megaEvolves: "Pidgeot",
    itemUser: ["Pidgeot"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 762,
    gen: 6,
    isNonstandard: "Past"
  },
  pinsirite: {
    name: "Pinsirite",
    spritenum: 602,
    megaStone: "Pinsir-Mega",
    megaEvolves: "Pinsir",
    itemUser: ["Pinsir"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 671,
    gen: 6,
    isNonstandard: "Past"
  },
  plasticeraser: {
    name: "Plastic Eraser",
    spritenum: 3203,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Plastic")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.plasticEraserOriginalTypes = types;
        pokemon.itemData.plasticEraserActivated = false;
        const newTypes = types.filter(t => t !== "Plastic");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Plastic Eraser");
            pokemon.itemData.plasticEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.plasticEraserOriginalTypes &&
        !pokemon.itemData.plasticEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Plastic Eraser");
          pokemon.itemData.plasticEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.plasticEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Plastic Eraser");
        }
        const originalTypes = pokemon.itemData.nuclearEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.plasticEraserOriginalTypes;
        delete pokemon.itemData.plasticEraserActivated;
      }
    },
    num: 3203,
    gen: 9
  },
  plasticgem: {
    name: "Plastic Gem",
    spritenum: 3116,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Plastic" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3116,
    gen: 5,
    isNonstandard: "Past"
  },
  plastinium: {
    name: "Plasticine Z",
    spritenum: 3089,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Plastic",
	onPlate: "Plastic",
    forcedForme: "Arceus-Plastic",
    num: 3089,
    gen: 7,
    isNonstandard: "Past"
  },
  plasticmemory: {
    name: "Plastic Memory",
    spritenum: 3129,
    onMemory: "Plastic",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Plastic",
    itemUser: ["Silvally-Plastic"],
    num: 3129,
    gen: 7,
    isNonstandard: "Past"
  },
  poisoneraser: {
    name: "Poison Eraser",
    spritenum: 3193,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Poison')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.poisonEraserOriginalTypes = types;
        pokemon.itemData.poisonEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Poison');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Poison Eraser');
            pokemon.itemData.poisonEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.poisonEraserOriginalTypes &&
        !pokemon.itemData.poisonEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Poison Eraser');
          pokemon.itemData.poisonEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.poisonEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Poison Eraser');
        }
        const originalTypes = pokemon.itemData.poisonEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.poisonEraserOriginalTypes;
        delete pokemon.itemData.poisonEraserActivated;
      }
    },
    num: 3193,
    gen: 9
  },
  polarizedglass: {
    name: "Polarized Glass",
    spritenum: 3180,
    fling: {
      basePower: 10
    },
	onStart(pokemon) {
      if (!pokemon.ignoringItem()) {
        this.add("-item", pokemon, "Polarized Glass");
      }
    },
    onModifyMove(move, pokemon, target) {
      if (pokemon.hasItem("polarizedglass")) {
        move.ignoreAbility = true;
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (target.hasItem("polarizedglass")) {
        this.add("-enditem", target, "Polarized Glass");
        target.item = "";
        target.itemState = {id: "", target};
        this.runEvent("AfterUseItem", target, null, null, this.dex.items.get("polarizedglass"));
      }
    },
    onAfterSubDamage(damage, target, source, effect) {
      if (effect.effectType === "Move") {
        if (target.hasItem("polarizedglass")) {
          this.add("-enditem", target, "Polarized Glass");
          target.item = "";
          target.itemState = {id: "", target};
          this.runEvent("AfterUseItem", target, null, null, this.dex.items.get("polarizedglass"));
        }
      }
    },
    num: 3180,
    gen: 9
  },
  polishedsphere: {
    name: "Polished Sphere",
    spritenum: 3013,
    fling: {
      basePower: 30
    },
    onModifySpDPriority: 2,
    onModifySpD(spd, pokemon) {
      if (pokemon.baseSpecies.name === "Enigmantis") {
        return this.chainModify(1.2);
      }
    },
	onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      if (pokemon.baseSpecies.name === "Enigmantis") {
        return this.chainModify(1.2);
      }
    },
    itemUser: ["Enigmantis"],
    num: 3013,
    gen: 3
  },
  polymerplate: {
    name: "Polymer Plate",
    spritenum: 3103,
    onPlate: "Plastic",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Plastic") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Plastic",
    num: 3103,
    gen: 4
  },
  powercell: {
    name: "Power Cell",
    spritenum: 3161,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["pulse"]) {
        this.debug("Bass Booster boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3161,
    gen: 9
  },
  prettyribbon: {
    name: "Pretty Ribbon",
    spritenum: 3011,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Fairy") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3011,
    gen: 2
  },
  psncureberry: {
    name: "PSN Cure Berry",
    spritenum: 333,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Electric"
    },
    onUpdate(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      if (pokemon.status === "psn" || pokemon.status === "tox" || pokemon.status === "bgt") {
        pokemon.cureStatus();
      }
    },
    num: 151,
    gen: 2,
    isNonstandard: "Past"
  },
  psychiceraser: {
    name: "Psychic Eraser",
    spritenum: 3194,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Psychic')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.psychicEraserOriginalTypes = types;
        pokemon.itemData.psychicEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Psychic');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Psychic Eraser');
            pokemon.itemData.psychicEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.psychicEraserOriginalTypes &&
        !pokemon.itemData.psychicEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Psychic Eraser');
          pokemon.itemData.psychicEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.psychicEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Psychic Eraser');
        }
        const originalTypes = pokemon.itemData.psychicEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.psychicEraserOriginalTypes;
        delete pokemon.itemData.psychicEraserActivated;
      }
    },
    num: 3194,
    gen: 9
  },
  questionmarkeraser: {
    name: "Questionmark Eraser",
    spritenum: 3204,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Questionmark")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.questionmarkEraserOriginalTypes = types;
        pokemon.itemData.questionmarkEraserActivated = false;
        const newTypes = types.filter(t => t !== "Questionmark");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Questionmark Eraser");
            pokemon.itemData.questionmarkEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.questionmarkEraserOriginalTypes &&
        !pokemon.itemData.questionmarkEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Questionmark Eraser");
          pokemon.itemData.questionmarkEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.questionmarkEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Questionmark Eraser");
        }
        const originalTypes = pokemon.itemData.questionmarkEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.questionmarkEraserOriginalTypes;
        delete pokemon.itemData.questionmarkEraserActivated;
      }
    },
    num: 3204,
    gen: 9
  },
  questionmarkgem: {
    name: "Questionmark Gem",
    spritenum: 3110,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Questionmark" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3110,
    gen: 5,
    isNonstandard: "Past"
  },
  questionmarkmemory: {
    name: "Questionmark Memory",
    spritenum: 3123,
    onMemory: "Questionmark",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Questionmark",
    itemUser: ["Silvally-Questionmark"],
    num: 3123,
    gen: 7,
    isNonstandard: "Past"
  },
  radiumgoggles: {
    name: "Radium Goggles",
    spritenum: 3140,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Nuclear") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3140,
    gen: 2
  },
  raggedpebble: {
    name: "Ragged Pebble",
    spritenum: 3012,
    fling: {
      basePower: 30
    },
    onModifySpDPriority: 2,
    onModifySpD(spd, pokemon) {
      if (pokemon.baseSpecies.name === "Enigmite") {
        return this.chainModify(1.2);
      }
    },
	onModifySpAPriority: 1,
    onModifySpA(spa, pokemon) {
      if (pokemon.baseSpecies.name === "Enigmite") {
        return this.chainModify(1.2);
      }
    },
    itemUser: ["Enigmite"],
    num: 3012,
    gen: 3
  },
  reverbplate: {
    name: "Reverb Plate",
    spritenum: 3105,
    onPlate: "Sound",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Sound") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Sound",
    num: 3105,
    gen: 4
  },
  rockeraser: {
    name: "Rock Eraser",
    spritenum: 3195,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Rock')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.rockEraserOriginalTypes = types;
        pokemon.itemData.rockEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Rock');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Rock Eraser');
            pokemon.itemData.rockEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.rockEraserOriginalTypes &&
        !pokemon.itemData.rockEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Rock Eraser');
          pokemon.itemData.rockEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.rockEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Rock Eraser');
        }
        const originalTypes = pokemon.itemData.rockEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.rockEraserOriginalTypes;
        delete pokemon.itemData.rockEraserActivated;
      }
    },
    num: 3195,
    gen: 9
  },
  sablenite: {
    name: "Sablenite",
    spritenum: 614,
    megaStone: "Sableye-Mega",
    megaEvolves: "Sableye",
    itemUser: ["Sableye"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 754,
    gen: 6,
    isNonstandard: "Past"
  },
  salamencite: {
    name: "Salamencite",
    spritenum: 627,
    megaStone: "Salamence-Mega",
    megaEvolves: "Salamence",
    itemUser: ["Salamence"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 769,
    gen: 6,
    isNonstandard: "Past"
  },
  sceptilite: {
    name: "Sceptilite",
    spritenum: 613,
    megaStone: "Sceptile-Mega",
    megaEvolves: "Sceptile",
    itemUser: ["Sceptile"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 753,
    gen: 6,
    isNonstandard: "Past"
  },
  scizorite: {
    name: "Scizorite",
    spritenum: 605,
    megaStone: "Scizor-Mega",
    megaEvolves: "Scizor",
    itemUser: ["Scizor"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 670,
    gen: 6,
    isNonstandard: "Past"
  },
  sharpedonite: {
    name: "Sharpedonite",
    spritenum: 619,
    megaStone: "Sharpedo-Mega",
    megaEvolves: "Sharpedo",
    itemUser: ["Sharpedo"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 759,
    gen: 6,
    isNonstandard: "Past"
  },
  shadiumz: {
    name: "Shadium Z",
    spritenum: 3091,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Shadow",
	onPlate: "Shadow",
    forcedForme: "Arceus-Shadow",
    num: 3091,
    gen: 7,
    isNonstandard: "Past"
  },
  shadoweraser: {
    name: "Shadow Eraser",
    spritenum: 3205,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Shadow")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.shadowEraserOriginalTypes = types;
        pokemon.itemData.shadowEraserActivated = false;
        const newTypes = types.filter(t => t !== "Shadow");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Shadow Eraser");
            pokemon.itemData.shadowEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.shadowEraserOriginalTypes &&
        !pokemon.itemData.shadowEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Shadow Eraser");
          pokemon.itemData.shadowEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.shadowEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Shadow Eraser");
        }
        const originalTypes = pokemon.itemData.shadowEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.shadowEraserOriginalTypes;
        delete pokemon.itemData.shadowEraserActivated;
      }
    },
    num: 3205,
    gen: 9
  },
  shadowgem: {
    name: "Shadow Gem",
    spritenum: 3109,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Shadow" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3109,
    gen: 5,
    isNonstandard: "Past"
  },
  shadowmemory: {
    name: "Shadow Memory",
    spritenum: 3122,
    onMemory: "Shadow",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Shadow",
    itemUser: ["Silvally-Shadow"],
    num: 3122,
    gen: 7,
    isNonstandard: "Past"
  },
  shiningseed: {
    name: "Shining Seed",
    spritenum: 3174,
    fling: {
      basePower: 10
    },
    onStart(pokemon) {
      if (!pokemon.ignoringItem() && this.field.isTerrain("shiningterrain")) {
        pokemon.useItem();
      }
    },
    onTerrainChange(pokemon) {
      if (this.field.isTerrain("shiningterrain")) {
        pokemon.useItem();
      }
    },
    boosts: {
      spd: 1
    },
    num: 3174,
    gen: 7
  },
  shockingorb: {
    name: "Shocking Orb",
    spritenum: 3178,
    fling: {
      basePower: 30,
      status: "par"
    },
    onResidualOrder: 28,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      pokemon.trySetStatus("par", pokemon);
    },
    num: 3178,
    gen: 4
  },
  slimegem: {
    name: "Slime Gem",
    spritenum: 3117,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Slime" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3117,
    gen: 5,
    isNonstandard: "Past"
  },
  slimememory: {
    name: "Slime Memory",
    spritenum: 3130,
    onMemory: "Slime",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Slime",
    itemUser: ["Silvally-Slime"],
    num: 3130,
    gen: 7,
    isNonstandard: "Past"
  },
  slowbronite: {
    name: "Slowbronite",
    spritenum: 620,
    megaStone: "Slowbro-Mega",
    megaEvolves: "Slowbro",
    itemUser: ["Slowbro"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 760,
    gen: 6,
    isNonstandard: "Past"
  },
  snowyseed: {
    name: "Snowy Seed",
    spritenum: 3172,
    fling: {
      basePower: 10
    },
    onStart(pokemon) {
      if (!pokemon.ignoringItem() && this.field.isTerrain("snowyterrain")) {
        pokemon.useItem();
      }
    },
    onTerrainChange(pokemon) {
      if (this.field.isTerrain("snowyterrain")) {
        pokemon.useItem();
      }
    },
    boosts: {
      spd: 1
    },
    num: 3172,
    gen: 7
  },
  soundiumz: {
    name: "Soundium Z",
    spritenum: 3093,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Sound",
	onPlate: "Sound",
    forcedForme: "Arceus-Sound",
    num: 3093,
    gen: 7,
    isNonstandard: "Past"
  },
  soundgem: {
    name: "Sound Gem",
    spritenum: 3118,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Sound" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3118,
    gen: 5,
    isNonstandard: "Past"
  },
  soundmemory: {
    name: "Sound Memory",
    spritenum: 3131,
    onMemory: "Sound",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Sound",
    itemUser: ["Silvally-Sound"],
    num: 3131,
    gen: 7,
    isNonstandard: "Past"
  },
  spellbook: {
    name: "Spell Book",
    spritenum: 3167,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["magic"]) {
        this.debug("Spell Book boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3167,
    gen: 9
  },
  spicycurry: {
    name: "Spicy Curry",
    spritenum: 3021,
    fling: {
      basePower: 30,
      status: "brn"
    },
    onResidualOrder: 28,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      pokemon.trySetStatus("brn", pokemon);
    },
	onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Fire" && !user.hasType("Fire")) {
        return this.chainModify([5120, 4096]);
      }
	},
    num: 3021,
    gen: 4
  },
  steeleraser: {
    name: "Steel Eraser",
    spritenum: 3196,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Steel')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.steelEraserOriginalTypes = types;
        pokemon.itemData.steelEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Steel');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Steel Eraser');
            pokemon.itemData.steelEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.steelEraserOriginalTypes &&
        !pokemon.itemData.steelEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Steel Eraser');
          pokemon.itemData.steelEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.steelEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Steel Eraser');
        }
        const originalTypes = pokemon.itemData.steelEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.steelEraserOriginalTypes;
        delete pokemon.itemData.steelEraserActivated;
      }
    },
    num: 3196,
    gen: 9
  },
  steelixite: {
    name: "Steelixite",
    spritenum: 621,
    megaStone: "Steelix-Mega",
    megaEvolves: "Steelix",
    itemUser: ["Steelix"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 761,
    gen: 6,
    isNonstandard: "Past"
  },
  stickyplate: {
    name: "Sticky Plate",
    spritenum: 3104,
    onPlate: "Slime",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Slime") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Slime",
    num: 3104,
    gen: 4
  },
  swampertite: {
    name: "Swampertite",
    spritenum: 612,
    megaStone: "Swampert-Mega",
    megaEvolves: "Swampert",
    itemUser: ["Swampert"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 752,
    gen: 6,
    isNonstandard: "Past"
  },
  tabakoberry: {
    name: "Tabako Berry",
    spritenum: 3153,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Plastic"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Plastic" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3153,
    gen: 4
  },
  thirdeye: {
    name: "Third Eye",
    fling: {
      basePower: 20
    },
    spritenum: 3014,
    onStart(pokemon) {
      for (const target of pokemon.foes()) {
        if (target.ability) {
          this.add("-item", target, target.getAbility().name, "[from] item: X-Ray Specs", "[of] " + pokemon, "[identify]");
        }
      }
    },
    num: 3014,
    gen: 9,
    isNonstandard: "Past"
  },
  tomeofelders: {
    name: "Tome of Elders",
    spritenum: 3145,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Eldritch") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3145,
    gen: 2
  },
  totemofundying: {
    name: "Totem of Undying",
    spritenum: 3020,
    fling: {
      basePower: 10
    },
    onDamagePriority: -40,
    onDamage(damage, target, source, effect) {
      if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === "Move") {
        if (target.useItem()) {
          return target.hp - 1;
        }
      }
    },
    num: 3020,
    gen: 4
  },
  tougaberry: {
    name: "Touga Berry",
    spritenum: 3175,
    isBerry: true,
    naturalGift: {
      basePower: 80,
      type: "Ice"
    },
    onUpdate(pokemon) {
      if (pokemon.status === "fbt") {
        pokemon.eatItem();
      }
    },
    onEat(pokemon) {
      if (pokemon.status === "fbt") {
        pokemon.cureStatus();
      }
    },
    num: 3175,
    gen: 3
  },
  toypickaxe: {
    name: "Toy Pickaxe",
    spritenum: 3141,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Plastic") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3141,
    gen: 2
  },
  trainingwheels: {
    name: "Training Wheels",
    spritenum: 3177,
    fling: {
      basePower: 40
    },
	onModifySpAPriority: 2,
    onModifySpA(def, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    onModifyAtkPriority: 2,
    onModifyAtk(atk, pokemon) {
      if (pokemon.baseSpecies.nfe) {
        return this.chainModify(1.5);
      }
    },
    num: 3177,
    gen: 5
  },
  tunabberry: {
    name: "Tunab Berry",
    spritenum: 3158,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Blood"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Blood" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3158,
    gen: 4
  },
  tyranitararmor: {
    name: "Tyranitar Armor",
    spritenum: 3022,
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 248 || pokemon.baseSpecies.num === 248) {
        return false;
      }
      return true;
    },
    forcedForme: "Tyranitar-Armored",
    itemUser: ["Tyranitar-Armored"],
    num: 3022,
    gen: 8
  },
  tyranitarite: {
    name: "Tyranitarite",
    spritenum: 607,
    megaStone: "Tyranitar-Mega",
    megaEvolves: "Tyranitar",
    itemUser: ["Tyranitar"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 669,
    gen: 6,
    isNonstandard: "Past"
  },
  unearthlyplate: {
    name: "Unearthly Plate",
    spritenum: 3107,
    onPlate: "Eldritch",
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move.type === "Eldritch") {
        return this.chainModify([4915, 4096]);
      }
    },
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 493 || pokemon.baseSpecies.num === 493) {
        return false;
      }
      return true;
    },
    forcedForme: "Arceus-Eldritch",
    num: 3107,
    gen: 4
  },
  valumberry: {
    name: "Valum Berry",
    spritenum: 3151,
    isBerry: true,
    naturalGift: {
      basePower: 60,
      type: "Digital"
    },
    onSourceModifyDamage(damage, source, target, move) {
      if (move.type === "Digital" && target.getMoveHitData(move).typeMod > 0) {
        const hitSub = target.volatiles["substitute"] && !move.flags["bypasssub"] && !(move.infiltrates && this.gen >= 6);
        if (hitSub)
          return;
        if (target.eatItem()) {
          this.debug("-50% reduction");
          this.add("-enditem", target, this.effect, "[weaken]");
          return this.chainModify(0.5);
        }
      }
    },
    onEat() {
    },
    num: 3151,
    gen: 4
  },
  venusaurite: {
    name: "Venusaurite",
    spritenum: 608,
    megaStone: "Venusaur-Mega",
    megaEvolves: "Venusaur",
    itemUser: ["Venusaur"],
    onTakeItem(item, source) {
      if (source.baseSpecies.forme !== "")
        return true;
      if (item.megaEvolves === source.baseSpecies.baseSpecies)
        return false;
      return true;
    },
    num: 659,
    gen: 6,
    isNonstandard: "Past"
  },
  vialofdarkness: {
    name: "Vial of Darkness",
    spritenum: 3135,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "Shadow") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3135,
    gen: 2
  },
  volatilespray: {
    name: "Volatile Spray",
    spritenum: 3170,
    fling: {
      basePower: 30
    },
    num: 3170,
    gen: 4
  },
  slimiumz: {
    name: "Slimium Z",
    spritenum: 3092,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Slime",
	onPlate: "Slime",
    forcedForme: "Arceus-Slime",
    num: 3092,
    gen: 7,
    isNonstandard: "Past"
  },
  watereraser: {
    name: "Water Eraser",
    spritenum: 3197,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes('Water')) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.waterEraserOriginalTypes = types;
        pokemon.itemData.waterEraserActivated = false;
        const newTypes = types.filter(t => t !== 'Water');
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add('-item', pokemon, 'Water Eraser');
            pokemon.itemData.waterEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.waterEraserOriginalTypes &&
        !pokemon.itemData.waterEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add('-item', pokemon, 'Water Eraser');
          pokemon.itemData.waterEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.waterEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add('-enditem', pokemon, 'Water Eraser');
        }
        const originalTypes = pokemon.itemData.waterEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.waterEraserOriginalTypes;
        delete pokemon.itemData.waterEraserActivated;
      }
    },
    num: 3197,
    gen: 9
  },
  weatherballoon: {
    name: "Weather Balloon",
    spritenum: 3171,
    fling: {
      basePower: 30
    },
    num: 3171,
    gen: 4
  },
  winderaser: {
    name: "Wind Eraser",
    spritenum: 3206,
    fling: {
      basePower: 40
    },
	onStart(pokemon) {
      const types = pokemon.getTypes();
      if (types.length === 2 && types.includes("Wind")) {
        pokemon.itemData = pokemon.itemData || {};
        pokemon.itemData.windEraserOriginalTypes = types;
        pokemon.itemData.windEraserActivated = false;
        const newTypes = types.filter(t => t !== "Wind");
        if (newTypes.length > 0) {
          if (!pokemon.illusion) {
            this.add("-item", pokemon, "Wind Eraser");
            pokemon.itemData.windEraserActivated = true;
          }
          pokemon.setType(newTypes);
        }
      }
    },
    onUpdate(pokemon) {
      if (
        pokemon.itemData?.windEraserOriginalTypes &&
        !pokemon.itemData.windEraserActivated
      ) {
        if (!pokemon.illusion) {
          this.add("-item", pokemon, "Wind Eraser");
          pokemon.itemData.windEraserActivated = true;
        }
      }
    },
    onEnd(pokemon) {
      if (pokemon.itemData?.windEraserOriginalTypes) {
        if (!pokemon.illusion) {
          this.add("-enditem", pokemon, "Wind Eraser");
        }
        const originalTypes = pokemon.itemData.windEraserOriginalTypes;
        pokemon.setType(originalTypes);
        delete pokemon.itemData.windEraserOriginalTypes;
        delete pokemon.itemData.windEraserActivated;
      }
    },
    num: 3206,
    gen: 9
  },
  windgem: {
    name: "Wind Gem",
    spritenum: 3119,
    isGem: true,
    onSourceTryPrimaryHit(target, source, move) {
      if (target === source || move.category === "Status")
        return;
      if (move.type === "Wind" && source.useItem()) {
        source.addVolatile("gem");
      }
    },
    num: 3119,
    gen: 5,
    isNonstandard: "Past"
  },
  windiumz: {
    name: "Windium Z",
    spritenum: 3094,
    onTakeItem: false,
    zMove: true,
    zMoveType: "Wind",
	onPlate: "Wind",
    forcedForme: "Arceus-Wind",
    num: 3094,
    gen: 7,
    isNonstandard: "Past"
  },
  windmemory: {
    name: "Wind Memory",
    spritenum: 3132,
    onMemory: "Wind",
    onTakeItem(item, pokemon, source) {
      if (source && source.baseSpecies.num === 773 || pokemon.baseSpecies.num === 773) {
        return false;
      }
      return true;
    },
    forcedForme: "Silvally-Wind",
    itemUser: ["Silvally-Wind"],
    num: 3132,
    gen: 7,
    isNonstandard: "Past"
  },
  whetstone: {
    name: "Whetstone",
    spritenum: 3168,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["slicing"]) {
        this.debug("Whetstone boost");
        return this.chainModify([4506, 4096]);
      }
    },
    num: 3168,
    gen: 9
  },
  xrayspecs: {
    name: "X-Ray Specs",
    fling: {
      basePower: 10
    },
    spritenum: 3015,
    onStart(pokemon) {
      for (const target of pokemon.foes()) {
        if (target.item) {
          this.add("-item", target, target.getItem().name, "[from] item: X-Ray Specs", "[of] " + pokemon, "[identify]");
        }
      }
    },
    num: 3015,
    gen: 9,
    isNonstandard: "Past"
  }
};
//# sourceMappingURL=items.js.map

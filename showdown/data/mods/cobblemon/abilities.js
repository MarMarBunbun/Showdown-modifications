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
var abilities_exports = {};
__export(abilities_exports, {
  Abilities: () => Abilities
});
module.exports = __toCommonJS(abilities_exports);
const Abilities = {
  absolutezero: {
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    onModifyMovePriority: -2,
    onModifyMove(move, attacker, defender) {
      if (this.field.isWeather("snow") || this.field.isWeather("hail")) {
        if (move.secondaries) {
          for (const secondary of move.secondaries) {
            if (secondary.status === "frz" || secondary.status === "fbt") {
              if (secondary.chance) {
                this.debug("Doubling status chance for freeze/frostbite during Hail/Snow");
                secondary.chance *= 2;
              }
            }
          }
        }
        if (move.self?.chance && (move.self.status === "frz" || move.self.status === "fbt")) {
          this.debug("Doubling self status chance for freeze/frostbite during Hail/Snow");
          move.self.chance *= 2;
        }
      }
    },
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Ice" && (this.field.isWeather("snow") || this.field.isWeather("hail"))) {
        this.debug('Absolute Zero ice power boost in Snow');
        return this.chainModify([5325, 4096]); // ≈ 1.3× boost
      }
    },
    flags: {},
    name: "Absolute Zero",
    rating: 3.5,
    num: 3190
  },
  absolution: {
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "darkness") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    name: "Absolution",
    rating: 2,
    num: 3000
  },
  acceleration: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["speed"]) {
        this.debug("Acceleration boost");
        return this.chainModify(1.5);
      }
    },
    name: "Acceleration",
    rating: 3.5,
    num: 3001
  },
  adrenaline: {
    onDamage(damage, target, source, effect) {
      if (effect.effectType === "Move" && !effect.multihit && (!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility("sheerforce")))) {
        this.effectState.checkedAdrenaline = false;
      } else {
        this.effectState.checkedAdrenaline = true;
      }
    },
    onTryEatItem(item) {
      const healingItems = [
        "aguavberry",
        "enigmaberry",
        "figyberry",
        "iapapaberry",
        "magoberry",
        "sitrusberry",
        "wikiberry",
        "oranberry",
        "berryjuice"
      ];
      if (healingItems.includes(item.id)) {
        return this.effectState.checkedAdrenaline;
      }
      return true;
    },
    onAfterMoveSecondary(target, source, move) {
      this.effectState.checkedAdrenaline = true;
      if (!source || source === target || !target.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
        this.boost({ spe: Math.floor(target.getStat('spe', false, false) / 2) }, target, target);
      }
    },
    name: "Adrenaline",
    rating: 4,
    num: 3002
  },
  aircontrol: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Flying";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Air Control",
    rating: 4,
    num: 3003
  },
  alchemicpower: {
    onAllyFaint(target) {
      if (!this.effectState.target.hp)
        return;
      const ability = target.getAbility();
      const additionalBannedAbilities = [
        "alchemicpower",
		"noability",
        "flowergift",
        "forecast",
        "hungerswitch",
        "illusion",
        "imposter",
        "neutralizinggas",
        "powerofalchemy",
        "receiver",
        "trace",
        "wonderguard"
      ];
      if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability))
        return;
      if (this.effectState.target.setAbility(ability)) {
        this.add("-ability", this.effectState.target, ability, "[from] ability: Alchemic Power", "[of] " + target);
      }
    },
	name: "Alchemic POwer",
	rating: 2,
	num: 3004
  },
  allure: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Allure", "boost");
          activated = true;
        }
        if (pokemon.gender === "M" && target.gender === "F" || pokemon.gender === "F" && target.gender === "M") { 
		 if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ evasion: -1 }, target, pokemon, null, true);
        }
      }
	 }
    },
    name: "Allure",
    rating: 0,
    num: 3005
  },
  amalgam: {
    onPrepareHit(source, target, move) {
      if (this.effectState.protean)
        return;
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.effectState.protean = true;
        this.add("-start", source, "typechange", type, "[from] ability: Amalgam");
      }
    },
    onSwitchIn(pokemon) {
      delete this.effectState.protean;
    },
    name: "Amalgam",
    rating: 4,
    num: 3006
  },
  ambush: {
    onModifyMove(move) {
      if (this.field.isWeather("eclipse")) {
        move.accuracy = true;
      }
    },
    name: "Ambush",
    rating: 2.5,
    num: 3007
  },
  amplifier: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"]) {
        this.debug("Amplifier boost");
        return this.chainModify(1.25);
      }
    },
    name: "Amplifier",
    rating: 3.5,
    num: 3008
  },
  ancientbody: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Normal" || move.type === "Fire" || move.type === "Poison" || move.type === "Flying" || move.type === "Crystal" || move.type === "Nuclear" || move.type === "Plastic") {
        this.debug("Ancient Body weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Normal" || move.type === "Fire" || move.type === "Poison" || move.type === "Flying" || move.type === "Crystal" || move.type === "Nuclear" || move.type === "Plastic") {
        this.debug("Ancient Body weaken");
        return this.chainModify(0.5);
      }
    },
	onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Rock") {
        this.debug("Ancient Body boost");
        return this.chainModify([4915, 4096]);
      }
    },
	onSourceBasePowerPriority: 17,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Water" || move.type === "Grass" || move.type === "Fighting" || move.type === "Ground" || move.type === "Steel" || move.type === "Shadow") {
        return this.chainModify(2);
      }
    },
	onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: { breakable: 1 },
    name: "Ancient Body",
    rating: 3.5,
    num: 3009
  },
  arcanum: {
    onStart(source) {
      this.field.setWeather("dragonforce");
    },
    name: "Arcanum",
    rating: 4,
    num: 3010
  },
  arenabloom: {
    onStart(source) {
      this.field.setWeather("pollenstorm");
    },
	onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "pollenstorm") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Arena Bloom",
    rating: 4,
    num: 3191
  },
  arenacurse: {
    onStart(source) {
      this.field.setWeather("cursedwinds");
    },
    flags: {},
    name: "Arena Curse",
    rating: 4,
    num: 3192
  },
  athenian: {
    onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(2);
    },
    name: "Athenian",
    rating: 5,
    num: 3011
  },
  atomizate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Nuclear";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Atomizate",
    rating: 4,
    num: 3012
  },
  badcompany: {
    onDamage(damage, target, source, effect) {
      if (effect.id === "recoil") {
        if (!this.activeMove)
          throw new Error("Battle.activeMove is null");
        if (this.activeMove.id !== "struggle")
          return null;
      }
    },
	onTryBoost(boost, target, source, effect) {
      if (source && target === source)
        return;
      let showMsg = false;
      let i;
      for (i in boost) {
        if (boost[i] < 0 && target === source) {
          delete boost[i];
          showMsg = true;
        }
      }
      if (showMsg && !effect.secondaries && effect.id !== "octolock") {
        this.add("-fail", target, "unboost", "[from] ability: Bad Company", "[of] " + target);
      }
    },
    isBreakable: true,
    name: "Bad Company",
    rating: 2,
    num: 3013
  },
  barbednest: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
	onSourceModifyDamage(damage, source, target, move) {
      let mod = 1;
      if (move.type === "Fire")
        mod *= 2;
      if (move.flags["contact"])
        mod /= 2;
      return this.chainModify(mod);
    },
    isBreakable: true,
    name: "Barbed Nest",
    rating: 3.5,
    num: 3014
  },
  blackhole: {
    onFoeTrapPokemon(pokemon) {
      if (pokemon.hasType("Psychic", "Cosmic") && pokemon.isAdjacent(this.effectState.target)) {
        pokemon.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source)
        source = this.effectState.target;
      if (!source || !pokemon.isAdjacent(source))
        return;
      if (!pokemon.knownType || pokemon.hasType("Psychic", "Cosmic")) {
        pokemon.maybeTrapped = true;
      }
    },
    name: "Black Hole",
    rating: 4,
    num: 3015
  },
  blazingsoul: {
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.type === "Fire" && pokemon.hp === pokemon.maxhp) {
        return priority + 1;
      }
    },
    name: "Blazing Soul",
    rating: 4,
    num: 3016
  },
  bloodbath: {
    onResidualOrder: 5,
    onResidualSubOrder: 3,
    onResidual(pokemon) {
      if (pokemon.status && ["darkness"].includes(pokemon.effectiveWeather())) {
        this.debug("bloodbath");
        this.add("-activate", pokemon, "ability: Bloodbath");
        pokemon.cureStatus();
      }
    },
    flags: {},
    name: "Bloodbath",
    rating: 1.5,
    num: 3084
  },
  bloodlust: {
    onModifyAtk(atk, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
	onModifySpa(spa, pokemon) {
      if (["darkness"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
	onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "darkness") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: {},
    name: "Bloodlust",
    rating: 3,
    num: 3017
  },
  bloodthirst: {
    onModifyMove(move) {
      if (move.flags["bite"]) {
        if (!move.drain) {
          move.drain = [1, 8]; // Drains 1/8 of the damage dealt
        }
      }
    },
	name: "Bloodthirst",
	rating: 2,
	num: 3018
  },
  bloomspring: {
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "pollenstorm") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Bloomspring",
    rating: 1.5,
    num: 3019
  },
  blubberdefense: {
    onSourceModifyDamage(damage, source, target, move) {
      if (target.hp >= target.maxhp) {
        this.debug("Blubber Defense weaken");
        return this.chainModify(0.5);
      }
    },
    isBreakable: true,
    name: "blubber Defense",
    rating: 3.5,
    num: 3020
  },
  borealinstinct: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      const isIceType = attacker.hasType("Ice");
	  const targetFrostbitten = defender.status === "fbt";
	  const isBiteMove = move.flags && move.flags["bite"];
	  if (isIceType && targetFrostbitten && isBiteMove) {
        this.debug("Frostjaw boost");
		return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Boreal Instinct",
    rating: 3.5,
    num: 3181
  },
  bouncy: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        const damageDealt = Math.floor(damage / 3);
		this.damage(damageDealt, source, target);
      }
    },
    name: "Bouncy",
    rating: 2.5,
    num: 3021
  },
  braveheart: {
    onFoeAfterBoost(boost, target, source, effect) {
      if (effect?.name === "Brave Heart" || effect?.name === "Mirror Herb")
      return;
    
      const user = this.effectState.target;
      const opponent = target;

      let numBoosts = 0;

      for (const stat in boost) {
        if (boost[stat] > 0) {
            numBoosts += boost[stat];
        }
      }

      if (numBoosts > 0) {
        // Increase the user's Attack stat for each stat the opponent raised
        this.boost({ atk: numBoosts }, user);
      }
    },
    name: "Brave Heart",
    rating: 3,
    num: 3022
  },
  brutalize: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Dark";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Brutalize",
    rating: 4,
    num: 3023
  },
  bubblehelm: {
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Bubble Helm",
    rating: 3.5,
    num: 3193
  },
  busybee: {
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.type === "Bug") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    name: "Busy Bee",
    rating: 4,
    num: 3024
  },
  carboncapture: {
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "smog") {
        this.heal(target.baseMaxhp / 8);
      }
    },
	onImmunity(type, pokemon) {
      if (type === "smog")
        return false;
    },
    flags: {},
    name: "Carbon Capture",
    rating: 1.5,
    num: 3025
  },
  cashsplash: {
    onUpdate(pokemon) {
      if (pokemon.status === "brn") {
        this.add("-activate", pokemon, "ability: Cash Splash");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Cash Splash");
      }
      return false;
    },
	onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Cash Splash weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Fire") {
        this.debug("Cash Splash weaken");
        return this.chainModify(0.5);
      }
    },
	onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Cash Splash boost");
        return this.chainModify(2);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Cash Splash boost");
        return this.chainModify(2);
      }
    },
    name: "Cash Splash",
    rating: 3.5,
    num: 3026
  },
  castlemoat: {
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Water") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Castle Moat");
        }
        return null;
      }
    },
    isBreakable: true,
    name: "Castle Moat",
    rating: 3,
    num: 3027
  },
  chakra: {
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fairy") {
        this.debug("Chakra boost");
        return this.chainModify([5325, 4096]);
      }
    },
    flags: {},
    name: "Chakra",
    rating: 3,
    num: 3194
  },
  chargedwool: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Electric";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Charged Wool",
    rating: 4,
    num: 3028
  },
  chernobyl: {
    onStart(source) {
      this.field.setWeather("fallout");
    },
    name: "Chernobyl",
    rating: 4,
    num: 3029
  },
  chlorofury: {
    onStart(pokemon) {
      this.boost({ spe: 1 }, pokemon); // Always boost Speed on switch-in
      // Count fainted allied Pokémon, excluding the current one
      const faintedAllies = pokemon.side.pokemon.filter(p => p.fainted && p !== pokemon).length;
      // Cap the SpA boosts to 5 maximum
      const boostAmount = Math.min(faintedAllies, 5);
      // Track how many SpA boosts we apply
      pokemon.volatiles["chlorofury"] = {
        counter: 0,
        duration: 3, // includes the turn it activated, so will trigger removal on the 2nd residual
      };
      for (let i = 0; i < boostAmount; i++) {
        const result = this.boost({ spa: 1 }, pokemon);
        if (result) {
          pokemon.volatiles["chlorofury"].counter++;
        }
      }
    },
    onResidual(pokemon) {
      const data = pokemon.volatiles["chlorofury"];
      if (data) {
        data.duration--;
        if (data.duration <= 0) {
          // Remove the SpA boosts we applied earlier
          if (data.counter > 0) {
            this.boost({ spa: -data.counter }, pokemon);
          }
          delete pokemon.volatiles["chlorofury"]; // Clean up the volatile
        }
      }
    },
    flags: {},
    name: "Chlorofury",
    rating: 4,
    num: 3182
  },
  chlorophyll: {
    onModifySpe(spe, pokemon) {
      if (["sunnyday", "desolateland", "pollenstorm"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Chlorophyll",
    rating: 3,
    num: 34
  },
  circusprops: {
    onStart(source) {
      this.field.setTerrain("trickroom");
    },
    name: "Circus Props",
    rating: 4,
    num: 3030
  },
  climatechange: {
    onStart(source) {
      const weathers = [
        "acidrain", "battleaura", "cursedwinds", "darkness", "duststorm",
        "dragonforce", "eclipse", "fairydust", "fallout", "fog",
        "hail", "magnetosphere", "pheromones", "pollenstorm", "psychicfield",
        "raindance", "sandstorm", "shadowyaura", "smog", "snow",
        "sunnyday", "thunderstorm"
      ];
      const randomWeather = this.sample(weathers);
      this.field.setWeather(randomWeather);
      this.add(`-weather`, randomWeather, `[from] ability: Climate Change`, `[of] ${source}`);
	},
	onImmunity(type, pokemon) {
      if (type === "sandstorm" || type === "hail" || type === "acidrain" || type === "fallout" || type === "shadowyaura" || type === "cursedwinds" || type === "smog")
        return false;
    },
    name: "climatechange",
    rating: 4,
    num: 3031
  },
  cloudburst: {
    onResidualOrder: 29,
    onResidual(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Rapidash-X" || pokemon.transformed) {
        return;
      }
      if (pokemon.hp <= pokemon.maxhp / 2 && !["X-Storm"].includes(pokemon.species.forme)) {
        pokemon.addVolatile("cloudburst");
      } else if (pokemon.hp > pokemon.maxhp / 2 && ["X-Storm"].includes(pokemon.species.forme)) {
        pokemon.addVolatile("cloudburst");
        pokemon.removeVolatile("cloudburst");
      }
    },
    onEnd(pokemon) {
      if (!pokemon.volatiles["cloudburst"] || !pokemon.hp)
        return;
      pokemon.transformed = false;
      delete pokemon.volatiles["cloudburst"];
      if (pokemon.species.baseSpecies === "Rapidash-X" && pokemon.species.battleOnly) {
        pokemon.formeChange(pokemon.species.battleOnly, this.effect, false, "[silent]");
      }
    },
    condition: {
      onStart(pokemon) {
        if (!pokemon.species.name.includes("X")) {
          if (pokemon.species.id !== "rapidashxstorm")
            pokemon.formeChange("Rapidash-x-Storm");
        } else {
          if (pokemon.species.id !== "rapidashxstorm")
            pokemon.formeChange("Rapidash-X-Storm");
        }
      },
      onEnd(pokemon) {
        if (["X-Storm"].includes(pokemon.species.forme)) {
          pokemon.formeChange(pokemon.species.battleOnly);
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Cloud Burst",
    rating: 0,
    num: 3032
  },
  coldwave: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(15, 100)) {
          source.trySetStatus("frz", target);
        }
      }
    },
    name: "Cold Wave",
    rating: 1.5,
    num: 3033
  },
  composed: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["charge"]) {
        this.debug("Composed boost");
        return this.chainModify(1.5);
      }
    },
    name: "Composed",
    rating: 3.5,
    num: 3034
  },
  condensation: {
    onStart(source) {
      this.field.setWeather("fog");
    },
    name: "Condensation",
    rating: 4,
    num: 3035
  },
  conditioning: {
    onPrepareHit(target, source, move) {
    if (target.side !== source.side && target.lastMove === move.id) {
      // Reduce damage by 25% if the same move is used against the user in succession
      this.debug('Conditioning reduces damage');
      this.effectState.conditioningReduce = 0.75;
      } else {
      this.effectState.conditioningReduce = 1;
      }
	},
	onModifyDamage(damage, source, target, move) {
      // Apply the damage reduction
      return this.chainModify(this.effectState.conditioningReduce);
	},
	name: "Conditioning",
    rating: 4.5,
    num: 3036
  },
  confident: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.boost({ spa: length }, source);
      }
    },
    name: "Confident",
    rating: 3,
    num: 3037
  },
  contamination: {
    onStart(source) {
      this.field.setWeather("smog");
    },
    name: "Contamination",
    rating: 4,
    num: 3038
  },
  content: {
    onAfterMove(target, source, move) {
      if (move.category !== 'Physical' && move.category !== 'Special') {
        this.heal(source.baseMaxhp / 16, source, source);
      }
    },
    name: "Content",
    rating: 1,
    num: 3039
  },
  conundrum: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.addVolatile("confusion", this.effectState.target);
        }
      }
    },
    name: "Conundrum",
    rating: 1.5,
    num: 3040
  },
  copperstate: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Copper State");
        }
        return null;
      }
    },
    onSourceBasePowerPriority: 17,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Water") {
        return this.chainModify(2);
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "thunderstorm") {
        this.heal(target.baseMaxhp / 8);
      } else if (effect.id === "raindance" || effect.id === "primordialsea" || effect.id === "acidrain") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    flags: { breakable: 1 },
    name: "Copper State",
    rating: 3,
    num: 3171
  },
  cosmicpresence: {
    onStart(source) {
      this.field.setTerrain("gravity");
    },
    name: "Cosmic Presence",
    rating: 4,
    num: 3041
  },
  covermeindebris: {
    onTryHit(pokemon, target, move) {
      if (move.type === "Fire") {
        this.add("-immune", pokemon, "[from] ability: Cover me in Debris");
        return null;
      }
    },
	onUpdate(pokemon) {
      if (pokemon.status === "brn") {
        this.add("-activate", pokemon, "ability: Cover me in Debris");
        pokemon.cureStatus();
      }
    },
    onSetStatus(status, target, source, effect) {
      if (status.id !== "brn")
        return;
      if (effect?.status) {
        this.add("-immune", target, "[from] ability: Cover me in Debris");
      }
      return false;
    },
    flags: {},
    name: "Cover me in Debris",
    rating: 3,
    num: 3042
  },
  crystalcase: {
    onTryHit(target, source, move) {
      if (move.type === "Water") {
        this.add("-immune", target, "[from] ability: Crystal Case");
        return null;
      }
    },
	onDamagingHit(damage, target, source, move) {
      if (["Fire"].includes(move.type)) {
        this.boost({ spa: 2 });
      }
    },
	onSourceBasePowerPriority: 18,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Fire") {
        return this.chainModify(1.5);
      }
    },
    isBreakable: true,
    name: "Crystal Case",
    rating: 3,
    num: 3043
  },
  damp: {
    onAnyTryMove(target, source, effect) {
      if ([ "atomsplit", "explosion", "mindblown", "mistyexplosion", "selfdestruct"].includes(effect.id)) {
        this.attrLastMove("[still]");
        this.add("cant", this.effectState.target, "ability: Damp", effect, "[of] " + target);
        return false;
      }
    },
    onAnyDamage(damage, target, source, effect) {
      if (effect && effect.name === "Aftermath") {
        return false;
      }
    },
    isBreakable: true,
    name: "Damp",
    rating: 0.5,
    num: 6
  },
  deepfreeze: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("frz", target);
        }
      }
    },
    name: "Deep Freeze",
    rating: 1.5,
    num: 3044
  },
  deepsleep: {
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "slp") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    name: "Deep Sleep",
    rating: 4,
    num: 3045
  },
  digitize: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Digital";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Digitize",
    rating: 4,
    num: 3046
  },
  disenchant: {
    onTryHit(target, source, move) {
      if (move.type === "Fairy") {
        this.add("-immune", target, "[from] ability: Disenchant");
        return null;
      }
    },
    name: "Disenchant",
    rating: 2,
    num: 3047
  },
  dirtypool: {
    onStart(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Chimaooze" || pokemon.level < 20 || pokemon.transformed)
        return;
      if (pokemon.hp > pokemon.maxhp / 4) {
        if (pokemon.species.id === "Chimaooze") {
          pokemon.formeChange("Chimaooze-Monster");
        }
      } else {
        if (pokemon.species.id === "chimaoozemonster") {
          pokemon.formeChange("Chimaooze");
        }
      }
    },
    onResidualOrder: 29,
    onResidual(pokemon) {
      if (pokemon.baseSpecies.baseSpecies !== "Chimaooze" || pokemon.level < 20 || pokemon.transformed || !pokemon.hp)
        return;
      if (pokemon.hp > pokemon.maxhp / 4) {
        if (pokemon.species.id === "Chimaooze") {
          pokemon.formeChange("Chimaooze-Monster");
        }
      } else {
        if (pokemon.species.id === "chimaoozemonster") {
          pokemon.formeChange("Chimaooze");
        }
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1, cantsuppress: 1 },
    name: "Dirty Pool",
    rating: 3,
    num: 3169
  },
  dragonarmor: {
    onModifyMove(move) {
      move.stab = 2;
    },
    name: "Dragon Armor",
    rating: 4,
    num: 3048
  },
  dreadspace: {
    onStart(pokemon) {
      this.add("-ability", pokemon, "Dread Space");
    },
    onDeductPP(target, source) {
      if (target.isAlly(source))
        return;
      return 1;
    },
    flags: {},
    name: "Dread Space",
    rating: 2.5,
    num: 3172
  },
  droughtproof: {
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
    flags: {},
    name: "Droughtproof",
    rating: 3.5,
    num: 3195
  },
  druidry: {
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "fairydust") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: {},
    name: "Druidry",
    rating: 1.5,
    num: 3049
  },
  dustdevil: {
    onStart(source) {
      this.field.setWeather("duststorm");
    },
    name: "Dust Devil",
    rating: 4,
    num: 3050
  },
  eccentric: {
    onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(1.5);
    },
    onModifyMovePriority: 1,
    onModifyMove(move) {
      // Only apply the accuracy reduction to special moves
      if (move.category === "Special") {
        move.accuracy = this.chainModify(0.8);
      }
    },
    name: "Eccentric",
    rating: 5,
    num: 3051
  },
  echolocation: {
    onPrepareHit(source, target, move) {
      if (move.category === "Status" || move.multihit || move.flags["noparentalbond"] || move.flags["charge"] || move.flags["futuremove"] || move.spreadHit || move.isZ || move.isMax || !move.flags["sound"])
        return;
      move.multihit = 2;
      move.multihitType = "parentalbond";
    },
    // Damage modifier implemented in BattleActions#modifyDamage()
    onSourceModifySecondaries(secondaries, target, source, move) {
      if (move.multihitType === "parentalbond" && move.id === "secretpower" && move.hit < 2) {
        return secondaries.filter((effect) => effect.volatileStatus === "flinch");
      }
    },
    flags: {},
    name: "Echolocation",
    rating: 4.5,
    num: 3197
  },
  elusive: {
    onModifyMove(move) {
      if (move.category === "Status" && this.randomChance(5, 10)) {
        // Boost evasion stat for status moves
        move.self = move.self || {};
        move.self.boosts = move.self.boosts || {};
        move.self.boosts.evasion = 1;
	  }
    },
	name: "Elusive",
	rating: 2,
	num: 3052
  },
  empathy: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target, true)) {
        this.add("-ability", target, "Empathy");
        this.boost({ spa: -1, atk: -1 }, source, target, null, true);
      }
    },
    name: "Empathy",
    rating: 2,
    num: 3053
  },
  energizate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Electric";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Energizate",
    rating: 4,
    num: 3211
  },
  energizer: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["thunderstorm"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Energizer",
    rating: 3,
    num: 3054
  },
  energyshield: {
    onTryHit(pokemon, target, move) {
      if (move.flags["beam"]) {
        this.add("-immune", pokemon, "[from] ability: Energy Shield");
        return null;
      }
    },
    isBreakable: true,
    name: "Energy Shield",
    rating: 3,
    num: 3055
  },
  equalize: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Sound";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Equalize",
    rating: 4,
    num: 3173
  },
  escapevelocity: {
    onModifySpe(spe) {
      if (this.field.isTerrain("gravity")) {
        return this.chainModify(2);
      }
    },
    name: "Escape Velocity",
    rating: 3,
    num: 3056
  },
  eventhorizon: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(10, 10)) {
          source.addVolatile("trapped", target);
        }
      }
    },
  name: "Event Horizon",
  rating: 1.5,
  num: 3057,
  },
  explode: {
    name: "Explode",
    onFaint(target, source, effect) {
		this.useMove("explosion", source);
    },
	rating: 4,
    num: 3058
  },
  fearmonger: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["darkness"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Fearmonger",
    rating: 3,
    num: 3059
  },
  feedback: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (!move.flags.contact && move.category !== "Status") {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    name: "Feedback",
    rating: 2.5,
    num: 3060
  },
  feisty: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, pokemon) {
      // Check if the opponent's level is higher
      const opponentLevel = pokemon.side.foe.active[0].level;
      if (opponentLevel > pokemon.level) {
        return this.chainModify(1.5);
      }
    },
    name: "Feisty",
    rating: 5,
    num: 3061
  },
  felineprowess: {
    onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(2);
    },
    name: "Feline Prowess",
    rating: 5,
    num: 3062
  },
  ferroflux: {
    onStart(source) {
      this.field.setWeather("magnetosphere");
    },
    name: "Ferroflux",
    rating: 4,
    num: 3063
  },
  fieldworker: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.type === "Grass") {
        this.debug("Fieldworker boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Fieldworker",
    rating: 3.5,
    num: 3198
  },
  flameeater: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Fire") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Flame Eater");
        }
        return null;
      }
    },
    isBreakable: true,
    name: "Flame Eater",
    rating: 3.5,
    num: 3064
  },
  flowergift: {
    onStart(pokemon) {
      this.singleEvent("WeatherChange", this.effect, this.effectState, pokemon);
    },
    onWeatherChange(pokemon) {
      if (!pokemon.isActive || pokemon.baseSpecies.baseSpecies !== "Cherrim" || pokemon.transformed)
        return;
      if (!pokemon.hp)
        return;
      if (["sunnyday", "desolateland", "pollenstorm"].includes(pokemon.effectiveWeather())) {
        if (pokemon.species.id !== "cherrimsunshine") {
          pokemon.formeChange("Cherrim-Sunshine", this.effect, false, "[msg]");
        }
      } else {
        if (pokemon.species.id === "cherrimsunshine") {
          pokemon.formeChange("Cherrim", this.effect, false, "[msg]");
        }
      }
    },
    onAllyModifyAtkPriority: 3,
    onAllyModifyAtk(atk, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (["sunnyday", "desolateland", "pollenstorm"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    onAllyModifySpDPriority: 4,
    onAllyModifySpD(spd, pokemon) {
      if (this.effectState.target.baseSpecies.baseSpecies !== "Cherrim")
        return;
      if (["sunnyday", "desolateland", "pollenstorm"].includes(pokemon.effectiveWeather())) {
        return this.chainModify(1.5);
      }
    },
    flags: { failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, breakable: 1 },
    name: "Flower Gift",
    rating: 1,
    num: 122
  },
  foil: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Psychic") {
        this.debug("Foil weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Psychic") {
        this.debug("Foil weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Foil",
    rating: 3.5,
    num: 3199
  },
  foolsgold: {
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
	onStart(pokemon) {
      this.boost({ accuracy: -1 }, pokemon);
    },
    flags: {},
    name: "Fool's Gold",
    rating: 1.5,
    num: 3186
  },
  fossilize: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Rock";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Fossilize",
    rating: 4,
    num: 3065
  },
  forage: {
    flags: {},
    name: "Forage",
    rating: 0,
    num: 3209
  },
  forked: {
    onSetStatus(status, target, source, effect) {
      if (["thunderstorm"].includes(target.effectiveWeather())) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Forked");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["thunderstorm"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Forked");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Forked",
    rating: 0.5,
    num: 3066
  },
  foulshroud: {
    onImmunity(type, pokemon) {
      if (type === "eclipse")
        return false;
    },
    onModifyAccuracyPriority: -1,
    onModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      if (this.field.isWeather("eclipse")) {
        this.debug("Foul Shroud - decreasing accuracy");
        return this.chainModify([3277, 4096]);
      }
    },
    isBreakable: true,
    name: "Foul Shroud",
    rating: 1.5,
    num: 3067
  },
  foundry: {
    onTryMovePriority: -2,
    onTryMove(pokemon, target, move) {
      if (move.id === "stealthrock") {
        this.actions.useMove("hotcoals", pokemon, {target: target});
        return null;
      }
    },
	onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if (move.type === "Rock" && !(move.isZ && move.category !== "Status")) {
        move.type = "Fire";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Foundry",
    rating: 4,
    num: 3068
  },
  freezebody: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("fbt", target);
        }
      }
    },
    flags: {},
    name: "Freeze Body",
    rating: 2,
    num: 3208
  },
  frighten: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Frighten", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon, null, true);
        }
      }
    },
    name: "Frighten",
    rating: 3.5,
    num: 3069
  },
  frostheal: {
    onDamagePriority: 1,
    onDamage(damage, target, source, effect) {
      if (effect.id === "fbt") {
        this.heal(target.baseMaxhp / 8);
        return false;
      }
    },
    flags: {},
    name: "Frost Heal",
    rating: 4,
    num: 3180
  },
  fruitrition: {
    onTryHealPriority: 19,
    onTryHeal(damage, target, source, effect) {
      if (source === target) {
        this.debug("Fruitrition boost");
        return this.chainModify([3277, 4096]);
      }
    },
    name: "Fruitrition",
    rating: 3.5,
    num: 3070
  },
  glacialarmor: {
    onModifyDef(def, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
	onModifySpd(spd, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Glacial Armor",
    rating: 3,
    num: 3071
  },
  glacialize: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Ice";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Glacialize",
    rating: 4,
    num: 3072
  },
  grasspelt: {
    onModifyDefPriority: 6,
    onModifyDef(pokemon) {
      if (this.field.isTerrain("grassyterrain") || this.field.isWeather("pollenstorm"))
        return this.chainModify(1.5);
    },
    flags: { breakable: 1 },
    name: "Grass Pelt",
    rating: 0.5,
    num: 179
  },
  gravitysling: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["magnetosphere"]) || this.field.getPseudoWeather("gravity")) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Gravity Sling",
    rating: 3,
    num: 3073
  },
  guttermind: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if (move.type === "Psychic" && !(move.isZ && move.category !== "Status")) {
        move.type = "Poison";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Gutter Mind",
    rating: 4,
    num: 3187
  },
  hailwarning: {
    onStart(source) {
      this.field.setWeather("hail");
    },
    name: "Hail Warning",
    rating: 4,
    num: 3074
  },
  harvest: {
    onResidualOrder: 28,
    onResidualSubOrder: 2,
    onResidual(pokemon) {
      if (this.field.isWeather(["sunnyday", "desolateland", "pollenstorm"]) || this.randomChance(1, 2)) {
        if (pokemon.hp && !pokemon.item && this.dex.items.get(pokemon.lastItem).isBerry) {
          pokemon.setItem(pokemon.lastItem);
          pokemon.lastItem = "";
          this.add("-item", pokemon, pokemon.getItem(), "[from] ability: Harvest");
        }
      }
    },
    flags: {},
    name: "Harvest",
    rating: 2.5,
    num: 139
  },
  haunt: {
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Ghost"] = true;
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "psychout" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Haunt", "[of] " + target);
      }
    },
    flags: {},
    name: "Haunt",
    rating: 3,
    num: 3075
  },
  haunting: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["cursedwinds", "darkness", "eclipse"])) {
        return this.chainModify(2);
      }
    },
    flags: {},
    name: "Haunting",
    rating: 3,
    num: 3076
  },
  hayfever: {
    onStart(source) {
      this.field.setWeather("pollenstorm");
    },
    name: "Hay Fever",
    rating: 4,
    num: 3077
  },
  hazysurge: {
    onStart(pokemon) {
      const side = pokemon.side;
      const mist = side.sideConditions["mist"];
      if (!mist) {
        this.add("-activate", pokemon, "ability: Hazy Surge");
        side.addSideCondition("mist", pokemon);
      }
    },
    name: "Hazy Surge",
    rating: 4,
    num: 3078
  },
  headache: {
    onModifySpAPriority: 5,
    onModifySpA(spa, pokemon) {
      if (pokemon.volatileStatus === "confusion") {
        return this.chainModify(2);
      }
    },
    name: "Headache",
    rating: 3.5,
    num: 3079
  },
  heeho: {
    onStart(source) {
      this.field.setWeather("snow");
    },
    onWeather(target, source, effect) {
      if (effect.id === "hail" || effect.id === "snow") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	flags: {},
    name: "Hee-Ho",
    rating: 69,
    num: 3080,
  },
  heliophobia: {
    onSourceBasePowerPriority: 17,
    onSourceBasePower(basePower, attacker, defender, move) {
      if (move.type === "Light") {
        return this.chainModify(1.25);
      }
    },
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "darkness" || effect.id === "shadowyaura") {
        this.heal(target.baseMaxhp / 8);
      } else if (effect.id === "sunnyday" || effect.id === "desolateland") {
        this.damage(target.baseMaxhp / 8, target, target);
      }
    },
    isBreakable: true,
    name: "Heliophobia",
    rating: 3,
    num: 3081
  },
  highnoon: {
    onModifyPriority(priority, pokemon, target, move) {
      if (move && !['Detect', 'Endure', 'Protect', 'Quick Guard', 'Wide Guard'].includes(move.name)) {
        return 0;
      }
      return priority;
    },
	onFoeModifyPriority(priority, pokemon, target, move) {
      if (move && !['Detect', 'Endure', 'Protect', 'Quick Guard', 'Wide Guard'].includes(move.name)) {
        return 0;
      }
      return priority;
    },
    name: "High Noon",
    rating: 4,
    num: 3082
  },
  holyguard: {
    onStart(pokemon) {
      let totalatk = 0;
      let totalspa = 0;
      for (const target of pokemon.foes()) {
        totalatk += target.getStat("atk", false, true);
        totalspa += target.getStat("spa", false, true);
      }
      if (totalatk && totalatk >= totalspa) {
        this.boost({ def: 1 });
      } else if (totalspa) {
        this.boost({ spd: 1 });
      }
    },
    flags: {},
    name: "Holy Guard",
    rating: 3.5,
    num: 3174
  },
  hubris: {
    onSourceAfterFaint(length, target, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.boost({ spa: length }, source);
      }
    },
    name: "Hubris",
    rating: 3,
    num: 3083
  },
  hydrophobic: {
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Hydrophobic weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water") {
        this.debug("Hydrophobic weaken");
        return this.chainModify(0.5);
      }
    },
    flags: {},
    name: "Hydrophobic",
    rating: 3.5,
    num: 3196
  },
  icecleats: {
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
    name: "Ice Cleats",
    rating: 2,
    num: 3102
  },
  iceslick: {
    onImmunity(type, pokemon) {
      if (type === "hail")
        return false;
    },
	onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(2);
      }
    },
    name: "Ice Slick",
    rating: 3,
    num: 3085
  },
  incantation: {
    onStart(source) {
      this.field.setWeather("fairydust");
    },
    name: "Incantation",
    rating: 4,
    num: 3086
  },
  infuriate: {
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Physical") {
        this.boost({ atk: 1 });
      }
    },
    flags: {},
    name: "Infuriate",
    rating: 2.5,
    num: 3212
  },
  insatiable: {
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      // Check if the move is a draining move
      if (move.drain) {
        // Boost the base power by 50%
        this.debug("Insatiable boost");
        return this.chainModify(1.5);
      }
    },
    name: "Insatiable",
    rating: 3,
    num: 3087
  },
  intoxicate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Poison";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Intoxicate",
    rating: 4,
    num: 3088
  },
  invigorate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Fighting";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Invigorate",
    rating: 4,
    num: 3089
  },
  ironjaw: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bite"]) {
        return this.chainModify(1.5);
      }
    },
    name: "Iron Jaw",
    rating: 3.5,
    num: 3090
  },
  ironwill: {
    onTryAddVolatile(status, pokemon) {
      if (status.id === "flinch")
        return null;
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Intimidate" && boost.atk) {
        delete boost.atk;
        this.add("-fail", target, "unboost", "Attack", "[from] ability: Iron Will", "[of] " + target);
      }
    },
    flags: { breakable: 1 },
    name: "Iron Will",
    rating: 1,
    num: 3185
  },
  irrelephant: {
    onStart(pokemon) {
      this.add("-ability", pokemon, "Irrelephant");
    },
    onModifyMove(move) {
      move.ignoreAbility = true;
    },
    name: "Irrelephant",
    rating: 3,
    num: 3091
  },
  junglespirit: {
    onModifyMove(move) {
      move.stab = 2;
    },
    name: "Jungle Spirit",
    rating: 4,
    num: 3092
  },
  laserfocus: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["beam"]) {
        this.debug("Laser Focus boost");
        return this.chainModify(1.5);
      }
    },
    name: "Laser Focus",
    rating: 3.5,
    num: 3093
  },
  lazy: {
    onStart(pokemon) {
      if (!pokemon.status) {
        pokemon.setStatus('slp', null, this.ability, true);
        pokemon.statusState.time = 2;
      }
    },
    name: "Lazy",
    rating: 1,
    num: 3094
  },
  leadskin: {
    onTryHit(target, source, move) {
      if (move.type === "Nuclear") {
        this.add("-immune", target, "[from] ability: Lead Skin");
        return null;
      }
    },
    name: "Lead Skin",
    rating: 2,
    num: 3095
  },
  leafguard: {
    onSetStatus(status, target, source, effect) {
      if (["sunnyday", "desolateland", "pollenstorm"].includes(target.effectiveWeather())) {
        if (effect?.status) {
          this.add("-immune", target, "[from] ability: Leaf Guard");
        }
        return false;
      }
    },
    onTryAddVolatile(status, target) {
      if (status.id === "yawn" && ["sunnyday", "desolateland", "pollenstorm"].includes(target.effectiveWeather())) {
        this.add("-immune", target, "[from] ability: Leaf Guard");
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Leaf Guard",
    rating: 0.5,
    num: 102
  },
  lernean: {
	onUpdate(pokemon) {
      if (!pokemon.species.id.startsWith("Hydreigon-Mega") || !pokemon.hp || pokemon.transformed) return;
      const formeOrder = ["Hydreigon-Mega_Nine", "Hydreigon-Mega_Eight", "Hydreigon-Mega_Seven", "Hydreigon-Mega_Six", "Hydreigon-Mega"];
      const targetForme = Math.ceil((pokemon.hp / pokemon.maxhp) * 5) - 1;
      if (formeOrder.indexOf(pokemon.species.id) > targetForme) {
        pokemon.formeChange(formeOrder[targetForme], this.effect, true);
      }
	},
	onModifyMove(move, pokemon, target) {
      if (!pokemon.species.id.startsWith("Hydreigon-Mega")) return;
      if (move.category === "Status" || !move.basePower) return;
      const formes = ["Hydreigon-Mega", "Hydreigon-Mega_Six", "Hydreigon-Mega_Seven", "Hydreigon-Mega_Eight", "Hydreigon-Mega_Nine"];
      move.multihit = 5 + formes.indexOf(pokemon.species.id);
      if (move.secondaries) {
        // delete move.secondaries; // Secondaries should still trigger, but only once after all hits take place.
        // Technically not a secondary effect, but it is negated
        delete move.self;
        if (move.id === "clangoroussoulblaze") delete move.selfBoost;
      }
	},
	onBasePower(basePower, pokemon, target, move) {
      if (!pokemon.species.id.startsWith("Hydreigon-Mega")) return;
      const formes = ["Hydreigon-Mega", "Hydreigon-Mega_Six", "Hydreigon-Mega_Seven", "Hydreigon-Mega_Eight", "Hydreigon-Mega_Nine"];
      const nhits = 5 + formes.indexOf(pokemon.species.id);
      return this.chainModify((1.15 + (0.075 * (nhits - 5))) / nhits);
	},
	onSourceDamagingHit(damage, target, pokemon, move) { // onSourceDamagingHit activates after a hit, not before. Need to get secondaries from onModifyMove
      if (pokemon.species.id.startsWith("Hydreigon-Mega") && move.secondaries) {
        delete move.secondaries;
      }
	},
	flags: {failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
	name: "Lernean",
	rating: 4.5,
	num: 3189,
  },
  levinskin: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Electric") {
        if (!this.boost({ atk: 1 })) {
          this.add("-immune", target, "[from] ability: Levin skin");
        }
        return null;
      }
    },
    isBreakable: true,
    name: "Levin Skin",
    rating: 3,
    num: 3096
  },
  lithe: {
    onModifySpePriority: 5,
    onModifySpe(spe, pokemon) {
      if (pokemon.status) {
        return this.chainModify(2);
      }
    },
    name: "Lithe",
    rating: 3.5,
    num: 3097
  },
  luckystar: {
    onModifyAccuracyPriority: 5,
    onModifyAccuracy(accuracy) {
      return this.chainModify(1.3);
    },
    name: "Lucky Star",
    rating: 5,
    num: 3098
  },
  lunardiffuse: {
    onStart(source) {
      this.field.setTerrain("midnightterrain");
    },
    flags: {},
    name: "Lunar Diffuse",
    rating: 4,
    num: 3214
  },
  magicianshat: {
    onStart(source) {
      this.field.setTerrain("magicroom");
    },
    name: "Magician's Hat",
    rating: 4,
    num: 3099
  },
  majesticaura: {
    onFoeTryMove(target, source, move) {
      const targetAllExceptions = ["perishsong", "flowershield", "rototiller"];
      if (move.target === "foeSide" || move.target === "all" && !targetAllExceptions.includes(move.id)) {
        return;
      }
      const dazzlingHolder = this.effectState.target;
      if ((source.isAlly(dazzlingHolder) || move.target === "all") && move.priority > 0.1) {
        this.attrLastMove("[still]");
        this.add("cant", dazzlingHolder, "ability: Majestic Aura", move, "[of] " + target);
        return false;
      }
    },
    isBreakable: true,
    name: "Majestic Aura",
    rating: 2.5,
    num: 3100
  },
  masterinstinct: {
    onModifyAccuracyPriority: 10,
	onModifyAccuracy(accuracy, pokemon) {
      if (this.field.isWeather("battleaura")) {
        return accuracy * 1.2;
      }
	},
    flags: { breakable: 1 },
    name: "Master Instinct",
    rating: 1.5,
    num: 3101
  },
  mimicry: {
    onStart(pokemon) {
      this.singleEvent("TerrainChange", this.effect, this.effectState, pokemon);
    },
    onTerrainChange(pokemon) {
      let types;
      switch (this.field.terrain) {
        case "electricterrain":
          types = ["Electric"];
          break;
        case "grassyterrain":
          types = ["Grass"];
          break;
        case "mistyterrain":
          types = ["Fairy"];
          break;
        case "psychicterrain":
          types = ["Psychic"];
          break;
        case "snowyterrain":
          types = ["Ice"];
          break;
		case "midnightterrain":
          types = ["Dark"];
          break;
		case "shiningterrain":
          types = ["Fire"];
          break;
		default:
          types = pokemon.baseSpecies.types;
      }
      const oldTypes = pokemon.getTypes();
      if (oldTypes.join() === types.join() || !pokemon.setType(types))
        return;
      if (this.field.terrain || pokemon.transformed) {
        this.add("-start", pokemon, "typechange", types.join("/"), "[from] ability: Mimicry");
        if (!this.field.terrain)
          this.hint("Transform Mimicry changes you to your original un-transformed types.");
      } else {
        this.add("-activate", pokemon, "ability: Mimicry");
        this.add("-end", pokemon, "typechange", "[silent]");
      }
    },
    flags: {},
    name: "Mimicry",
    rating: 0,
    num: 250
  },
  nastywebbing: {
    onDamagingHit(damage, target, source, move) {
      const side = source.isAlly(target) ? source.side.foe : source.side;
      const stickyWeb = side.sideConditions["stickyweb"];
      if (move.category === "Physical" && (!stickyWeb)) {
        this.add("-activate", target, "ability: Nasty Webbing");
        side.addSideCondition("stickyweb", target);
      }
    },
    flags: {},
    name: "Nasty Webbing",
    rating: 3.5,
    num: 3200
  },
  naturaltoxin: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Poison") {
        this.debug("Natural Toxin weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Poison") {
        this.debug("Natural Toxin weaken");
        return this.chainModify(0.5);
      }
    },
    isBreakable: true,
    name: "Natural Toxin",
    rating: 3.5,
    num: 3103
  },
  nefarious: {
    onModifyPriority(priority, pokemon, target, move) {
      if (move?.category === "Status") {
        move.pranksterBoosted = true;
        return priority + 1;
      }
    },
    name: "Nefarious",
    rating: 4,
    num: 3104
  },
  nesting: {
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "pheromones") {
        // Check if there is a Bug-type teammate
        const hasBugTeammate = target.side.pokemon.some(pokemon => pokemon.hasType("Bug") && !pokemon.fainted);
        if (hasBugTeammate) {
          this.heal(target.baseMaxhp / 8);
        } else {
          this.heal(target.baseMaxhp / 16);
        }
      }
    },
    flags: {},
    name: "Nesting",
    rating: 1.5,
    num: 3105
  },
  noctem: {
    onStart(source) {
      this.field.setWeather("darkness");
    },
    name: "Noctem",
    rating: 4,
    num: 3106
  },
  ojospetreos: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Ojos Petreos", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon, null, true);
        }
      }
    },
	onFoeTrapPokemon(pokemon) {
      if (!pokemon.hasAbility("ojospetreos") && pokemon.isAdjacent(this.effectState.target)) {
        pokemon.tryTrap(true);
      }
    },
    onFoeMaybeTrapPokemon(pokemon, source) {
      if (!source)
        source = this.effectState.target;
      if (!source || !pokemon.isAdjacent(source))
        return;
      if (!pokemon.hasAbility("ojospetreos")) {
        pokemon.maybeTrapped = true;
      }
    },
    flags: {},
    name: "Ojos Petreos",
    rating: 3.5,
    num: 3107
  },
  omnitype: {
    onStart(target) {
      this.add("-activate", target, "ability: Omnitype");
    },
    onTryHit(source, target, move) {
      source.setType([
        "Bug", "Dark", "Dragon", "Electric",
        "Fairy", "Fighting", "Fire", "Flying",
        "Ghost", "Grass", "Ground", "Ice", "Normal",
        "Poison", "Psychic", "Rock", "Steel", "Water"
      ]);
    },
    onFoeAfterMove(source, target, move) {
        target.setType(target.baseTypes);
    },
    flags: {breakable: 1, failroleplay: 1, noreceiver: 1, noentrain: 1, notrace: 1, failskillswap: 1},
    name: "Omnitype",
    rating: 4,
    num: 3188,
  },
  oraoraoraora: {
    onPrepareHit(target, source, move) {
      if (move.flags["punch"]) {
        move.multihit = 2; // Hit twice
      }
	},
    name: "ORAORAORAORA!",
    rating: 3,
    num: 3108
  },
  orbitaltide: {
    onStart(source) {
      this.field.setTerrain("gravity");
    },
    name: "Orbital Tide",
    rating: 4,
    num: 3109
  },
  pendulum: {
    onStart(pokemon) {
      this.addVolatile("metronome", pokemon); // Apply Metronome volatile status
    },
	name: "Pendulum",
    rating: 4,
    num: 3183
  },
  perforate: {
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Ghost"] = true;
      }
    },
    name: "Perforate",
    rating: 3,
    num: 3110
  },
  permafrost: {
    onModifyDef(def, pokemon) {
      if (this.field.isWeather(["hail", "snow"])) {
        return this.chainModify(1.5);
      }
    },
    name: "Permafrost",
    rating: 3,
    num: 3111
  },
  petrify: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Petrify", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon, null, true);
        }
      }
    },
    name: "Petrify",
    rating: 3.5,
    num: 3112
  },
  phototroph: {
    onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella")) return;
        const weatherId = effect.id;
      if (weatherId === "sunnyday" || weatherId === "desolateland") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    name: "phototroph",
    rating: 1.5,
    num: 3113
  },
  pielpunica: {
    onSourceModifyAtkPriority: 6,
    onSourceModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Water" || move.type === "Grass") {
        this.debug("Piel Punica weaken");
        return this.chainModify(0.5);
      }
    },
    onSourceModifySpAPriority: 5,
    onSourceModifySpA(atk, attacker, defender, move) {
      if (move.type === "Water" || move.type === "Grass") {
        this.debug("Piel Punica weaken");
        return this.chainModify(0.5);
      }
    },
    flags: { breakable: 1 },
    name: "Piel Punica",
    rating: 3.5,
    num: 3114
  },
  pollution: {
    onStart(source) {
      this.field.setWeather("acidrain");
    },
    name: "Pollution",
    rating: 4,
    num: 3115
  },
  powerfist: {
    onBasePowerPriority: 23,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["punch"]) {
        this.debug("Power Fist boost");
        return this.chainModify([4915, 4096]);
      }
    },
    name: "Power Fist",
    rating: 3,
    num: 3116
  },
  powerofalchemy: {
    onAllyFaint(target) {
      if (!this.effectState.target.hp)
        return;
      const ability = target.getAbility();
      const additionalBannedAbilities = [
        "alchemicpower",
		"noability",
        "flowergift",
        "forecast",
        "hungerswitch",
        "illusion",
        "imposter",
        "neutralizinggas",
        "powerofalchemy",
        "receiver",
        "trace",
        "wonderguard"
      ];
      if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability))
        return;
      if (this.effectState.target.setAbility(ability)) {
        this.add("-ability", this.effectState.target, ability, "[from] ability: Power of Alchemy", "[of] " + target);
      }
    },
    name: "Power of Alchemy",
    rating: 0,
    num: 223
  },
  prismatichue: {
    onStart(pokemon) {
      const side = pokemon.side;
      const reflect = side.sideConditions["reflect"];
      if (!reflect) {
        this.add("-activate", pokemon, "ability: Prismatic Hue");
        side.addSideCondition("reflect", pokemon);
      }
    },
    name: "Prismatic Hue",
    rating: 4,
    num: 3117
  },
  prismguard: {
    onDamagingHitOrder: 1,
    onDamagingHit(damage, target, source, move) {
      if (!move.flags.contact && move.category !== "Status") {
        this.damage(source.baseMaxhp / 8, source, target);
      }
    },
    name: "Prism Guard",
    rating: 2.5,
    num: 3118
  },
  psychocall: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Psychic" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Psycho Call boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Psychic" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Psycho Call boost");
        return this.chainModify(1.5);
      }
    },
    name: "Psycho Call",
    rating: 3.5,
    num: 3119
  },
  psychout: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Psych Out", "boost");
          activated = true;
        }
        if (target.volatiles["substitute"]) {
          this.add("-immune", target);
        } else {
          this.boost({ spa: -1 }, target, pokemon, null, true);
        }
      }
    },
    name: "Psych Out",
    rating: 3.5,
    num: 3120
  },
  quickcharge: {
    onModifyPriority(priority, pokemon, target, move) {
      // Check if any Pokémon has High Noon active
      const highNoonActive = pokemon.battle.getAllActive().some(p =>
        p.getAbility().id === "highnoon"
      );
      if (highNoonActive) {
        return;
      }
      if (pokemon.activeMoveActions === 0) {
        return priority + 4;
      }
    },
    flags: {},
    name: "Quick Charge",
    rating: 1.5,
    num: 3213
  },
  radsipper: {
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Nuclear") {
        if (!this.boost({ spa: 1 })) {
          this.add("-immune", target, "[from] ability: Rad Sipper");
        }
        return null;
      }
    },
	onAllyTryHitSide(target, source, move) {
      if (source === this.effectState.target || !target.isAlly(source))
        return;
      if (move.type === "Nuclear") {
        this.boost({ spa: 1 }, this.effectState.target);
      }
    },
	onImmunity(type, pokemon) {
      if (type === "fallout")
        return false;
    },
	onWeather(target, source, effect) {
      if (target.hasItem("utilityumbrella"))
        return;
      if (effect.id === "fallout") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    flags: { breakable: 1 },
    name: "Rad Sipper",
    rating: 3.5,
    num: 3121
  },
  raptor: {
    onModifyPriority(priority, pokemon, target, move) {
      if (target && target.hp <= target.maxhp / 4) {
        return priority + 1;
      }
    },
    flags: {},
    name: "Raptor",
    rating: 1.5,
    num: 3175
  },
  reactiveshielding: {
    onDamagingHit(damage, target, source, move) {
      if (move.category === "Physical") {
        this.add("-ability", target, "Reactive Shielding");
        this.boost({ def: 1, spd: -1 }, target);
      } else if (move.category === "Special") {
        this.add("-ability", target, "Reactive Shielding");
        this.boost({ spd: 1, def: -1 }, target);
      }
    },
    flags: {},
    name: "Reactive Shielding",
    rating: 2.5,
    num: 3210
  },
  receiver: {
    onAllyFaint(target) {
      if (!this.effectState.target.hp)
        return;
      const ability = target.getAbility();
      const additionalBannedAbilities = [
        "alchemicpower",
		"noability",
        "flowergift",
        "forecast",
        "hungerswitch",
        "illusion",
        "imposter",
        "neutralizinggas",
        "powerofalchemy",
        "receiver",
        "trace",
        "wonderguard"
      ];
      if (target.getAbility().isPermanent || additionalBannedAbilities.includes(target.ability))
        return;
      if (this.effectState.target.setAbility(ability)) {
        this.add("-ability", this.effectState.target, ability, "[from] ability: Receiver", "[of] " + target);
      }
    },
    name: "Receiver",
    rating: 0,
    num: 3122
  },
  regalia: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Fairy";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Regalia",
    rating: 4,
    num: 3123
  },
  resolute: {
    onTryHit(pokemon, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon, "[from] ability: Resolute");
        return null;
      }
    },
    onDamagePriority: -30,
    onDamage(damage, target, source, effect) {
      if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === "Move") {
        this.add("-ability", target, "Resolute");
        return target.hp - 1;
      }
    },
    isBreakable: true,
    name: "Resolute",
    rating: 3,
    num: 3124
  },
  ridersyndrome: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.flags["Kick"] && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Rider Syndrome boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.flags["Kick"] && attacker.hp <= attacker.maxhp / 3) {
        this.debug("Rider Syndrome boost");
        return this.chainModify(1.5);
      }
    },
    flags: {},
    name: "Rider Syndrome",
    rating: 1.5,
    num: 3179
  },
  rootcontrol: {
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon) {
      this.heal(pokemon.baseMaxhp / 16);
    },
    name: "Root Control",
    rating: 3,
    num: 3201
  },
  rosesthorns: {
    onDamagingHit(damage, target, source, move) {
      const side = source.isAlly(target) ? source.side.foe : source.side;
      const toxicSpikes = side.sideConditions["toxicspikes"];
      if (move.flags === "contact" && (!toxicSpikes || toxicSpikes.layers < 2 || this.randomChance(1, 2))) {
        this.add("-activate", target, "ability: Rose's Thorns");
        side.addSideCondition("toxicspikes", target);
      }
    },
    name: "Rose's Thorns",
    rating: 3.5,
    num: 3125
  },
  sandforce: {
    onBasePowerPriority: 21,
    onBasePower(basePower, attacker, defender, move) {
      if (this.field.isWeather(["sandstorm", "duststorm"])) {
        if (move.type === "Rock" || move.type === "Ground" || move.type === "Steel") {
          this.debug("Sand Force boost");
          return this.chainModify([5325, 4096]);
        }
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Sand Force",
    rating: 2,
    num: 3126
  },
  sandman: {
    onDamagingHit(damage, target, source, move) {
      if (this.checkMoveMakesContact(move, source, target)) {
        if (this.randomChance(3, 10)) {
          source.trySetStatus("slp", target);
        }
      }
    },
    name: "Sandman",
    rating: 1.5,
    num: 3127
  },
  sandpit: {
    onStart(pokemon) {
      let activated = false;
      for (const target of pokemon.adjacentFoes()) {
        if (!activated) {
          this.add("-ability", pokemon, "Intimidate", "boost");
          activated = true;
        }
        if (target.isGrounded()) {
          this.add("-immune", target);
        } else {
          this.boost({ spe: -1 }, target, pokemon, null, true);
        }
      }
    },
    name: "Sand PIt",
    rating: 3.5,
    num: 3128
  },
  sandrush: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["sandstorm", "duststorm"])) {
        return this.chainModify(2);
      }
    },
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    flags: {},
    name: "Sand Rush",
    rating: 3,
    num: 3129
  },
  sandveil: {
    onImmunity(type, pokemon) {
      if (type === "sandstorm")
        return false;
    },
    onModifyAccuracyPriority: -1,
    onModifyAccuracy(accuracy) {
      if (typeof accuracy !== "number")
        return;
      if (this.field.isWeather(["sandstorm", "sandstorm"])) {
        this.debug("Sand Veil - decreasing accuracy");
        return this.chainModify([3277, 4096]);
      }
    },
    flags: { breakable: 1 },
    name: "Sand Veil",
    rating: 1.5,
    num: 8
  },
  scalate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Dragon";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Scalate",
    rating: 4,
    num: 3176
  },
  scavenger: {
    onSourceAfterFaint(length, pokemon, source, effect) {
      if (effect && effect.effectType === "Move") {
        this.heal(pokemon.baseMaxhp / 4);
      }
    },
    name: "Scavenger",
    rating: 3.5,
    num: 3130
  },
  scarecrow: {
    onTryHit(target, source, move) {
      if (move.type === "Flying") {
        this.add("-immune", target, "[from] ability: Scarecrow");
        return null;
      }
	},
	name: "Scarecrow",
	rating: 2,
    num: 3131
  },
  secretion: {
    onStart(source) {
      this.field.setWeather("pheromones");
    },
    name: "secretion",
    rating: 4,
    num: 3132
  },
  selfsufficient: {
    onResidualOrder: 5,
    onResidualSubOrder: 4,
    onResidual(pokemon) {
      this.heal(pokemon.baseMaxhp / 16);
    },
    name: "Self Sufficient",
    rating: 3,
    num: 3133
  },
  shadowcall: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Shadow Call boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Shadow Call boost");
        return this.chainModify(1.5);
      }
    },
    name: "Shadow Call",
    rating: 3.5,
    num: 3134
  },
  shadowdance: {
    onModifySpe(spe, pokemon) {
      if (this.field.isWeather(["darkness", "shadowyaura"])) {
        return this.chainModify(2);
      }
    },
    name: "Shadow Dance",
    rating: 3,
    num: 3135
  },
  shadowsynergy: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Shadow Synergy boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Dark") {
        this.debug("Shadow Synergy boost");
        return this.chainModify(1.5);
      }
    },
    name: "Shadow Synergy",
    rating: 3.5,
    num: 3136
  },
  sharpcoral: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk) {
      return this.chainModify(2);
    },
	onModifyDefPriority: 5,
    onModifyDef(def) {
      return this.chainModify(0.5);
    },
	onModifySpAPriority: 5,
    onModifySpA(spa) {
      return this.chainModify(2);
    },
	onModifySpDPriority: 5,
    onModifySpD(spd) {
      return this.chainModify(2);
    },
    name: "Sharp Coral",
    rating: 5,
    num: 3137
  },
  siegedrive: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["bullet"]) {
        this.debug("Siege Drive boost");
        return this.chainModify(1.5);
      }
    },
    name: "Siege Drive",
    rating: 3.5,
    num: 3138
  },
  silverlining: {
    onModifyMovePriority: -5,
	onModifyMove(move, attacker, defender) {
      if (move.type === "Steel") {
        // Make Steel-type moves hit Ghost and Dark types super effectively
        if (defender.hasType("Ghost") || defender.hasType("Dark")) {
          move.onEffectiveness = function(typeMod, target, type) {
            if (type === "Ghost" || type === "Dark") {
              return 1; // Treat as super effective
            }
          };
        }
      }
    },
    flags: {},
    name: "Silver Lining",
    rating: 3,
    num: 3170
  },
  siphon: {
    onModifyMove(move) {
      if (move.flags["contact"] && this.randomChance(3, 10)) {
        if (!move.drain) {
          move.drain = [1, 2]; // Drains 1/2 of the damage dealt
        }
      }
    },
	name: "Siphon",
	rating: 2,
	num: 3139
  },
  skyscourge: {
    onStart(source) {
      this.field.setWeather("eclipse");
    },
    name: "Sky Scourge",
    rating: 4,
    num: 3140
  },
  sleet: {
    onStart(source) {
      this.field.setWeather("hail");
    },
	name: "Sleet",
    rating: 4,
    num: 3184
  },
  snowysurge: {
    onStart(source) {
      this.field.setTerrain("snowyterrain");
    },
    flags: {},
    name: "Snowy Surge",
    rating: 4,
    num: 3207
  },
  specialist: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["hm"]) {
        this.debug("Specialist boost");
        return this.chainModify(1.5);
      }
    },
    name: "Specialist",
    rating: 3.5,
    num: 3141
  },
  spectraljaws: {
    onModifyMove(move) {
      if (move.flags["bite"]) {
        move.category = "Special";
      }
    },
    name: "Spectral Jaws",
    rating: 3.5,
    num: 3142
  },
  speedswap: {
    onStart(source) {
      if (this.field.isTerrain("trickroom")) {
       this.field.clearTerrain();
      } else {
       this.field.setTerrain("trickroom");
      }
    },
    name: "Speed Swap",
    rating: 4,
    num: 3143
  },
  spiritcall: {
    onModifyAtkPriority: 5,
    onModifyAtk(atk, attacker, defender, move) {
      if (move.type === "Ghost" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Spirit Call boost");
        return this.chainModify(1.5);
      }
    },
    onModifySpAPriority: 5,
    onModifySpA(atk, attacker, defender, move) {
      if (move.type === "Ghost" && attacker.hp <= attacker.maxhp / 2) {
        this.debug("Spirit Call boost");
        return this.chainModify(1.5);
      }
    },
    name: "Spirit Call",
    rating: 3.5,
    num: 3144
  },
  sprint: {
    onDamagingHit(damage, target, source, effect) {
      this.boost({ spe: 1 });
    },
    name: "Sprint",
    rating: 3.5,
    num: 3145
  },
  solardiffuse: {
    onStart(source) {
      this.field.setTerrain("shiningterrain");
    },
    flags: {},
    name: "Solar Diffuse",
    rating: 4,
    num: 3215
  },
  solarprominence: {
    onSourceModifyDamage(damage, source, target, move) {
      return this.chainModify(0.7); // Reduces incoming damage by 30%
	},
    flags: { breakable: 1 },
    name: "Solar Prominence",
    rating: 3.5,
    num: 3177
  },
  soundboost: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["sound"]) {
        this.debug("Sound Boost boost");
        return this.chainModify(1.3);
      }
    },
    name: "Sound Boost",
    rating: 3.5,
    num: 3146
  },
  standoff: {
    onStart(source) {
      this.field.setWeather("battleaura");
    },
    name: "Stand Off",
    rating: 4,
    num: 3147
  },
  seance: {
    onStart(source) {
      this.field.setWeather("cursedwinds");
    },
    name: "Seance",
    rating: 4,
    num: 3148
  },
  stormbringer: {
    onStart(source) {
      this.field.setWeather("thunderstorm");
    },
    name: "Stormbringer",
    rating: 4,
    num: 3149
  },
  stormfront: {
    onStart(source) {
      this.field.setWeather("thunderstorm");
    },
    name: "Stormfront",
    rating: 4,
    num: 3202
  },
  striker: {
    onBasePowerPriority: 19,
    onBasePower(basePower, attacker, defender, move) {
      if (move.flags["kick"]) {
        this.debug("Striker boost");
        return this.chainModify(1.5);
      }
    },
    name: "Striker",
    rating: 3.5,
    num: 3150
  },
  stubborn: {
    onDamage(damage, target, source, effect) {
      if (effect.effectType === "Move" && !effect.multihit && (!effect.negateSecondary && !(effect.hasSheerForce && source.hasAbility("sheerforce")))) {
        this.effectState.checkedAdrenaline = false;
      } else {
        this.effectState.checkedAdrenaline = true;
      }
    },
    onTryEatItem(item) {
      const healingItems = [
        "aguavberry",
        "enigmaberry",
        "figyberry",
        "iapapaberry",
        "magoberry",
        "sitrusberry",
        "wikiberry",
        "oranberry",
        "berryjuice"
      ];
      if (healingItems.includes(item.id)) {
        return this.effectState.checkedAdrenaline;
      }
      return true;
    },
    onAfterMoveSecondary(target, source, move) {
      this.effectState.checkedAdrenaline = true;
      if (!source || source === target || !target.hp || !move.totalDamage)
        return;
      const lastAttackedBy = target.getLastAttackedBy();
      if (!lastAttackedBy)
        return;
      const damage = move.multihit ? move.totalDamage : lastAttackedBy.damage;
      if (target.hp <= target.maxhp / 2 && target.hp + damage > target.maxhp / 2) {
        this.boost({ atk: 1 }, target, target);
      }
    },
    name: "stubborn",
    rating: 4,
    num: 3151
  },
  sunbathe: {
    onWeather(target, source, effect) {
      if (effect.id === "sunnyday" || effect.id === "desolateland") {
        this.heal(target.baseMaxhp / 16);
      }
    },
    name: "Sunbathe",
    rating: 1,
    num: 3152
  },
  surveillance: {
    onStart(pokemon) {
      this.boost({ accuracy: 2 }, pokemon);
    },
    flags: {},
    name: "Surveillance",
    rating: 1.5,
    num: 3203
  },
  synthesizer: {
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Sound") {
        if (!this.heal(target.baseMaxhp / 4)) {
          this.add("-immune", target, "[from] ability: Synthesizer");
        }
        return null;
      }
    },
    flags: { breakable: 1 },
    name: "Synthesizer",
    rating: 3.5,
    num: 3178
  },
  tactician: {
    onBasePowerPriority: 8,
    onBasePower(basePower, attacker, defender, move) {
      if (move.typeMod === 0 || move.typeMod === 2) {
        this.debug("Tactician boost");
        return this.chainModify(2);
      }
    },
    name: "Tactician",
    rating: 5,
    num: 3153,
  },
  tenacious: {
    onModifyDefPriority: 5,
    onModifyDef(def) {
      return this.chainModify(2);
    },
    name: "Tenacious",
    rating: 5,
    num: 3154
  },
  tenacity: {
    // upokecenter says this is implemented as an added secondary effect
    onModifyMove(move) {
      if (!move?.flags["contact"] || move.target === "self")
        return;
      if (!move.secondaries) {
        move.secondaries = [];
      }
      move.secondaries.push({
        chance: 30,
        volatileStatus: "flinch",
        ability: this.dex.abilities.get("tenacity")
      });
    },
    name: "Tenacity",
    rating: 2,
    num: 3155
  },
  terrorize: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Ghost";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    name: "Terrorize",
    rating: 4,
    num: 3156
  },
  tobe: {
    onTryHit(pokemon, target, move) {
      if (move.ohko) {
        this.add("-immune", pokemon, "[from] ability: To Be");
		this.boost({spe: 1}, pokemon);
        return null;
      }
    },
    onDamagePriority: -30,
    onDamage(damage, target, source, effect) {
      if (target.hp === target.maxhp && damage >= target.hp && effect && effect.effectType === "Move") {
        this.add("-ability", target, "To Be");
		this.boost({spe: 1}, target);
        return target.hp - 1;
      }
    },
    flags: { breakable: 1 },
    name: "To be",
    rating: 3,
    num: 3204
  },
  trace: {
    onStart(pokemon) {
      if (pokemon.adjacentFoes().some((foeActive) => foeActive.ability === "noability")) {
        this.effectState.gaveUp = true;
      }
      if (pokemon.hasItem("Ability Shield")) {
        this.add("-block", pokemon, "item: Ability Shield");
        this.effectState.gaveUp = true;
      }
    },
    onUpdate(pokemon) {
      if (!pokemon.isStarted || this.effectState.gaveUp)
        return;
      const additionalBannedAbilities = [
        // Zen Mode included here for compatability with Gen 5-6
        "alchemicpower",
		"noability",
        "flowergift",
        "forecast",
        "hungerswitch",
        "illusion",
        "imposter",
        "neutralizinggas",
        "powerofalchemy",
        "receiver",
        "trace",
        "zenmode"
      ];
      const possibleTargets = pokemon.adjacentFoes().filter((target2) => !target2.getAbility().isPermanent && !additionalBannedAbilities.includes(target2.ability));
      if (!possibleTargets.length)
        return;
      const target = this.sample(possibleTargets);
      const ability = target.getAbility();
      if (pokemon.setAbility(ability)) {
        this.add("-ability", pokemon, ability, "[from] ability: Trace", "[of] " + target);
      }
    },
    name: "Trace",
    rating: 2.5,
    num: 36
  },
  transcendence: {
    onStart(source) {
      this.field.setWeather("psychicfield");
    },
    name: "Transcendence",
    rating: 4,
    num: 3157
  },
  trumpetweevil: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      if ((move.type === "Sound" || move.flags["sound"]) && !(move.isZ && move.category !== "Status")) {
        move.type = "Bug";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([6144, 4096]);
    },
    name: "Trumpet Weevil",
    rating: 4,
    num: 3205
  },
  unstable: {
    onPrepareHit(source, target, move) {
      if (this.effectState.unstable)
        return;
      if (move.hasBounced || move.flags["futuremove"] || move.sourceEffect === "snatch")
        return;
      const type = move.type;
      if (type && type !== "???" && source.getTypes().join() !== type) {
        if (!source.setType(type))
          return;
        this.effectState.unstable = true;
        this.add("-start", source, "typechange", type, "[from] ability: Unstable");
      }
    },
	onAfterMoveSecondary(target, source, move) {
      if (!target.hp)
        return;
      const type = move.type;
      if (target.isActive && move.effectType === "Move" && move.category !== "Status" && type !== "???" && !target.hasType(type)) {
        if (!target.setType(type))
          return false;
        this.add("-start", target, "typechange", type, "[from] ability: Unstable");
        if (target.side.active.length === 2 && target.position === 1) {
          const action = this.queue.willMove(target);
          if (action && action.move.id === "curse") {
            action.targetLoc = -1;
          }
        }
      }
    },
    onSwitchIn(pokemon) {
      delete this.effectState.unstable;
    },
    name: "Unstable",
    rating: 4,
    num: 3158
  },
  valiantshield: {
    onStart(pokemon) {
      this.boost({def: 1}, pokemon);
	  this.add("-ability", pokemon, "Valiant Shield");
    },
    name: "Valiant Shield",
    rating: 3.5,
    num: 3159
  },
  vampiric: {
    onModifyMove(move) {
      if (move.flags["contact"]) {
        if (!move.drain) {
          move.drain = [1, 8]; // Drains 1/8 of the damage dealt
        }
      }
    },
	name: "vampiric",
	rating: 2,
	num: 3160
  },
  vegetate: {
    onModifyTypePriority: -1,
    onModifyType(move, pokemon) {
      const noModifyType = [
        "judgment",
        "multiattack",
        "naturalgift",
        "revelationdance",
        "technoblast",
        "terrainpulse",
        "weatherball"
      ];
      if (move.type === "Normal" && !noModifyType.includes(move.id) && !(move.isZ && move.category !== "Status") && !(move.name === "Tera Blast" && pokemon.terastallized)) {
        move.type = "Grass";
        move.typeChangerBoosted = this.effect;
      }
    },
    onBasePowerPriority: 23,
    onBasePower(basePower, pokemon, target, move) {
      if (move.typeChangerBoosted === this.effect)
        return this.chainModify([4915, 4096]);
    },
    flags: {},
    name: "Vegetate",
    rating: 4,
    num: 3206
  },
  vibranthue: {
    onStart(pokemon) {
      const side = pokemon.side;
      const lightscreen = side.sideConditions["lightscreen"];
      if (!lightscreen) {
        this.add("-activate", pokemon, "ability: Vibrant Hue");
        side.addSideCondition("lightscreen", pokemon);
      }
    },
    name: "Vibrant Hue",
    rating: 4,
    num: 3161
  },
  visionary: {
    onModifyMovePriority: -5,
    onModifyMove(move) {
      if (!move.ignoreImmunity)
        move.ignoreImmunity = {};
      if (move.ignoreImmunity !== true) {
        move.ignoreImmunity["Psychic"] = true;
        move.ignoreImmunity["Normal"] = true;
      }
    },
    onTryBoost(boost, target, source, effect) {
      if (effect.name === "Psych Out" && boost.spa) {
        delete boost.spa;
        this.add("-fail", target, "unboost", "Special Attack", "[from] ability: Visionary", "[of] " + target);
      }
    },
    name: "Visionary",
    rating: 3,
    num: 3162
  },
  voicetuning: {
    onModifyMove(move) {
      move.stab = 2;
    },
    name: "Voice Tuning",
    rating: 4,
    num: 3163
  },
  warpmist: {
    onTryHit(target, source, move) {
      if (target !== source && move.ignoreImmunity !== true) {
        this.add("-immune", target, "[from] ability: Warp Mist");
        return null;
      }
    },
	onModifyAtk(atk, attacker) {
      if (this.field.isWeather("fog")) {
        this.debug("Warp Mist fog boost");
        return this.chainModify(1.2);
      }
    },
    name: "Warp Mist",
    rating: 4,
    num: 3164
  },
  windforce: {
    onTryHitPriority: 1,
    onTryHit(target, source, move) {
      if (target !== source && move.type === "Flying" || move.type === "Wind") {
        if (!this.boost({ spe: 1 })) {
          this.add("-immune", target, "[from] ability: Wind Force");
        }
        return null;
      }
    },
    onAllyTryHitSide(target, source, move) {
      if (source === this.effectState.target || !target.isAlly(source))
        return;
      if (move.type === "Flying" || move.type === "Wind") {
        this.boost({ spe: 1 }, this.effectState.target);
      }
    },
    isBreakable: true,
    name: "Wind Force",
    rating: 3,
    num: 3165
  },
  windturbine: {
    onStart(pokemon) {
      const side = pokemon.side;
      const tailwind = side.sideConditions["tailwind"];
      if (!tailwind) {
        this.add("-activate", pokemon, "ability: Wind Turbine");
        side.addSideCondition("tailwind", pokemon);
      }
    },
    name: "Wind Turbine",
    rating: 4,
    num: 3166
  },
  wizardstome: {
    onStart(source) {
      this.field.setTerrain("wonderroom");
    },
    name: "Wizard's Tome",
    rating: 4,
    num: 3167
  },
  xenoforce: {
    onModifyAtk(atk) {
      if (this.field.isTerrain("gravity")) {
        return this.chainModify(1.3);
      }
    },
	onModifySpa(Spa) {
      if (this.field.isTerrain("gravity")) {
        return this.chainModify(1.3);
      }
    },
    name: "Xenoforce",
    rating: 3,
    num: 3168
  }
};
//# sourceMappingURL=abilities.js.map

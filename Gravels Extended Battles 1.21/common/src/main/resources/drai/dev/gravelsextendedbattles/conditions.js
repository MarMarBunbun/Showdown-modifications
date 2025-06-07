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
var conditions_exports = {};
__export(conditions_exports, {
  Conditions: () => Conditions
});
module.exports = __toCommonJS(conditions_exports);
const Conditions = {
  fbt: {
    name: "fbt",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.id === "frostbiteorb") {
        this.add("-status", target, "fbt", "[from] item: Frostbite Orb");
      } else if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "fbt", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "fbt");
      }
    },
    // Damage reduction is handled directly in the sim/battle.js damage function
    onResidualOrder: 10,
    onResidual(pokemon) {
      this.damage(pokemon.baseMaxhp / 16);
    },
	onBeforeMovePriority: 10,
    onBeforeMove(pokemon, target, move) {
      if (move.flags["defrost"])
        return;
      if (this.randomChance(1, 5)) {
        pokemon.cureStatus();
        return;
      }
      this.add("cant", pokemon, "fbt");
      return false;
    },
    onModifyMove(move, pokemon) {
      if (move.flags["defrost"]) {
        this.add("-curestatus", pokemon, "fbt", "[from] move: " + move);
        pokemon.clearStatus();
      }
    },
    onAfterMoveSecondary(target, source, move) {
      if (move.thawsTarget) {
        target.cureStatus();
      }
    },
    onDamagingHit(damage, target, source, move) {
      if (move.type === "Fire" && move.category !== "Status") {
        target.cureStatus();
      }
    }
  },
  raindance: {
    name: "RainDance",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("damprock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella") || defender.hasAbility("hydrophobic"))
        return;
      if (move.type === "Water") {
        this.debug("rain water boost");
        return this.chainModify(1.5);
      }
      if (move.type === "Fire") {
        this.debug("rain fire suppress");
        return this.chainModify(0.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "RainDance", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "RainDance");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "RainDance", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  acidrain: {
    name: "AcidRain",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("foulrock")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Poison") {
        this.debug("acid rain poison boost");
        return this.chainModify(1.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "AcidRain", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "AcidRain");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "AcidRain", "[upkeep]");
      this.eachEvent("Weather");
    },
	onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  battleaura: {
    name: "Battle Aura",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("energychannelizer")) {
        return 8;
      }
      return 5;
    },
    onModifyCritRatio(critRatio) {
      return critRatio + 1;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "BattleAura", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "BattleAura");
      }
    },
	onModifyMove(move, attacker, defender) {
      // Allow Fighting-type moves to hit Ghost-type Pokémon
      if (move.type === "Fighting" && defender.hasType("Ghost")) {
        move.ignoreImmunity = true;
      }
    },
	onTryBoost(boost, target, source, effect) {
      if (source && target === source) {
        return;
      }
      if (target.hasType("Fighting")) {
        for (const stat in boost) {
          if (boost[stat] < 0) {
              delete boost[stat];
          if (!effect.secondaries) {
              this.add("-fail", target, "unboost", stat, "[from] weather: BattleAura");
            }
          }
        }
      }
	},
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "BattleAura", "[upkeep]");
      if (this.field.isWeather("BattleAura"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  cursedwinds: {
    name: "Cursed Winds",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("energychannelizer")) {
        return 8;
      }
      return 5;
    },
    // This should be applied directly to the stat before any of the other modifiers are chained
    // So we give it increased priority.
    onModifySpDPriority: 10,
    onModifySpD(spd, pokemon) {
      if (pokemon.hasType("Ghost") && this.field.isWeather("cursedwinds")) {
        return this.modify(spd, 1.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5 || source?.ability === "arenacurse")
          this.effectState.duration = 0;
        this.add("-weather", "CursedWinds", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "CursedWinds");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "CursedWinds", "[upkeep]");
      if (this.field.isWeather("cursedwinds"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  darkness: {
    name: "Darkness",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("darkrock")) {
        return 8;
      }
      return 5;
    },
	onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Ghost" || move.type === "Dark") {
        this.debug("darkness ghost boost");
        return this.chainModify(1.5);
      }
      if (move.type === "Fairy") {
        this.debug("darkness fairy suppress");
        return this.chainModify(0.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Darkness", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Darkness");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Darkness", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  duststorm: {
    name: "Dust Storm",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("volatilespray")) {
        return 8;
      }
      return 5;
    },
	onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Electric") {
        this.debug("Dust Storm fairy suppress");
        return this.chainModify(0.5);
      }
    },
	onModifySpePriority: 10,
    onModifySpe(spe, pokemon) {
      if (pokemon.hasType("Ground") && this.field.isWeather("duststorm")) {
        return this.modify(spe, 1.5);
      }
    },
	onModifyMove(move, attacker, defender) {
      // Allow Ground-type moves to hit Flying-type Pokémon
      if (move.type === "Ground" && defender.hasType("Flying")) {
        move.ignoreImmunity = true;
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "DustStorm", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "DustStorm");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "DustStorm", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  dragonforce: {
    name: "Dragon Force",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("energychannelizer")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "DragonForce", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "DragonForce");
      }
    },
	onModifyAtkPriority: 5,
	onModifyAtk(atk, pokemon) {
      if (pokemon.hasType("Dragon") && this.field.isWeather("DragonForce")) {
        this.debug("Dragon Force boost Dragon-type Atk");
        return this.chainModify(1.15);
      }
	},
	onModifySpAPriority: 5,
	onModifySpA(spa, pokemon) {
      if (pokemon.hasType("Dragon") && this.field.isWeather("DragonForce")) {
        this.debug("Dragon Force boost Dragon-type SpA");
        return this.chainModify(1.15);
      }
	},
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "DragonForce", "[upkeep]");
      if (this.field.isWeather("DragonForce"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  eclipse: {
    name: "Eclipse",
    effectType: "Weather",
    duration: 5,
    onModifyMove(move) {
      // Increase secondary effect chances for Psychic, Ghost and Dark type moves
      const boostedTypes = ["Psychic", "Ghost", "Dark"];
      if (boostedTypes.includes(move.type) && move.secondaries) {
        for (const secondary of move.secondaries) {
          secondary.chance = Math.min(100, secondary.chance + 30);
        }
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Eclipse", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Eclipse");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      // Inflict Nightmare damage on sleeping non-Psychic/Ghost/Dark types
      this.eachEvent("Nightmare");
    },
	onTryAddVolatile(status, target) {
      // Curse won't affect Psychic/Ghost/Dark/Cosmic types
	  if (status.id === 'curse' && target.hasType(["Psychic", "Ghost", "Dark"])) {
        return null;
	  }
    },
	onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  fairydust: {
    name: "Fairy Dust",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("volatilespray")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "FairyDust", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "FairyDust");
      }
	  // Apply boost to Bug and Poison type Pokémon when the weather starts
      for (const pokemon of this.getAllActive()) {
        if (!pokemon.hasType("Fairy") && pokemon.ability !== "bubblehelm") {
          this.add("-activate", pokemon, "FairyDust");
          this.boost({evasion: -1}, pokemon);
        }
      }
    },
	onSwitchIn(pokemon) {
      if (!pokemon.hasType("Fairy") && pokemon.ability !== "bubblehelm") {
        this.add("-activate", pokemon, "FairyDust");
        this.boost({evasion: -1}, pokemon);
      }
    },
	onModifySpdPriority: 10,
    onModifySpd(spd, pokemon) {
      if (pokemon.hasType("Fairy") && this.field.isWeather("fairydust")) {
        return this.modify(spd, 1.25);
      }
    },
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "FairyDust", "[upkeep]");
      this.eachEvent("Weather");
      for (const pokemon of this.getAllActive()) {
        if (!pokemon.hasType("Ghost") && !pokemon.hasType("Dragon") && !pokemon.hasType("Eldritch")) {
          this.heal(pokemon.baseMaxhp / 16, pokemon);
        }
      }
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  fallout: {
    name: "Fallout",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("smoothrock")) {
        return 8;
      }
      return 5;
    },
    // This should be applied directly to the stat before any of the other modifiers are chained
    // So we give it increased priority.
    onModifySpDPriority: 10,
    onModifySpD(spd, pokemon) {
      if (pokemon.hasType("Nuclear") && this.field.isWeather("Fallout")) {
        return this.modify(spd, 1.5);
      }
    },
	onModifyDefPriority: 10,
    onModifyDef(def, pokemon) {
      if (pokemon.hasType("Nuclear") && this.field.isWeather("Fallout")) {
        return this.modify(def, 1.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Fallout", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Fallout");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Fallout", "[upkeep]");
      if (this.field.isWeather("Fallout"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  fog: {
    name: "Fog",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("weatherballoon")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Fog", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Fog");
      }
    },
	onModifyMove(move, attacker, defender) {
      // Allow Normal-type moves to hit Ghost-type Pokémon
      if (move.type === "Normal" && defender.hasType("Ghost")) {
        move.ignoreImmunity = true;
      }
      // Apply 10% accuracy debuff to non-Normal-type moves
      if (
        move.type !== "Normal" &&
        move.type !== "Psychic" &&
        move.type !== "Ghost" &&
        !attacker.hasAbility("keeneye") &&
		!attacker.hasAbility("droughtproof")
      ) {
        move.accuracy *= 0.9;
      }
	},
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Fog", "[upkeep]");
      if (this.field.isWeather("Fog"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  hail: {
    name: "Hail",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("icyrock")) {
        return 8;
      }
      return 5;
    },
	onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Ice") {
        this.debug("Hail ice boost");
        return this.chainModify(1.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Hail", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Hail");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Hail", "[upkeep]");
      if (this.field.isWeather("hail"))
        this.eachEvent("Weather");
    },
    onWeather(target) {
      // Check if any active Pokémon has the "Sleet" ability
      const sleetActive = this.getAllActive().some(pokemon =>
        pokemon.ability === "sleet" && !pokemon.ignoringAbility()
      );

      const damageFraction = sleetActive ? 1 / 5 : 1 / 16;
      this.damage(target.baseMaxhp * damageFraction);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  magnetosphere: {
    name: "Magneto Sphere",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("energychannelizer")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Magnetosphere", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Magnetosphere");
      }
    },
	onModifyMovePriority: 8,
    onModifyMove(move, attacker, defender) {
      // Steel-type moves become perfectly accurate
      if (move.type === "Steel") {
        move.accuracy = true;
      }
      // Electric-type moves become perfectly accurate against Steel-type Pokémon
      if (move.type === "Electric" && defender.hasType("Steel")) {
        move.accuracy = true;
      }
    },
	onModifySpDPriority: 6,
	onModifySpD(spd, pokemon) {
      // Boost Special Defense of Steel-type Pokémon by 25%
      if (pokemon.hasType("Steel") && this.field.isWeather("Magnetosphere")) {
        return this.chainModify(1.25);
      }
	},
	onTrapPokemon(pokemon) {
      if (pokemon.hasType("Steel") && this.field.isWeather("Magnetosphere")) {
        pokemon.tryTrap();
      }
	},
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Magnetosphere", "[upkeep]");
      if (this.field.isWeather("Magnetosphere"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  pheromones: {
    name: "Pheromones",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("volatilespray")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Pheromones", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Pheromones");
      }
	  // Apply boost to Bug and Poison type Pokémon when the weather starts
      for (const pokemon of this.getAllActive()) {
        if (pokemon.hasType("Bug") || pokemon.hasType("Poison")) {
          this.add("-activate", pokemon, "Pheromones");
          this.boost({spe: 1, accuracy: 1}, pokemon);
        }
      }
    },
	onSwitchIn(pokemon) {
      if (pokemon.hasType("Bug") || pokemon.hasType("Poison")) {
        this.add("-activate", pokemon, "Pheromones");
        this.boost({spe: 1, accuracy: 1}, pokemon);
      }
    },
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Pheromones", "[upkeep]");
      if (this.field.isWeather("Pheromones"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  pollenstorm: {
    name: "Pollen Storm",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("volatilespray")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5 || source?.ability === "arenabloom")
          this.effectState.duration = 0;
        this.add("-weather", "PollenStorm", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "PollenStorm");
      }
    },
	onModifySpAPriority: 10,
    onModifySpA(spa, attacker, move) {
      // Don't reduce SpA for Bug- or Grass-type Pokémon or those with the Bubblehelm ability
      if (
        !attacker.hasType("Bug") &&
        !attacker.hasType("Grass") &&
        attacker.ability !== "bubblehelm"
      ) {
        this.debug("Pollen Storm suppress");
        return this.chainModify(0.5);
      }
    },
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "PollenStorm", "[upkeep]");
      if (this.field.isWeather("PollenStorm"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  psychicfield: {
    name: "Psychic Field",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("energychannelizer")) {
        return 8;
      }
      return 5;
    },
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Psychic") {
        this.debug("Psychic Field Psychic boost");
        return this.chainModify(1.5);
      }
      if (move.type === "Dark") {
        this.debug("Psychic Field Dark suppress");
        return this.chainModify(0.5);
      }
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "PsychicField", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "PsychicField");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "PsychicField", "[upkeep]");
      this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  shadowyaura: {
    name: "Shadowy Aura",
    effectType: "Weather",
    duration: 5,
    // This should be applied directly to the stat before any of the other modifiers are chained
    // So we give it increased priority.
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Shadow") {
        this.debug("Shadowy Aura shadow boost");
        return this.chainModify(1.5);
      }
    },
	onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "ShadowyAura", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "ShadowyAura");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "ShadowyAura", "[upkeep]");
      if (this.field.isWeather("shadowyaura"))
        this.eachEvent("Weather");
    },
	onWeather(target) {
      this.damage(target.baseMaxhp / 16);
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  smog: {
    name: "Smog",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("volatilespray")) {
        return 8;
      }
      return 5;
    },
    onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Smog", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Smog");
      }
    },
	onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Smog", "[upkeep]");
      this.eachEvent("Weather");
      for (const pokemon of this.getAllActive()) {
        if (
          !pokemon.hasType("Poison") &&
          !pokemon.hasType("Steel") &&
          !pokemon.status &&
          pokemon.ability !== "bubblehelm"
        ) {
          pokemon.trySetStatus("psn", pokemon.side.foe.active[0]);
        }
      }
    },
	onFieldEnd() {
      this.add("-weather", "none");
    }
  },
  thunderstorm: {
    name: "Thunderstorm",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("damprock") || source?.hasItem("energychannelizer")) {
        return 8;
      }
      return 5;
    },
    // This should be applied directly to the stat before any of the other modifiers are chained
    // So we give it increased priority.
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Electric") {
        this.debug("Thunderstorm electric boost");
        return this.chainModify(1.5);
      }
    },
	onFieldStart(field, source, effect) {
      if (effect?.effectType === "Ability") {
        if (this.gen <= 5)
          this.effectState.duration = 0;
        this.add("-weather", "Thunderstorm", "[from] ability: " + effect.name, "[of] " + source);
      } else {
        this.add("-weather", "Thunderstorm");
      }
    },
    onFieldResidualOrder: 1,
    onFieldResidual() {
      this.add("-weather", "Thunderstorm", "[upkeep]");
      if (this.field.isWeather("thunderstorm"))
        this.eachEvent("Weather");
    },
    onFieldEnd() {
      this.add("-weather", "none");
    }
  }
};
//# sourceMappingURL=conditions.js.map

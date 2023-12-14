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
  fst: {
    name: "fst",
    effectType: "Status",
    onStart(target, source, sourceEffect) {
      if (sourceEffect && sourceEffect.id === "coldorb") {
        this.add("-status", target, "fst", "[from] item: Cold Orb");
      } else if (sourceEffect && sourceEffect.effectType === "Ability") {
        this.add("-status", target, "fst", "[from] ability: " + sourceEffect.name, "[of] " + source);
      } else {
        this.add("-status", target, "fst");
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
      this.add("cant", pokemon, "fst");
      return false;
    },
    onModifyMove(move, pokemon) {
      if (move.flags["defrost"]) {
        this.add("-curestatus", pokemon, "fst", "[from] move: " + move);
        pokemon.clearStatus();
      }
    },
    onAfterMoveSecondary(target, source, move) {
      if (move.thawsTarget) {
        target.cureStatus();
      }
    }
  },
  // weather is implemented here since it's so important to the game
  acidrain: {
    name: "AcidRain",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("damprock")) {
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
  darkness: {
    name: "Darkness",
    effectType: "Weather",
    duration: 5,
    onWeatherModifyDamage(damage, attacker, defender, move) {
      if (defender.hasItem("utilityumbrella"))
        return;
      if (move.type === "Ghost" || type === "Dark") {
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
      this.damage(target.baseMaxhp / 16);
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
  thunderstorm: {
    name: "Thunderstorm",
    effectType: "Weather",
    duration: 5,
    durationCallback(source, effect) {
      if (source?.hasItem("damprock")) {
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

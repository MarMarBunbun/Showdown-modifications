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
var scripts_exports = {};
__export(scripts_exports, {
  Scripts: () => Scripts
});
module.exports = __toCommonJS(scripts_exports);
const Scripts = {
  inherit: "base",
  getEffectiveness(move, target) {
    const targetTypes = target.types;

    if (move.type !== "Shadow") {
      // Default behavior for non-Shadow types
      let totalEffectiveness = 0;
      for (const type of targetTypes) {
        totalEffectiveness += this.dex.getEffectiveness(move.type, type);
      }
      return totalEffectiveness;
    }

    // Custom Shadow behavior
    let typeMods = [];

    for (const type of targetTypes) {
      let typeMod = this.dex.getEffectiveness(move.type, type);

      if (type === "Questionmark" || type === "Crystal") {
        typeMod = 0; // Neutral
      } else if (type === "Light" || type === "Eldritch") {
        typeMod = 2; // Resisted
      } else {
        typeMod = 1; // Super-effective
      }

      typeMods.push(typeMod);
    }

    // Count how many of each effectiveness stage
    const counts = {
      0: typeMods.filter(mod => mod === 0).length,
      1: typeMods.filter(mod => mod === 1).length,
      2: typeMods.filter(mod => mod === 2).length,
    };

    let resultEffectiveness = 0;

    if (counts[1] === typeMods.length) {
      // All are super-effective
      resultEffectiveness = 1;
    } else if (counts[2] === typeMods.length) {
      // All are resisted
      resultEffectiveness = 2;
    } else if (counts[1] > 0 && counts[2] === 0) {
      // Any super-effective and no resisted = super-effective
      resultEffectiveness = 1;
    } else if (counts[2] > 0 && counts[1] === 0) {
      // Any resisted and no super-effective = resisted
      resultEffectiveness = 2;
    } else {
      // Mixed or all neutral = neutral
      resultEffectiveness = 0;
    }

    return resultEffectiveness;
  }
};
//# sourceMappingURL=scripts.js.map

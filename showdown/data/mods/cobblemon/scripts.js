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

    const hasSuperEffective = typeMods.includes(1);
    const hasResisted = typeMods.includes(2);

    if (hasSuperEffective && !hasResisted) {
      return 1; // Super-effective
    } else if (!hasSuperEffective && hasResisted) {
      return 2; // Resisted
    } else {
      return 0; // Neutral (includes mixed 1 and 2 or all 0)
    }
  }
};
//# sourceMappingURL=scripts.js.map

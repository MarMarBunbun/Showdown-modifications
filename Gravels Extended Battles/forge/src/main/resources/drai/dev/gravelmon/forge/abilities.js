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
  }
};
//# sourceMappingURL=abilities.js.map
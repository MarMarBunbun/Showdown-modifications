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
  amplifier: {
    name: "Amplifier",
    spritenum: 3143,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "sound") {
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
    spritenum: 687,
    onTakeItem: false,
    zMove: "Biggest Bang",
    zMoveFrom: "Big Bang",
    itemUser: ["Arkhaos"],
    num: 3159,
    gen: 7,
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
      if (move && move.type === "blood") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3146,
    gen: 2
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
  crystalgem: {
    name: "Cosmic Gem",
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
	onPlate: "Ditial",
    forcedForme: "Arceus-Digital",
    num: 3085,
    gen: 7,
    isNonstandard: "Past"
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
  ereader: {
    name: "E-Reader",
    spritenum: 3138,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "digital") {
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
  gamecartridge: {
    name: "Game Cartridge",
    spritenum: 3136,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "questionmark") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3136,
    gen: 2
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
      if (move && move.type === "wind") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3144,
    gen: 2
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
  lightbulb: {
    name: "Lightbulb",
    spritenum: 3139,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "light") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3139,
    gen: 2
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
      if (move && move.type === "crystal") {
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
  moisturecream: {
    name: "Moisture Cream",
    spritenum: 3142,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "slime") {
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
  radiumgoggles: {
    name: "Radium Goggles",
    spritenum: 3140,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "nuclear") {
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
      if (move && move.type === "eldritch") {
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
  toypickaxe: {
    name: "Toy Pickaxe",
    spritenum: 3141,
    fling: {
      basePower: 30
    },
    onBasePowerPriority: 15,
    onBasePower(basePower, user, target, move) {
      if (move && move.type === "plastic") {
        return this.chainModify([4915, 4096]);
      }
    },
    num: 3141,
    gen: 2
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

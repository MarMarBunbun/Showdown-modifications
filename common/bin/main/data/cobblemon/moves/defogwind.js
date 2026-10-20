{
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
}

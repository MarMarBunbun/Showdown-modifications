{
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
}

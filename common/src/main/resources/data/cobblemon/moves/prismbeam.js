{
    num: 3826,
    accuracy: 100,
    basePower: 90,
    category: "Special",
    name: "Prism Beam",
    pp: 10,
    priority: 0,
    flags: { protect: 1, mirror: 1, beam: 1 },
    onModifyType(move, pokemon) {
      let type = pokemon.getTypes()[0];
      if (type === "Bird")
        type = "???";
      if (type === "Stellar")
        type = pokemon.getTypes(false, true)[0];
      move.type = type;
    },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Beautiful"
}

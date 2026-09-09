{
    num: 3002,
    accuracy: true,
    basePower: 50,
    category: "Physical",
    name: "Achilles Heel",
    pp: 15,
    priority: 0,
	onEffectiveness(typeMod, target, type) {
      if (type === "Normal" || type === "Fire" || type === "Water" || type === "Electric" || type === "Grass" || type === "Ice" || type === "Fighting" || type === "Poison" || type === "Ground" || type === "Flying" || type === "Psychic" || type === "Bug" || type === "Rock" || type === "Dragon" || type === "Dark" || type === "Steel" || type === "Fairy" || type === "Wind" || type === "Cosmic" || type === "Sound" || type === "Nuclear" || type === "Digital" || type === "Plastic" || type === "Light" || type === "Crystal" || type === "Slime" || type === "Blood")
        return 1;
    },
    flags: { contact: 1, protect: 1, mirror: 1 },
    secondary: null,
    target: "normal",
    type: "Normal",
    contestType: "Cool"
}

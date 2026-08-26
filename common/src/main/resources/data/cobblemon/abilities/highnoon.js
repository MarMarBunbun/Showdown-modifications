{
    onModifyPriority(priority, pokemon, target, move) {
      if (move && !['Detect', 'Endure', 'Protect', 'Quick Guard', 'Wide Guard'].includes(move.name)) {
        return 0;
      }
      return priority;
    },
	onFoeModifyPriority(priority, pokemon, target, move) {
      if (move && !['Detect', 'Endure', 'Protect', 'Quick Guard', 'Wide Guard'].includes(move.name)) {
        return 0;
      }
      return priority;
    },
    name: "High Noon",
    rating: 4,
    num: 3082
}

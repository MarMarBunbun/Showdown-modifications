{
    onStart(pokemon) {
      let totalatk = 0;
      let totalspa = 0;
      for (const target of pokemon.foes()) {
        totalatk += target.getStat("atk", false, true);
        totalspa += target.getStat("spa", false, true);
      }
      if (totalatk && totalatk >= totalspa) {
        this.boost({ def: 1 });
      } else if (totalspa) {
        this.boost({ spd: 1 });
      }
    },
    flags: {},
    name: "Holy Guard",
    rating: 3.5,
    num: 3174
}

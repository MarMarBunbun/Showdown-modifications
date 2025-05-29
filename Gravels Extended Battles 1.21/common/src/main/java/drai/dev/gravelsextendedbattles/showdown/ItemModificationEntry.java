package drai.dev.gravelsextendedbattles.showdown;

public class ItemModificationEntry {
    private final String speciesId;
    String userSpeciesName;
    String megaStoneName;
    String resultingMega;

    public ItemModificationEntry(String speciesId, String userSpeciesName, String megaStoneName, String resultingMega) {
        this.userSpeciesName = userSpeciesName;
        this.megaStoneName = megaStoneName;
        this.resultingMega = resultingMega;
        this.speciesId = speciesId;
    }

    public String getShowdownItemId() {
        return megaStoneName.toLowerCase().replaceAll("_","").replaceAll(" ","");
    }

    public String getEntry(int num) {
        var userSpecies = showdownSafeName(userSpeciesName);
        return String.format(
            """
              ,
              %s: {
                  name: "%s",
                  spritenum: 3028,
                  megaStone: "%s",
                  megaEvolves: "%s",
                  itemUser: ["%s"],
                  onTakeItem(item, source) {
                    if(item.megaEvolves.includes('-')) {
                      const splitItem = item.megaEvolves.split('-');
                      return !splitItem[0].toUpperCase()===source.baseSpecies.baseSpecies.toUpperCase() &&
                        !splitItem[1].toUpperCase()===source.baseSpecies.forme.toUpperCase();
                    }
                    if (source.baseSpecies.forme !== "")
                      return true;
                    if (item.megaEvolves === source.baseSpecies.baseSpecies)
                      return false;
                    return true;
                  },
                  num: %d,
                  gen: 6,
                  isNonstandard: "Past"
                }
            """, getShowdownItemId(), capitalizeWords(megaStoneName.replaceAll("_"," ")), showdownSafeName(resultingMega), showdownSafeName(speciesId), userSpecies, num);
    }

    private String showdownSafeName(String name) {
        return capitalizeWords(name.toLowerCase()).replaceAll(" ", "-");
    }

    public static String capitalizeWords(String input) {
        String[] words = input.split(" ");
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            if (!word.isEmpty()) {
                result.append(Character.toUpperCase(word.charAt(0)))
                        .append(word.substring(1));
            }
            if (i < words.length - 1) {
                result.append(" ");
            }
        }

        return result.toString();
    }
}

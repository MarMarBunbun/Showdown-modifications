package drai.dev.gravelsextendedbattles.showdown.neoforge;

import net.neoforged.fml.loading.*;

public class ShowdownFolderLocatorImpl {
    public static String getShowdownFolder(){
        return FMLPaths.GAMEDIR.get().toString()+"/showdown/data/mods/cobblemon/";
    }
}

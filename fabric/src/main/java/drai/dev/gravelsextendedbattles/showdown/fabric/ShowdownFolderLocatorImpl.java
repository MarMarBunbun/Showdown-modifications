package drai.dev.gravelsextendedbattles.showdown.fabric;

import net.fabricmc.loader.api.*;

public class ShowdownFolderLocatorImpl {
    public static String getShowdownFolder(){
        return FabricLoader.getInstance().getGameDir().toString()+"/showdown/data/mods/cobblemon/";
    }
}

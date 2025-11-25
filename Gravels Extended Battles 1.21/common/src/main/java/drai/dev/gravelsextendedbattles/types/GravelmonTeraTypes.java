package drai.dev.gravelsextendedbattles.types;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.*;

import java.util.*;
import java.util.function.*;

public class GravelmonTeraTypes {
    public static final Map<TeraType, ChatFormatting> TERA_TYPES_TO_CHAT_FORMATTING = new HashMap<>();
    public static TeraType BLOOD;
    public static TeraType COSMIC;
    public static TeraType CRYSTAL;
    public static TeraType DIGITAL;
    public static TeraType ELDRITCH;
    public static TeraType LIGHT;
    public static TeraType QUESTIONMARK;
    public static TeraType NUCLEAR;
    public static TeraType PLASTIC;
    public static TeraType SHADOW;
    public static TeraType SLIME;
    public static TeraType SOUND;
    public static TeraType WIND;

    public static TeraType addTeraType(Function<ElementalType, TeraType> func, ElementalType elementalType, ChatFormatting chatFormatting) {
        var teraType = func.apply(elementalType);
        GravelsExtendedBattlesItems.touch();
        var shard = GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.get(elementalType.getName().toLowerCase());
        GravelsExtendedBattlesItems.TERA_SHARD_SUPPLIERS.put(shard, teraType);
        GravelmonTeraTypes.TERA_TYPES_TO_CHAT_FORMATTING.put(teraType, chatFormatting);
        return teraType;
    }
}

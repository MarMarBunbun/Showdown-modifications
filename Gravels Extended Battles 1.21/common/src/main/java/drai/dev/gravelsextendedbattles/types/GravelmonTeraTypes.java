package drai.dev.gravelsextendedbattles.types;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.ibm.icu.impl.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.*;
import net.minecraft.world.item.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

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

    public static void getTeraShardForType(Iterable<ElementalType> types, CallbackInfoReturnable<Item> cir) {
        for (var type : types) {
            var teraShard = GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.get(type.getName().toLowerCase());
            if (teraShard != null) {
                cir.setReturnValue(teraShard.get());
                cir.cancel();
                return;
            }
        }
    }
}

package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.types.tera.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.world.item.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

public class GravelmonTeraTypeHelper {
    private static boolean initialized = false;
    public static final Map<Item, TeraType> TERA_SHARDS = new HashMap<>();
    private static void init(){
        GravelsExtendedBattlesItems.TERA_SHARD_SUPPLIERS.forEach((item, teraType) -> {
            if (teraType != null) {
                TERA_SHARDS.put(item.get(), teraType);
            }
        });
        initialized = true;
    }

    public static void getTeraTypeFromShard(Item item, CallbackInfoReturnable<TeraType> cir) {
        if (!initialized) {
            init();
        }
        var teraShard = TERA_SHARDS.get(item);
        if(teraShard != null) {
            cir.setReturnValue(teraShard);
            cir.cancel();
        }
    }
}

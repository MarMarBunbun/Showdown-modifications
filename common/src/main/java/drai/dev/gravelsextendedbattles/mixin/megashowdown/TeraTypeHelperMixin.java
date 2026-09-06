package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.github.yajatkaul.mega_showdown.utils.*;
import drai.dev.gravelsextendedbattles.registries.*;
import net.minecraft.world.item.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(TeraHelper.class)
public class TeraTypeHelperMixin {

    /*@Inject(method = "getType", at = @At("HEAD"), cancellable = true)
    private static void injected(Item item, CallbackInfoReturnable<TeraType> cir) {
        getTeraTypeFromShard(item, cir);
    }

    @Inject(method = "getGlowColorForTeraType", at = @At("HEAD"), cancellable = true)
    private static void injected(TeraType teraType, CallbackInfoReturnable<ChatFormatting> cir) {
        var formatting = GravelmonTeraTypes.TERA_TYPES_TO_CHAT_FORMATTING.get(teraType);
        if(formatting != null) {
            cir.setReturnValue(formatting);
            cir.cancel();
        }
    }*/

    @Inject(method = "getTeraShardForType", at = @At("HEAD"), cancellable = true)
    private static void injected(ElementalType type, CallbackInfoReturnable<Item> cir) {
        gravels_extended_battles$getTeraShardForType(type, cir);
    }

    @Unique
    private static void gravels_extended_battles$getTeraShardForType(ElementalType type, CallbackInfoReturnable<Item> cir) {
        var teraShard = GEBItems.teraShardsByType.get(type);
        if (teraShard != null) {
            cir.setReturnValue(teraShard);
            cir.cancel();
        }
    }
}

package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.yajatkaul.mega_showdown.utility.*;
import drai.dev.gravelsextendedbattles.registries.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.*;
import net.minecraft.world.item.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

@Mixin(TeraTypeHelper.class)
public class TeraTypeHelperMixin {

    @Inject(method = "getType", at = @At("HEAD"), cancellable = true)
    private static void injected(Item item, CallbackInfoReturnable<TeraType> cir) {
        var teraShard = GravelsExtendedBattlesItems.TERA_SHARDS.get(item);
        if(teraShard != null) {
            cir.setReturnValue(teraShard);
            cir.cancel();
        }
    }

    @Inject(method = "getGlowColorForTeraType", at = @At("HEAD"), cancellable = true)
    private static void injected(TeraType teraType, CallbackInfoReturnable<ChatFormatting> cir) {
        var formatting = GravelmonTeraTypes.TERA_TYPES_TO_CHAT_FORMATTING.get(teraType);
        if(formatting != null) {
            cir.setReturnValue(formatting);
            cir.cancel();
        }
    }

    @Inject(method = "getTeraShardForType", at = @At("HEAD"), cancellable = true)
    private static void injected(Iterable<ElementalType> types, CallbackInfoReturnable<Item> cir) {
        GravelmonTeraTypes.getTeraShardForType(types, cir);
    }
}

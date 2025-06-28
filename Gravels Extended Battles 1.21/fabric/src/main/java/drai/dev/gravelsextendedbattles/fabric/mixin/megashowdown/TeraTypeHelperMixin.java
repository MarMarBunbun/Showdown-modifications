package drai.dev.gravelsextendedbattles.fabric.mixin.megashowdown;

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

import static drai.dev.gravelsextendedbattles.mixinimpl.GravelmonTeraTypeHelper.getTeraTypeFromShard;

@Mixin(TeraTypeHelper.class)
public class TeraTypeHelperMixin {

    @Inject(method = "getType", at = @At("HEAD"), cancellable = true)
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
    }

    @Inject(method = "getTeraShardForType", at = @At("HEAD"), cancellable = true)
    private static void injected(Iterable<ElementalType> types, CallbackInfoReturnable<Item> cir) {
        gravels_extended_battles$getTeraShardForType(types, cir);
    }

    @Unique
    private static void gravels_extended_battles$getTeraShardForType(Iterable<ElementalType> types, CallbackInfoReturnable<Item> cir) {
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

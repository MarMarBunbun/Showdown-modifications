package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.api.types.tera.elemental.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.registries.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.*;
import net.minecraft.resources.*;
import net.minecraft.util.*;
import org.intellij.lang.annotations.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;

@Mixin(TeraTypes.class)
public abstract class TeraTypesMixin {
    @Unique
    private static boolean initializing= false;

    @Final
    @Shadow
    private static HashMap<ResourceLocation, TeraType> types;

    @Unique
    private static boolean isInit = false;
    @Inject(method = "create", at = @At("HEAD"))
    private void injected(ResourceLocation id, TeraType type, CallbackInfoReturnable<TeraType> cir) {
        if(!isInit && !initializing){
            initializing = true;

            GravelmonTeraTypes.BLOOD = addTeraType(GravelmonElementalTypes.BLOOD, ChatFormatting.DARK_RED);
            GravelmonTeraTypes.COSMIC = addTeraType(GravelmonElementalTypes.COSMIC, ChatFormatting.DARK_PURPLE);
            GravelmonTeraTypes.CRYSTAL = addTeraType(GravelmonElementalTypes.CRYSTAL, ChatFormatting.AQUA);
            GravelmonTeraTypes.DIGITAL = addTeraType(GravelmonElementalTypes.DIGITAL, ChatFormatting.GREEN);
            GravelmonTeraTypes.ELDRITCH = addTeraType(GravelmonElementalTypes.ELDRITCH, ChatFormatting.DARK_RED);
            GravelmonTeraTypes.LIGHT = addTeraType(GravelmonElementalTypes.LIGHT, ChatFormatting.YELLOW);
            GravelmonTeraTypes.QUESTIONMARK = addTeraType(GravelmonElementalTypes.QUESTIONMARK, ChatFormatting.AQUA);
            GravelmonTeraTypes.NUCLEAR = addTeraType(GravelmonElementalTypes.NUCLEAR, ChatFormatting.GREEN);
            GravelmonTeraTypes.PLASTIC = addTeraType(GravelmonElementalTypes.PLASTIC, ChatFormatting.GOLD);
            GravelmonTeraTypes.SHADOW = addTeraType(GravelmonElementalTypes.SHADOW, ChatFormatting.DARK_GRAY);
            GravelmonTeraTypes.SLIME = addTeraType(GravelmonElementalTypes.SLIME, ChatFormatting.GREEN);
            GravelmonTeraTypes.SOUND = addTeraType(GravelmonElementalTypes.SOUND, ChatFormatting.GRAY);
            GravelmonTeraTypes.WIND = addTeraType(GravelmonElementalTypes.WIND, ChatFormatting.AQUA);

            initializing = false;
            isInit=true;
        }
    }

    private TeraType addTeraType(ElementalType elementalType, ChatFormatting chatFormatting) {
        var teraType = create(ResourceLocation.fromNamespaceAndPath("cobblemon", elementalType.getName()), new ElementalTypeTeraType(elementalType));
        GravelsExtendedBattlesItems.touch();
        var shard = GravelsExtendedBattlesItems.TERA_SHARDS_BY_TYPE_NAME.get(elementalType.getName().toLowerCase());
        GravelsExtendedBattlesItems.TERA_SHARD_SUPPLIERS.put(shard, teraType);
        GravelmonTeraTypes.TERA_TYPES_TO_CHAT_FORMATTING.put(teraType, chatFormatting);
        return teraType;
    }

    @Unique
    private TeraType create(ResourceLocation id, TeraType type) {
        return types.put(id, type);
    }
}

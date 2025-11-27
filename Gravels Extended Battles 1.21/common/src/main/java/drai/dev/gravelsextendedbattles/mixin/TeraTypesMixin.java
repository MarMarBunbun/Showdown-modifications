package drai.dev.gravelsextendedbattles.mixin;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.api.types.tera.elemental.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.registries.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.*;
import net.minecraft.resources.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.injection.*;
import org.spongepowered.asm.mixin.injection.callback.*;

import java.util.*;
import java.util.function.*;

import static drai.dev.gravelsextendedbattles.types.GravelmonTeraTypes.*;

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
            var func = (Function<ElementalType, TeraType>) elementalType -> create(ResourceLocation.fromNamespaceAndPath("cobblemon", elementalType.getName()), new ElementalTypeTeraType(elementalType));
            GravelmonTeraTypes.BLOOD = addTeraType(func, GravelmonElementalTypes.BLOOD, ChatFormatting.DARK_RED);
            GravelmonTeraTypes.COSMIC = addTeraType(func, GravelmonElementalTypes.COSMIC, ChatFormatting.DARK_PURPLE);
            GravelmonTeraTypes.CRYSTAL = addTeraType(func, GravelmonElementalTypes.CRYSTAL, ChatFormatting.AQUA);
            GravelmonTeraTypes.DIGITAL = addTeraType(func, GravelmonElementalTypes.DIGITAL, ChatFormatting.GREEN);
            GravelmonTeraTypes.ELDRITCH = addTeraType(func, GravelmonElementalTypes.ELDRITCH, ChatFormatting.DARK_RED);
            GravelmonTeraTypes.LIGHT = addTeraType(func, GravelmonElementalTypes.LIGHT, ChatFormatting.YELLOW);
            GravelmonTeraTypes.QUESTIONMARK = addTeraType(func, GravelmonElementalTypes.QUESTIONMARK, ChatFormatting.AQUA);
            GravelmonTeraTypes.NUCLEAR = addTeraType(func, GravelmonElementalTypes.NUCLEAR, ChatFormatting.GREEN);
            GravelmonTeraTypes.PLASTIC = addTeraType(func, GravelmonElementalTypes.PLASTIC, ChatFormatting.GOLD);
            GravelmonTeraTypes.SHADOW = addTeraType(func, GravelmonElementalTypes.SHADOW, ChatFormatting.DARK_GRAY);
            GravelmonTeraTypes.SLIME = addTeraType(func, GravelmonElementalTypes.SLIME, ChatFormatting.GREEN);
            GravelmonTeraTypes.SOUND = addTeraType(func, GravelmonElementalTypes.SOUND, ChatFormatting.GRAY);
            GravelmonTeraTypes.WIND = addTeraType(func, GravelmonElementalTypes.WIND, ChatFormatting.AQUA);
            GravelsExtendedBattles.TERA_TYPES_INITIATED = true;
            initializing = false;
            isInit=true;
        }
    }

    @Unique
    private static TeraType create(ResourceLocation id, TeraType type) {
        types.put(id, type);
        return type;
    }
}

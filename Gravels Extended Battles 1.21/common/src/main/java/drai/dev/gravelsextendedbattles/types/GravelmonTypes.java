package drai.dev.gravelsextendedbattles.types;

import com.cobblemon.mod.common.api.data.*;
import com.cobblemon.mod.common.api.types.*;
import net.minecraft.network.chat.*;
import net.minecraft.resources.*;

import java.util.function.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.*;

public class GravelmonTypes {
    private static boolean isInit = false;
    private static Function<ElementalType, ElementalType> registrationFunction;
    public static void initializeTypes(Function<ElementalType, ElementalType> implementationRegistrationFunction){
        if(!isInit){
            registrationFunction = implementationRegistrationFunction;
            GravelmonElementalTypes.COSMIC = createType("cosmic", 0x8832e5);
            GravelmonElementalTypes.CRYSTAL = createType("crystal", 0x35c3a0);
            GravelmonElementalTypes.DIGITAL = createType("digital", 0x305630);
            GravelmonElementalTypes.LIGHT = createType("light", 0xdad360);
            GravelmonElementalTypes.NUCLEAR = createType("nuclear", 0xa1d018);
            GravelmonElementalTypes.PLASTIC = createType("plastic", 0xc76e3d);
            GravelmonElementalTypes.QUESTIONMARK = createType("questionmark", 0x5b8c9e);
            GravelmonElementalTypes.SHADOW = createType("shadow", 0x222241);
            GravelmonElementalTypes.SLIME = createType("slime", 0x75e47b);
            GravelmonElementalTypes.SOUND = createType("sound", 0x64768e);
            GravelmonElementalTypes.WIND = createType("wind", 0x98c1b0);
            GravelmonElementalTypes.ELDRITCH = createType("eldritch", 0x962c46);
            GravelmonElementalTypes.BLOOD = createType("blood", 0x74170f);
            System.out.println("finished adding new types");
            isInit=true;
        }
    }

    private static ElementalType createType(String typeName, int hue) {
        var type = new ElementalType(typeName, Component.translatable("cobblemon.type."+typeName),
                hue,TYPE_COUNT,
                ResourceLocation.fromNamespaceAndPath("gravelmon",
                        "types/"+typeName+".png"), ShowdownIdentifiable.Companion.getREGEX$common().replace(typeName.toLowerCase(), ""));
        TYPE_COUNT++;
        var elementalType = registrationFunction.apply(type);

        GravelmonElementalTypes.NEW_TYPES.add(elementalType);
        return elementalType;
    }
}

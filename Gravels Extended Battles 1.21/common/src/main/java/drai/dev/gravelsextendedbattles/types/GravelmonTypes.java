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
            GravelmonElementalTypes.COSMIC = createType("cosmic", 0x9738ff);
            GravelmonElementalTypes.CRYSTAL = createType("crystal", 0xa1fbe8);
            GravelmonElementalTypes.DIGITAL = createType("digital", 0x2dd92d);
            GravelmonElementalTypes.LIGHT = createType("light", 0xfffccd);
            GravelmonElementalTypes.NUCLEAR = createType("nuclear", 0xc3f531);
            GravelmonElementalTypes.PLASTIC = createType("plastic", 0xebb459);
            GravelmonElementalTypes.QUESTIONMARK = createType("questionmark", 0x5fd0ae);
            GravelmonElementalTypes.SHADOW = createType("shadow", 0x272748);
            GravelmonElementalTypes.SLIME = createType("slime", 0x75e47b);
            GravelmonElementalTypes.SOUND = createType("sound", 0x4c5981);
            GravelmonElementalTypes.WIND = createType("wind", 0x45efa8);
            GravelmonElementalTypes.ELDRITCH = createType("eldritch", 0x962c46);
            GravelmonElementalTypes.BLOOD = createType("blood", 0x761310);
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

package drai.dev.gravelsextendedbattles.mixinimpl;

import com.cobblemon.mod.common.api.types.*;
import drai.dev.gravelsextendedbattles.*;
import net.minecraft.text.*;
import net.minecraft.util.*;

import java.util.function.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.TYPE_COUNT;

public class GravelmonTypes {
    private static boolean isInit = false;
    private static Function<ElementalType, ElementalType> registrationFunction;
    public static void initializeTypes(Function<ElementalType, ElementalType> implementationRegistrationFunction){
        if(!isInit){
            registrationFunction = implementationRegistrationFunction;
            GravelsExtendedBattles.NEW_TYPES.add(createType("cosmic", 0x780fd5));
            GravelsExtendedBattles.NEW_TYPES.add(createType("crystal", 0xa1fbe8));
            GravelsExtendedBattles.NEW_TYPES.add(createType("digital", 0x9caac5));
            GravelsExtendedBattles.NEW_TYPES.add(createType("light", 0xfffccd));
            GravelsExtendedBattles.NEW_TYPES.add(createType("nuclear", 0x8feb3b));
            GravelsExtendedBattles.NEW_TYPES.add(createType("plastic", 0xebb459));
            GravelsExtendedBattles.NEW_TYPES.add(createType("questionmark", 0x5fd0ae));
            GravelsExtendedBattles.NEW_TYPES.add(createType("shadow", 0x272748));
            GravelsExtendedBattles.NEW_TYPES.add(createType("slime", 0x75e47b));
            GravelsExtendedBattles.NEW_TYPES.add(createType("sound", 0x59bfa6));
            GravelsExtendedBattles.NEW_TYPES.add(createType("wind", 0x6eefb6));
            GravelsExtendedBattles.NEW_TYPES.add(createType("eldritch", 0x962c46));
            System.out.println("finished adding new types");
            isInit=true;
        }
    }

    private static ElementalType createType(String typeName, int hue) {
        var type = new ElementalType(typeName, Text.translatable("cobblemon.type."+typeName),
                hue,TYPE_COUNT,
                new Identifier("gravelmon",
                        "types/"+typeName+".png"));
        TYPE_COUNT++;
        return registrationFunction.apply(type);
    }
}
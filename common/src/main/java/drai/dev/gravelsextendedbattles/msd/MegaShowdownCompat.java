package drai.dev.gravelsextendedbattles.msd;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.github.yajatkaul.mega_showdown.components.*;
import com.github.yajatkaul.mega_showdown.creative.*;
import com.github.yajatkaul.mega_showdown.item.custom.form_change.*;
import com.github.yajatkaul.mega_showdown.item.custom.tera.*;
import com.github.yajatkaul.mega_showdown.item.custom.z.*;
import com.github.yajatkaul.mega_showdown.utils.*;
import drai.dev.gravelsextendedbattles.*;
import net.minecraft.resources.*;
import net.minecraft.world.item.*;

import java.util.*;

public class MegaShowdownCompat {
    public static Item registerTeraShardItem(ElementalType type) {
        return new TeraShard(
                new Item.Properties().stacksTo(50).arch$tab(MegaShowdownTabs.TERA_TAB),
                TeraTypes.forElementalType(type)
        );
    }

    public static Item registerZCrystal(String name, ElementalType type) {
        return new ElementalZCrystal(
                new Item.Properties()
                        .component(
                                MegaShowdownDataComponents.REGISTRY_TYPE_COMPONENT.get(),
                                RegistryLocator.Z_CRYSTAL_ITEM
                        )
                        .component(
                                MegaShowdownDataComponents.RESOURCE_LOCATION_COMPONENT.get(),
                                ResourceLocation.fromNamespaceAndPath(
                                        GravelsExtendedBattles.MOD_ID,
                                        name
                                )
                        ).arch$tab(MegaShowdownTabs.Z_TAB),
                List.of("Arceus"),
                true,
                type
        );
    }

    public static Item registerPlateItem(String type) {
        return registerFormChangeHeldItems(
                "multitype=normal",
                "multitype=" + type,
                new ArrayList<>(List.of("Arceus")),
                "mega_showdown:arceus_normal",
                true
        );
    }

    public static Item registerMemoryItem(String type) {
        return registerFormChangeHeldItems(
                "rks_memory=normal",
                "rks_memory=" + type,
                new ArrayList<>(List.of("Silvally")),
                "mega_showdown:silvally_normal_memory",
                true
        );
    }

    private static Item registerFormChangeHeldItems(
            String revertAspect,
            String applyAspect,
            List<String> pokemons,
            String effectId,
            boolean tradable
    ) {
        return new FormChangeHeldItem(
                new Item.Properties().arch$tab(MegaShowdownTabs.FORM_TAB),
                revertAspect,
                applyAspect,
                pokemons,
                effectId,
                tradable,
                null,
                null
        );
    }
}

package drai.dev.gravelsextendedbattles.registries;

import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.pokemon.helditem.*;
import dev.architectury.platform.*;
import dev.architectury.registry.registries.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.items.*;
import drai.dev.gravelsextendedbattles.loot.*;
import net.minecraft.core.registries.*;
import net.minecraft.network.chat.*;
import net.minecraft.resources.*;
import net.minecraft.world.item.*;

import java.util.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.MOD_ID;

public class GravelsExtendedBattlesItems {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(MOD_ID, Registries.ITEM);
    public static final Map<RegistrySupplier<Item>, RegistrySupplier<Item>> Z_CRYSTALS = new HashMap<>();
    public static final List<RegistrySupplier<Item>> PLATES = new ArrayList<>();
    public static final List<RegistrySupplier<Item>> GEMS = new ArrayList<>();
    public static final List<RegistrySupplier<Item>> MEMORIES = new ArrayList<>();
    public static final Map<RegistrySupplier<Item>, TeraType> TERA_SHARD_SUPPLIERS = new HashMap<>();
    public static final Map<Item, TeraType> TERA_SHARDS = new HashMap<>();
    public static final Map<String, RegistrySupplier<Item>> TERA_SHARDS_BY_TYPE_NAME = new HashMap<>();

    public static final RegistrySupplier<Item> BLOOD_GEM = registerGemItem("blood_gem", "mossy_oubliette_ruins", "deserted_town_center_ruins", "hidden_bunker_ruins");
    public static final RegistrySupplier<Item> COSMIC_GEM = registerGemItem("cosmic_gem", "mossy_oubliette_ruins", "luna_henge_ruins");
    public static final RegistrySupplier<Item> CRYSTAL_GEM = registerGemItem("crystal_gem", "deserted_town_center_ruins", "hidden_bunker_ruins");
    public static final RegistrySupplier<Item> DIGITAL_GEM = registerGemItem("digital_gem", "deserted_town_center_ruins", "luna_henge_ruins");
    public static final RegistrySupplier<Item> ELDRITCH_GEM = registerGemItem("eldritch_gem", "sol_henge_ruins", "stonjourner_henge_ruins");
    public static final RegistrySupplier<Item> LIGHT_GEM = registerGemItem("light_gem", "sol_henge_ruins", "stonjourner_henge_ruins");
    public static final RegistrySupplier<Item> QUESTIONMARK_GEM = registerGemItem("questionmark_gem", "crumbling_arch_ruins", "deserted_house_ruins");
    public static final RegistrySupplier<Item> NUCLEAR_GEM = registerGemItem("nuclear_gem", "rooted_arch_ruins", "crumbling_arch_ruins", "hidden_bunker_ruins");
    public static final RegistrySupplier<Item> PLASTIC_GEM = registerGemItem("plastic_gem", "unstable_cave_ruins", "deserted_house_ruins");
    public static final RegistrySupplier<Item> SHADOW_GEM = registerGemItem("shadow_gem", "fallen_statue_ruins", "luna_henge_ruins");
    public static final RegistrySupplier<Item> SLIME_GEM = registerGemItem("slime_gem", "rooted_arch_ruins", "decaying_crypt_ruins");
    public static final RegistrySupplier<Item> SOUND_GEM = registerGemItem("sound_gem", "toppled_pillars_ruins", "fallen_statue_ruins", "decaying_crypt_ruins");
    public static final RegistrySupplier<Item> WIND_GEM = registerGemItem("wind_gem", "toppled_pillars_ruins", "fallen_statue_ruins");

    public static final RegistrySupplier<Item> BLOOD_PLATE = registerPlateItem("blood_plate");
    public static final RegistrySupplier<Item> COSMIC_PLATE = registerPlateItem("cosmic_plate");
    public static final RegistrySupplier<Item> CRYSTAL_PLATE = registerPlateItem("crystal_plate");
    public static final RegistrySupplier<Item> DIGITAL_PLATE = registerPlateItem("digital_plate");
    public static final RegistrySupplier<Item> ELDRITCH_PLATE = registerPlateItem("eldritch_plate");
    public static final RegistrySupplier<Item> LIGHT_PLATE = registerPlateItem("light_plate");
    public static final RegistrySupplier<Item> QUESTIONMARK_PLATE = registerPlateItem("questionmark_plate");
    public static final RegistrySupplier<Item> NUCLEAR_PLATE = registerPlateItem("nuclear_plate");
    public static final RegistrySupplier<Item> PLASTIC_PLATE = registerPlateItem("plastic_plate");
    public static final RegistrySupplier<Item> SHADOW_PLATE = registerPlateItem("shadow_plate");
    public static final RegistrySupplier<Item> SLIM_PLATE = registerPlateItem("slime_plate");
    public static final RegistrySupplier<Item> SOUND_PLATE = registerPlateItem("sound_plate");
    public static final RegistrySupplier<Item> WIND_PLATE = registerPlateItem("wind_plate");

    public static final RegistrySupplier<Item> BLOODIUM_Z = registerZCrystalItem("bloodium_z", BLOOD_GEM, "blood");
    public static final RegistrySupplier<Item> COSMIUM_Z = registerZCrystalItem("cosmium_z", COSMIC_GEM, "cosmic");
    public static final RegistrySupplier<Item> CRYSTALIUM_Z = registerZCrystalItem("crystalium_z", CRYSTAL_GEM, "crystal");
    public static final RegistrySupplier<Item> DIGIUM_Z = registerZCrystalItem("digium_z", DIGITAL_GEM, "digital");
    public static final RegistrySupplier<Item> ELDRIUM_Z = registerZCrystalItem("eldrium_z", ELDRITCH_GEM, "eldritch");
    public static final RegistrySupplier<Item> LIGHTINIUM = registerZCrystalItem("lightinium_z", LIGHT_GEM, "light");
    public static final RegistrySupplier<Item> MYSTERIUM_Z = registerZCrystalItem("mysterium_z", QUESTIONMARK_GEM, "mystery");
    public static final RegistrySupplier<Item> NUCLIUM_Z = registerZCrystalItem("nuclium_z", NUCLEAR_GEM, "nuclear");
    public static final RegistrySupplier<Item> PLASTINIUM_Z = registerZCrystalItem("plastinium_z", PLASTIC_GEM, "plastic");
    public static final RegistrySupplier<Item> SHADIUM_Z = registerZCrystalItem("shadium_z", SHADOW_GEM, "shadow");
    public static final RegistrySupplier<Item> SLIMIUM_Z = registerZCrystalItem("slimium_z", SLIME_GEM, "slime");
    public static final RegistrySupplier<Item> SOUNDIUM_Z = registerZCrystalItem("soundium_z", SOUND_GEM, "sound");
    public static final RegistrySupplier<Item> WINDIUM_Z = registerZCrystalItem("windium_z", WIND_GEM, "wind");

    public static final RegistrySupplier<Item> BLOOD_MEMORY = registerMemoryItem("blood_memory");
    public static final RegistrySupplier<Item> COSMIC_MEMORY = registerMemoryItem("cosmic_memory");
    public static final RegistrySupplier<Item> CRYSTAL_MEMORY = registerMemoryItem("crystal_memory");
    public static final RegistrySupplier<Item> DIGITAL_MEMORY = registerMemoryItem("digital_memory");
    public static final RegistrySupplier<Item> ELDRITCH_MEMORY = registerMemoryItem("eldritch_memory");
    public static final RegistrySupplier<Item> LIGHT_MEMORY = registerMemoryItem("light_memory");
    public static final RegistrySupplier<Item> QUESTIONMARK_MEMORY = registerMemoryItem("questionmark_memory");
    public static final RegistrySupplier<Item> NUCLEAR_MEMORY = registerMemoryItem("nuclear_memory");
    public static final RegistrySupplier<Item> PLASTIC_MEMORY = registerMemoryItem("plastic_memory");
    public static final RegistrySupplier<Item> SHADOW_MEMORY = registerMemoryItem("shadow_memory");
    public static final RegistrySupplier<Item> SLIM_MEMORY = registerMemoryItem("slime_memory");
    public static final RegistrySupplier<Item> SOUND_MEMORY = registerMemoryItem("sound_memory");
    public static final RegistrySupplier<Item> WIND_MEMORY = registerMemoryItem("wind_memory");

    public static final RegistrySupplier<Item> BLOOD_TERA_SHARD = registerTeraShardItem("blood_tera_shard");
    public static final RegistrySupplier<Item> COSMIC_TERA_SHARD = registerTeraShardItem("cosmic_tera_shard");
    public static final RegistrySupplier<Item> CRYSTAL_TERA_SHARD = registerTeraShardItem("crystal_tera_shard");
    public static final RegistrySupplier<Item> DIGITAL_TERA_SHARD = registerTeraShardItem("digital_tera_shard");
    public static final RegistrySupplier<Item> ELDRITCH_TERA_SHARD = registerTeraShardItem("eldritch_tera_shard");
    public static final RegistrySupplier<Item> LIGHT_TERA_SHARD = registerTeraShardItem("light_tera_shard");
    public static final RegistrySupplier<Item> QUESTIONMARK_TERA_SHARD = registerTeraShardItem("questionmark_tera_shard");
    public static final RegistrySupplier<Item> NUCLEAR_TERA_SHARD = registerTeraShardItem("nuclear_tera_shard");
    public static final RegistrySupplier<Item> PLASTIC_TERA_SHARD = registerTeraShardItem("plastic_tera_shard");
    public static final RegistrySupplier<Item> SHADOW_TERA_SHARD = registerTeraShardItem("shadow_tera_shard");
    public static final RegistrySupplier<Item> SLIM_TERA_SHARD = registerTeraShardItem("slime_tera_shard");
    public static final RegistrySupplier<Item> SOUND_TERA_SHARD = registerTeraShardItem("sound_tera_shard");
    public static final RegistrySupplier<Item> WIND_TERA_SHARD = registerTeraShardItem("wind_tera_shard");

    public static void touch() {

    }

    public static void register() {
        ITEMS.register();
    }

    public static RegistrySupplier<Item> registerZCrystalItem(String name, RegistrySupplier<Item> gem, String type){
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new ZCrystalItem(type, new Item.Properties()) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravelmon." + name + ".tooltip"));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        Z_CRYSTALS.put(register, gem);
        CobblemonHeldItemManager.INSTANCE.registerStackRemap(stack -> {
            if (stack.is(register.get())) return name.replaceAll("\\W", "");
            return null;
        });
        return register;
    }

    public static RegistrySupplier<Item> registerGemItem(String name, String... lootPoolResourceLocation) {
        RegistrySupplier<Item> register = registerHeldItem(name);
        GEMS.add(register);
        for (int i = 0; i < lootPoolResourceLocation.length; i++) {
            if(GravelsExtendedBattles.gravelmonConfig.getImplementedTypes().contains(name.replaceAll("_gem",""))){
                GravelmonFossilManager.addFossil(ResourceLocation.fromNamespaceAndPath("cobblemon", "ruins/common/"+lootPoolResourceLocation[i]), register);
            }
        }
        return register;
    }

    public static RegistrySupplier<Item> registerMemoryItem(String name){
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new MemoryItem(name.replaceAll("_memory", ""), new Item.Properties()) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravelmon." + name + ".tooltip"));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        MEMORIES.add(register);
        CobblemonHeldItemManager.INSTANCE.registerStackRemap(stack -> {
            if (stack.is(register.get())) return name.replaceAll("\\W", "");
            return null;
        });
        return register;
    }

    public static RegistrySupplier<Item> registerTeraShardItem(String name){
        if(Platform.isModLoaded("mega_showdown")){
            return MegaShowdownCompatItems.registerTeraShardItem(name);
        }
        RegistrySupplier<Item> register = registerItem(name, new Item(new Item.Properties().stacksTo(50)));
        TERA_SHARDS_BY_TYPE_NAME.put(name.replaceAll("_tera_shard", ""), register);
        return register;
    }

    public static RegistrySupplier<Item> registerPlateItem(String name){
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new PlateItem(name.replaceAll("_plate", ""), new Item.Properties()) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravelmon." + name + ".tooltip"));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        PLATES.add(register);
        CobblemonHeldItemManager.INSTANCE.registerStackRemap(stack -> {
            if (stack.is(register.get())) return name.replaceAll("\\W", "");
            return null;
        });
        return register;
    }

    private static RegistrySupplier<Item> registerHeldItem(String name) {
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new Item(new Item.Properties()) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravelmon." + name + ".tooltip"));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        CobblemonHeldItemManager.INSTANCE.registerStackRemap(stack -> {
            if (stack.is(register.get())) return name.replaceAll("\\W", "");
            return null;
        });
        return register;
    }

    static RegistrySupplier<Item> registerItem(String name, Item item) {
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> item);
        return register;
    }
}

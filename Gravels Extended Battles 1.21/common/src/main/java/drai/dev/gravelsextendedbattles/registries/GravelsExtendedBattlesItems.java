package drai.dev.gravelsextendedbattles.registries;

import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.item.interactive.*;
import com.cobblemon.mod.common.pokemon.helditem.*;
import dev.architectury.platform.*;
import dev.architectury.registry.registries.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.items.*;
import drai.dev.gravelsextendedbattles.loot.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.*;
import net.minecraft.core.registries.*;
import net.minecraft.network.chat.*;
import net.minecraft.resources.*;
import net.minecraft.world.item.*;

import java.util.*;
import java.util.function.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.FROSTBITE;
import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.MOD_ID;

public class GravelsExtendedBattlesItems {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(MOD_ID, Registries.ITEM);
    public static final Map<RegistrySupplier<TypedItem>, RegistrySupplier<TypedItem>> Z_CRYSTALS = new HashMap<>();
    public static final List<RegistrySupplier<? extends Item>> PLATES = new ArrayList<>();
    public static final List<RegistrySupplier<TypedItem>> GEMS = new ArrayList<>();
    public static final List<RegistrySupplier<TypedItem>> MEMORIES = new ArrayList<>();
    public static final List<RegistrySupplier<? extends Item>> HELD_ITEMS = new ArrayList<>();

    public static final Map<RegistrySupplier<Item>, TeraType> TERA_SHARD_SUPPLIERS = new HashMap<>();
    public static final Map<String, RegistrySupplier<Item>> TERA_SHARDS_BY_TYPE_NAME = new HashMap<>();

    public static final RegistrySupplier<TypedItem> BLOOD_GEM = registerGemItem("blood_gem", "mossy_oubliette_ruins", "deserted_town_center_ruins", "hidden_bunker_ruins");
    public static final RegistrySupplier<TypedItem> COSMIC_GEM = registerGemItem("cosmic_gem", "mossy_oubliette_ruins", "luna_henge_ruins");
    public static final RegistrySupplier<TypedItem> CRYSTAL_GEM = registerGemItem("crystal_gem", "deserted_town_center_ruins", "hidden_bunker_ruins");
    public static final RegistrySupplier<TypedItem> DIGITAL_GEM = registerGemItem("digital_gem", "deserted_town_center_ruins", "luna_henge_ruins");
    public static final RegistrySupplier<TypedItem> ELDRITCH_GEM = registerGemItem("eldritch_gem", "sol_henge_ruins", "stonjourner_henge_ruins");
    public static final RegistrySupplier<TypedItem> LIGHT_GEM = registerGemItem("light_gem", "sol_henge_ruins", "stonjourner_henge_ruins");
    public static final RegistrySupplier<TypedItem> QUESTIONMARK_GEM = registerGemItem("questionmark_gem", "crumbling_arch_ruins", "deserted_house_ruins");
    public static final RegistrySupplier<TypedItem> NUCLEAR_GEM = registerGemItem("nuclear_gem", "rooted_arch_ruins", "crumbling_arch_ruins", "hidden_bunker_ruins");
    public static final RegistrySupplier<TypedItem> PLASTIC_GEM = registerGemItem("plastic_gem", "unstable_cave_ruins", "deserted_house_ruins");
    public static final RegistrySupplier<TypedItem> SHADOW_GEM = registerGemItem("shadow_gem", "fallen_statue_ruins", "luna_henge_ruins");
    public static final RegistrySupplier<TypedItem> SLIME_GEM = registerGemItem("slime_gem", "rooted_arch_ruins", "decaying_crypt_ruins");
    public static final RegistrySupplier<TypedItem> SOUND_GEM = registerGemItem("sound_gem", "toppled_pillars_ruins", "fallen_statue_ruins", "decaying_crypt_ruins");
    public static final RegistrySupplier<TypedItem> WIND_GEM = registerGemItem("wind_gem", "toppled_pillars_ruins", "fallen_statue_ruins");

    public static final RegistrySupplier<Item> BLOOD_PLATE = registerPlateItem("ichor_plate", "blood");
    public static final RegistrySupplier<Item> COSMIC_PLATE = registerPlateItem("galaxy_plate", "cosmic");
    public static final RegistrySupplier<Item> CRYSTAL_PLATE = registerPlateItem("larimar_plate", "crystal");
    public static final RegistrySupplier<Item> DIGITAL_PLATE = registerPlateItem("binary_plate", "digital");
    public static final RegistrySupplier<Item> ELDRITCH_PLATE = registerPlateItem("unearthly_plate", "eldritch");
    public static final RegistrySupplier<Item> LIGHT_PLATE = registerPlateItem("lumen_plate", "light");
    public static final RegistrySupplier<Item> QUESTIONMARK_PLATE = registerPlateItem("mystery_plate", "questionmark");
    public static final RegistrySupplier<Item> NUCLEAR_PLATE = registerPlateItem("fission_plate", "nuclear");
    public static final RegistrySupplier<Item> PLASTIC_PLATE = registerPlateItem("polymer_plate", "plastic");
    public static final RegistrySupplier<Item> SHADOW_PLATE = registerPlateItem("penumbra_plate", "shadow");
    public static final RegistrySupplier<Item> SLIM_PLATE = registerPlateItem("sticky_plate", "slime");
    public static final RegistrySupplier<Item> SOUND_PLATE = registerPlateItem("bass_plate", "sound");
    public static final RegistrySupplier<Item> WIND_PLATE = registerPlateItem("cyclone_plate", "wind");

    public static final RegistrySupplier<TypedItem> BLOODIUM_Z = registerZCrystalItem("bloodium_z", BLOOD_GEM, "blood");
    public static final RegistrySupplier<TypedItem> COSMIUM_Z = registerZCrystalItem("cosmium_z", COSMIC_GEM, "cosmic");
    public static final RegistrySupplier<TypedItem> CRYSTALIUM_Z = registerZCrystalItem("crystalium_z", CRYSTAL_GEM, "crystal");
    public static final RegistrySupplier<TypedItem> DIGIUM_Z = registerZCrystalItem("digium_z", DIGITAL_GEM, "digital");
    public static final RegistrySupplier<TypedItem> ELDRIUM_Z = registerZCrystalItem("eldrium_z", ELDRITCH_GEM, "eldritch");
    public static final RegistrySupplier<TypedItem> LIGHTINIUM_Z = registerZCrystalItem("lightinium_z", LIGHT_GEM, "light");
    public static final RegistrySupplier<TypedItem> MYSTERIUM_Z = registerZCrystalItem("mysterium_z", QUESTIONMARK_GEM, "questionmark");
    public static final RegistrySupplier<TypedItem> NUCLIUM_Z = registerZCrystalItem("nuclium_z", NUCLEAR_GEM, "nuclear");
    public static final RegistrySupplier<TypedItem> PLASTINIUM_Z = registerZCrystalItem("plastinium_z", PLASTIC_GEM, "plastic");
    public static final RegistrySupplier<TypedItem> SHADIUM_Z = registerZCrystalItem("shadium_z", SHADOW_GEM, "shadow");
    public static final RegistrySupplier<TypedItem> SLIMIUM_Z = registerZCrystalItem("slimium_z", SLIME_GEM, "slime");
    public static final RegistrySupplier<TypedItem> SOUNDIUM_Z = registerZCrystalItem("soundium_z", SOUND_GEM, "sound");
    public static final RegistrySupplier<TypedItem> WINDIUM_Z = registerZCrystalItem("windium_z", WIND_GEM, "wind");

    public static final RegistrySupplier<TypedItem> BLOOD_MEMORY = registerMemoryItem("blood_memory");
    public static final RegistrySupplier<TypedItem> COSMIC_MEMORY = registerMemoryItem("cosmic_memory");
    public static final RegistrySupplier<TypedItem> CRYSTAL_MEMORY = registerMemoryItem("crystal_memory");
    public static final RegistrySupplier<TypedItem> DIGITAL_MEMORY = registerMemoryItem("digital_memory");
    public static final RegistrySupplier<TypedItem> ELDRITCH_MEMORY = registerMemoryItem("eldritch_memory");
    public static final RegistrySupplier<TypedItem> LIGHT_MEMORY = registerMemoryItem("light_memory");
    public static final RegistrySupplier<TypedItem> QUESTION_MARK_MEMORY = registerMemoryItem("question_mark_memory");
    public static final RegistrySupplier<TypedItem> NUCLEAR_MEMORY = registerMemoryItem("nuclear_memory");
    public static final RegistrySupplier<TypedItem> PLASTIC_MEMORY = registerMemoryItem("plastic_memory");
    public static final RegistrySupplier<TypedItem> SHADOW_MEMORY = registerMemoryItem("shadow_memory");
    public static final RegistrySupplier<TypedItem> SLIM_MEMORY = registerMemoryItem("slime_memory");
    public static final RegistrySupplier<TypedItem> SOUND_MEMORY = registerMemoryItem("sound_memory");
    public static final RegistrySupplier<TypedItem> WIND_MEMORY = registerMemoryItem("wind_memory");

    public static final RegistrySupplier<Item> BLOOD_TERA_SHARD = registerTeraShardItem("blood_tera_shard", GravelmonTeraTypes.BLOOD);
    public static final RegistrySupplier<Item> COSMIC_TERA_SHARD = registerTeraShardItem("cosmic_tera_shard", GravelmonTeraTypes.COSMIC);
    public static final RegistrySupplier<Item> CRYSTAL_TERA_SHARD = registerTeraShardItem("crystal_tera_shard", GravelmonTeraTypes.CRYSTAL);
    public static final RegistrySupplier<Item> DIGITAL_TERA_SHARD = registerTeraShardItem("digital_tera_shard", GravelmonTeraTypes.DIGITAL);
    public static final RegistrySupplier<Item> ELDRITCH_TERA_SHARD = registerTeraShardItem("eldritch_tera_shard", GravelmonTeraTypes.ELDRITCH);
    public static final RegistrySupplier<Item> LIGHT_TERA_SHARD = registerTeraShardItem("light_tera_shard", GravelmonTeraTypes.LIGHT);
    public static final RegistrySupplier<Item> QUESTIONMARK_TERA_SHARD = registerTeraShardItem("questionmark_tera_shard", GravelmonTeraTypes.QUESTIONMARK);
    public static final RegistrySupplier<Item> NUCLEAR_TERA_SHARD = registerTeraShardItem("nuclear_tera_shard", GravelmonTeraTypes.NUCLEAR);
    public static final RegistrySupplier<Item> PLASTIC_TERA_SHARD = registerTeraShardItem("plastic_tera_shard", GravelmonTeraTypes.PLASTIC);
    public static final RegistrySupplier<Item> SHADOW_TERA_SHARD = registerTeraShardItem("shadow_tera_shard", GravelmonTeraTypes.SHADOW);
    public static final RegistrySupplier<Item> SLIME_TERA_SHARD = registerTeraShardItem("slime_tera_shard", GravelmonTeraTypes.SLIME);
    public static final RegistrySupplier<Item> SOUND_TERA_SHARD = registerTeraShardItem("sound_tera_shard", GravelmonTeraTypes.SOUND);
    public static final RegistrySupplier<Item> WIND_TERA_SHARD = registerTeraShardItem("wind_tera_shard", GravelmonTeraTypes.WIND);


    public static final RegistrySupplier<Item> FROST_HEAL = ITEMS.register("frost_heal", () -> new StatusCureItem("item."+MOD_ID+".frost_heal", FROSTBITE));
    public static final RegistrySupplier<Item> MIDNIGHT_SEED = registerHeldItem("midnight_seed", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SNOWY_SEED = registerHeldItem("snowy_seed", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SHINING_SEED = registerHeldItem("shining_seed", ()->new Item(new Item.Properties()));

    public static void touch() {

    }

    public static void register() {
        ITEMS.register();
    }

    public static RegistrySupplier<TypedItem> registerZCrystalItem(String name, RegistrySupplier<TypedItem> gem, String type){
        RegistrySupplier<TypedItem> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new ZCrystalItem(type, new Item.Properties()) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        Z_CRYSTALS.put(register, gem);
        registerHeldItemLookup(name, register);
        return register;
    }

    public static RegistrySupplier<TypedItem> registerGemItem(String name, String... lootPoolResourceLocation) {
        RegistrySupplier<TypedItem> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new TypedItem(name.replaceAll("_gem", ""), new Item.Properties()) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                list.add(Component.translatable("tooltip.gravels_extended_battles.consumed_after_use.tooltip").withStyle(ChatFormatting.GRAY));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        GEMS.add(register);
        for (int i = 0; i < lootPoolResourceLocation.length; i++) {
            if(GravelsExtendedBattles.gravelmonConfig.getImplementedTypes().contains(name.replaceAll("_gem",""))){
                GravelmonFossilManager.addFossil(ResourceLocation.fromNamespaceAndPath("cobblemon", "ruins/common/"+lootPoolResourceLocation[i]), register);
            }
        }
        registerHeldItemLookup(name, register);
        return register;
    }

    public static RegistrySupplier<TypedItem> registerMemoryItem(String name){
        RegistrySupplier<TypedItem> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () ->
                new MemoryItem(name.replaceAll("_memory", ""), new Item.Properties().stacksTo(1)) {
            @Override
            public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
            }
        });
        MEMORIES.add(register);
        registerHeldItemLookup(name, register);
        return register;
    }

    public static RegistrySupplier<Item> registerTeraShardItem(String name, TeraType type){
        if(Platform.isModLoaded("mega_showdown")){
            return MegaShowdownCompatItems.registerTeraShardItem(name, type);
        }
        RegistrySupplier<Item> register = registerItem(name, ()-> new Item(new Item.Properties().stacksTo(50)));
        TERA_SHARDS_BY_TYPE_NAME.put(name.replaceAll("_tera_shard", ""), register);
        return register;
    }

    public static RegistrySupplier<Item> registerPlateItem(String name, String type){
        RegistrySupplier<Item> register;
        if(Platform.isModLoaded("mega_showdown")){
            register = MegaShowdownCompatItems.registerArceusPlateItem(name, type);
        } else {
            register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new PlateItem(type, new Item.Properties().stacksTo(1)) {
                @Override
                public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                    list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                    super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
                }
            });
        }
        PLATES.add(register);
        registerHeldItemLookup(name, register);
        return register;
    }

    private static void registerHeldItemLookup(String name, RegistrySupplier<? extends Item> register) {
        var heldItemName = name.toLowerCase().replaceAll("_", "");
        CobblemonHeldItemManager.INSTANCE.registerStackRemap(stack -> {
            if (stack.is(register.get())) return heldItemName;
            return null;
        });
    }

    static RegistrySupplier<Item> registerItem(String name, Supplier<Item> item) {
        return ITEMS.register(name.trim().replaceAll("\\W", ""), item);
    }

    static RegistrySupplier<Item> registerHeldItem(String name, Supplier<Item> item) {
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), item);
        registerHeldItemLookup(name, register);
        HELD_ITEMS.add(register);
        return register;
    }
}

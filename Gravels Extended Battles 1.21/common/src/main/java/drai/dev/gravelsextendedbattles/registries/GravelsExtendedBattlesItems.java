package drai.dev.gravelsextendedbattles.registries;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.item.interactive.*;
import com.cobblemon.mod.common.pokemon.helditem.*;
import dev.architectury.platform.*;
import dev.architectury.registry.registries.*;
import drai.dev.gravelsextendedbattles.*;
import drai.dev.gravelsextendedbattles.items.megashowdown.*;
import drai.dev.gravelsextendedbattles.loot.*;
import drai.dev.gravelsextendedbattles.types.*;
import net.minecraft.*;
import net.minecraft.core.registries.*;
import net.minecraft.network.chat.*;
import net.minecraft.resources.*;
import net.minecraft.world.item.*;

import java.util.*;
import java.util.function.*;

import static drai.dev.gravelsextendedbattles.GravelsExtendedBattles.*;

public class GravelsExtendedBattlesItems {
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(MOD_ID, Registries.ITEM);
    public static final Map<RegistrySupplier<Item>, RegistrySupplier<Item>> Z_CRYSTALS = new HashMap<>();
    public static final List<RegistrySupplier<? extends Item>> PLATES = new ArrayList<>();
    public static final List<RegistrySupplier<Item>> GEMS = new ArrayList<>();
    public static final List<RegistrySupplier<Item>> MEMORIES = new ArrayList<>();
    public static final List<RegistrySupplier<? extends Item>> HELD_ITEMS = new ArrayList<>();

    public static final Map<RegistrySupplier<Item>, TeraType> TERA_SHARD_SUPPLIERS = new HashMap<>();
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

    public static final RegistrySupplier<Item> BLOODIUM_Z = registerZCrystalItem("bloodium_z", BLOOD_GEM, "blood", ()-> GravelmonElementalTypes.BLOOD);
    public static final RegistrySupplier<Item> COSMIUM_Z = registerZCrystalItem("cosmium_z", COSMIC_GEM, "cosmic", ()->GravelmonElementalTypes.COSMIC);
    public static final RegistrySupplier<Item> CRYSTALIUM_Z = registerZCrystalItem("crystalium_z", CRYSTAL_GEM, "crystal", ()->GravelmonElementalTypes.CRYSTAL);
    public static final RegistrySupplier<Item> DIGIUM_Z = registerZCrystalItem("digium_z", DIGITAL_GEM, "digital", ()->GravelmonElementalTypes.DIGITAL);
    public static final RegistrySupplier<Item> ELDRIUM_Z = registerZCrystalItem("eldrium_z", ELDRITCH_GEM, "eldritch", ()->GravelmonElementalTypes.ELDRITCH);
    public static final RegistrySupplier<Item> LIGHTINIUM_Z = registerZCrystalItem("lightinium_z", LIGHT_GEM, "light", ()->GravelmonElementalTypes.LIGHT);
    public static final RegistrySupplier<Item> MYSTERIUM_Z = registerZCrystalItem("mysterium_z", QUESTIONMARK_GEM, "questionmark", ()->GravelmonElementalTypes.QUESTIONMARK);
    public static final RegistrySupplier<Item> NUCLIUM_Z = registerZCrystalItem("nuclium_z", NUCLEAR_GEM, "nuclear", ()->GravelmonElementalTypes.NUCLEAR);
    public static final RegistrySupplier<Item> PLASTINIUM_Z = registerZCrystalItem("plastinium_z", PLASTIC_GEM, "plastic", ()->GravelmonElementalTypes.PLASTIC);
    public static final RegistrySupplier<Item> SHADIUM_Z = registerZCrystalItem("shadium_z", SHADOW_GEM, "shadow", ()->GravelmonElementalTypes.SHADOW);
    public static final RegistrySupplier<Item> SLIMIUM_Z = registerZCrystalItem("slimium_z", SLIME_GEM, "slime", ()->GravelmonElementalTypes.SLIME);
    public static final RegistrySupplier<Item> SOUNDIUM_Z = registerZCrystalItem("soundium_z", SOUND_GEM, "sound", ()->GravelmonElementalTypes.SOUND);
    public static final RegistrySupplier<Item> WINDIUM_Z = registerZCrystalItem("windium_z", WIND_GEM, "wind", ()->GravelmonElementalTypes.WIND);

    public static final RegistrySupplier<Item> BLOOD_MEMORY = registerMemoryItem("blood_memory");
    public static final RegistrySupplier<Item> COSMIC_MEMORY = registerMemoryItem("cosmic_memory");
    public static final RegistrySupplier<Item> CRYSTAL_MEMORY = registerMemoryItem("crystal_memory");
    public static final RegistrySupplier<Item> DIGITAL_MEMORY = registerMemoryItem("digital_memory");
    public static final RegistrySupplier<Item> ELDRITCH_MEMORY = registerMemoryItem("eldritch_memory");
    public static final RegistrySupplier<Item> LIGHT_MEMORY = registerMemoryItem("light_memory");
    public static final RegistrySupplier<Item> QUESTION_MARK_MEMORY = registerMemoryItem("question_mark_memory");
    public static final RegistrySupplier<Item> NUCLEAR_MEMORY = registerMemoryItem("nuclear_memory");
    public static final RegistrySupplier<Item> PLASTIC_MEMORY = registerMemoryItem("plastic_memory");
    public static final RegistrySupplier<Item> SHADOW_MEMORY = registerMemoryItem("shadow_memory");
    public static final RegistrySupplier<Item> SLIM_MEMORY = registerMemoryItem("slime_memory");
    public static final RegistrySupplier<Item> SOUND_MEMORY = registerMemoryItem("sound_memory");
    public static final RegistrySupplier<Item> WIND_MEMORY = registerMemoryItem("wind_memory");

    public static final RegistrySupplier<Item> BLOOD_TERA_SHARD = registerTeraShardItem("blood_tera_shard", ()-> GravelmonTeraTypes.BLOOD);
    public static final RegistrySupplier<Item> COSMIC_TERA_SHARD = registerTeraShardItem("cosmic_tera_shard", ()->GravelmonTeraTypes.COSMIC);
    public static final RegistrySupplier<Item> CRYSTAL_TERA_SHARD = registerTeraShardItem("crystal_tera_shard", ()->GravelmonTeraTypes.CRYSTAL);
    public static final RegistrySupplier<Item> DIGITAL_TERA_SHARD = registerTeraShardItem("digital_tera_shard", ()->GravelmonTeraTypes.DIGITAL);
    public static final RegistrySupplier<Item> ELDRITCH_TERA_SHARD = registerTeraShardItem("eldritch_tera_shard", ()->GravelmonTeraTypes.ELDRITCH);
    public static final RegistrySupplier<Item> LIGHT_TERA_SHARD = registerTeraShardItem("light_tera_shard", ()->GravelmonTeraTypes.LIGHT);
    public static final RegistrySupplier<Item> QUESTIONMARK_TERA_SHARD = registerTeraShardItem("questionmark_tera_shard", ()->GravelmonTeraTypes.QUESTIONMARK);
    public static final RegistrySupplier<Item> NUCLEAR_TERA_SHARD = registerTeraShardItem("nuclear_tera_shard", ()->GravelmonTeraTypes.NUCLEAR);
    public static final RegistrySupplier<Item> PLASTIC_TERA_SHARD = registerTeraShardItem("plastic_tera_shard", ()->GravelmonTeraTypes.PLASTIC);
    public static final RegistrySupplier<Item> SHADOW_TERA_SHARD = registerTeraShardItem("shadow_tera_shard", ()->GravelmonTeraTypes.SHADOW);
    public static final RegistrySupplier<Item> SLIME_TERA_SHARD = registerTeraShardItem("slime_tera_shard", ()->GravelmonTeraTypes.SLIME);
    public static final RegistrySupplier<Item> SOUND_TERA_SHARD = registerTeraShardItem("sound_tera_shard", ()->GravelmonTeraTypes.SOUND);
    public static final RegistrySupplier<Item> WIND_TERA_SHARD = registerTeraShardItem("wind_tera_shard", ()->GravelmonTeraTypes.WIND);


    public static final RegistrySupplier<Item> FROST_HEAL = ITEMS.register("frost_heal", () -> new StatusCureItem("item."+MOD_ID+".frost_heal", FROSTBITE));
    public static final RegistrySupplier<Item> BLOOD_CRAYON = registerHeldItem("blood_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ELDRITCH_CRAYON = registerHeldItem("eldritch_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> WIND_CRAYON = registerHeldItem("wind_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SOUND_CRAYON = registerHeldItem("sound_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SLIME_CRAYON = registerHeldItem("slime_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SHADOW_CRAYON = registerHeldItem("shadow_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> QUESTIONMARK_CRAYON = registerHeldItem("questionmark_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> PLASTIC_CRAYON = registerHeldItem("plastic_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> NUCLEAR_CRAYON = registerHeldItem("nuclear_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> LIGHT_CRAYON = registerHeldItem("light_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> DIGITAL_CRAYON = registerHeldItem("digital_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> CRYSTAL_CRAYON = registerHeldItem("crystal_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> COSMIC_CRAYON = registerHeldItem("cosmic_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> WATER_CRAYON = registerHeldItem("water_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> STEEL_CRAYON = registerHeldItem("steel_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ROCK_CRAYON = registerHeldItem("rock_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> PSYCHIC_CRAYON = registerHeldItem("psychic_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> POISON_CRAYON = registerHeldItem("poison_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> NORMAL_CRAYON = registerHeldItem("normal_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ICE_CRAYON = registerHeldItem("ice_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> GROUND_CRAYON = registerHeldItem("ground_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> GRASS_CRAYON = registerHeldItem("grass_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> GHOST_CRAYON = registerHeldItem("ghost_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FLYING_CRAYON = registerHeldItem("flying_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FIRE_CRAYON = registerHeldItem("fire_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FIGHTING_CRAYON = registerHeldItem("fighting_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FAIRY_CRAYON = registerHeldItem("fairy_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ELECTRIC_CRAYON = registerHeldItem("electric_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> DRAGON_CRAYON = registerHeldItem("dragon_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> DARK_CRAYON = registerHeldItem("dark_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> BUG_CRAYON = registerHeldItem("bug_crayon", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> BLOOD_ERASER = registerHeldItem("blood_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ELDRITCH_ERASER = registerHeldItem("eldritch_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> WIND_ERASER = registerHeldItem("wind_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SOUND_ERASER = registerHeldItem("sound_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SLIME_ERASER = registerHeldItem("slime_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SHADOW_ERASER = registerHeldItem("shadow_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> QUESTIONMARK_ERASER = registerHeldItem("questionmark_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> PLASTIC_ERASER = registerHeldItem("plastic_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> NUCLEAR_ERASER = registerHeldItem("nuclear_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> LIGHT_ERASER = registerHeldItem("light_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> DIGITAL_ERASER = registerHeldItem("digital_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> CRYSTAL_ERASER = registerHeldItem("crystal_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> COSMIC_ERASER = registerHeldItem("cosmic_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> WATER_ERASER = registerHeldItem("water_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> STEEL_ERASER = registerHeldItem("steel_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ROCK_ERASER = registerHeldItem("rock_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> PSYCHIC_ERASER = registerHeldItem("psychic_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> POISON_ERASER = registerHeldItem("poison_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> NORMAL_ERASER = registerHeldItem("normal_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ICE_ERASER = registerHeldItem("ice_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> GROUND_ERASER = registerHeldItem("ground_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> GRASS_ERASER = registerHeldItem("grass_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> GHOST_ERASER = registerHeldItem("ghost_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FLYING_ERASER = registerHeldItem("flying_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FIRE_ERASER = registerHeldItem("fire_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FIGHTING_ERASER = registerHeldItem("fighting_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> FAIRY_ERASER = registerHeldItem("fairy_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> ELECTRIC_ERASER = registerHeldItem("electric_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> DRAGON_ERASER = registerHeldItem("dragon_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> DARK_ERASER = registerHeldItem("dark_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> BUG_ERASER = registerHeldItem("bug_eraser", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> POLARIZED_GLASS = registerHeldItem("polarized_glass", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> TRAINING_WHEELS = registerHeldItem("training_wheels", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> OLD_SHIELD = registerHeldItem("old_shield", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SHOCKING_ORB = registerHeldItem("shocking_orb", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> EARMUFFS = registerHeldItem("earmuffs", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> BOOK_OF_SIN = registerHeldItem("book_of_sin", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> MIDNIGHT_SEED = registerHeldItem("midnight_seed", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SNOWY_SEED = registerHeldItem("snowy_seed", ()->new Item(new Item.Properties()));
    public static final RegistrySupplier<Item> SHINING_SEED = registerHeldItem("shining_seed", ()->new Item(new Item.Properties()));
    private static boolean registered = false;

    public static void touch() {

    }

    public static void register() {
        ITEMS.register();
        registered = true;
    }

    public static RegistrySupplier<Item> registerZCrystalItem(String name, RegistrySupplier<Item> gem, String type, Supplier<ElementalType> elementalTypeSupplier) {
        RegistrySupplier<Item> register;
        if(Platform.isModLoaded("mega_showdown")){
            register = ITEMS.register(name, MegaShowdownCompatItems.registerZCrystalItem(name, elementalTypeSupplier));
        } else {
            register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new Item(new Item.Properties()) {
                @Override
                public void appendHoverText(ItemStack itemStack, Item.TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                    list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                    super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
                }
            });
        }
        Z_CRYSTALS.put(register, gem);
        registerHeldItemLookup(name, register);
        return register;
    }

    public static RegistrySupplier<Item> registerGemItem(String name, String... lootPoolResourceLocation) {
        RegistrySupplier<Item> register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new Item(new Item.Properties()) {
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

    public static RegistrySupplier<Item> registerMemoryItem(String name){
        RegistrySupplier<Item> register;
        var type = name.replaceAll("_memory", "");
        if(Platform.isModLoaded("mega_showdown")){
            register = MegaShowdownCompatItems.registerMemoryItem(name, type);
        } else {
            register = ITEMS.register(name.trim().replaceAll("\\W", ""), () ->
                    new Item(new Item.Properties().stacksTo(1)) {
                        @Override
                        public void appendHoverText(ItemStack itemStack, TooltipContext tooltipContext, List<Component> list, TooltipFlag tooltipFlag) {
                            list.add(Component.translatable("tooltip.gravels_extended_battles." + name + ".tooltip").withStyle(ChatFormatting.GRAY));
                            super.appendHoverText(itemStack, tooltipContext, list, tooltipFlag);
                        }
                    });
        }
        MEMORIES.add(register);
        registerHeldItemLookup(name, register);
        return register;
    }

    public static RegistrySupplier<Item> registerTeraShardItem(String name, Supplier<TeraType> type){
        RegistrySupplier<Item> register;
        if(Platform.isModLoaded("mega_showdown")){
            register = MegaShowdownCompatItems.registerTeraShardItem(name, type);
        } else {
            register = registerItem(name, ()-> new Item(new Item.Properties().stacksTo(50)));
        }
        TERA_SHARDS_BY_TYPE_NAME.put(name.replaceAll("_tera_shard", ""), register);
        return register;
    }

    public static RegistrySupplier<Item> registerPlateItem(String name, String type){
        RegistrySupplier<Item> register;
        if(Platform.isModLoaded("mega_showdown")){
            register = MegaShowdownCompatItems.registerArceusPlateItem(name, type);
        } else {
            register = ITEMS.register(name.trim().replaceAll("\\W", ""), () -> new Item(new Item.Properties().stacksTo(1)) {
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

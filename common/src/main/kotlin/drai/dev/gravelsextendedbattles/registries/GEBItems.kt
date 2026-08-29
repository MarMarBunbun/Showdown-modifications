package drai.dev.gravelsextendedbattles.registries

import com.cobblemon.mod.common.api.moves.Moves
import com.cobblemon.mod.common.item.interactive.StatusCureItem
import com.cobblemon.mod.common.platform.PlatformRegistry
import com.cobblemon.mod.common.pokemon.helditem.CobblemonHeldItemManager
import com.cobblemon.mod.common.util.cobblemonResource
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.additions.status.GravelmonStatus
import drai.dev.gravelsextendedbattles.fossils.GEBLootPoolManager
import drai.dev.gravelsextendedbattles.gravelmonResource
import drai.dev.gravelsextendedbattles.items.GEBArceusPlateItem
import drai.dev.gravelsextendedbattles.items.GEBMemoryItem
import drai.dev.gravelsextendedbattles.items.GEBTeraShardItem
import drai.dev.gravelsextendedbattles.items.GEBZCrystal
import net.minecraft.core.Registry
import net.minecraft.core.registries.BuiltInRegistries
import net.minecraft.core.registries.Registries
import net.minecraft.resources.ResourceKey
import net.minecraft.world.item.Item

object GEBItems : PlatformRegistry<Registry<Item>, ResourceKey<Registry<Item>>, Item>() {
    private val teraShardsByType = mutableMapOf<String, Item>()
    override val registry: Registry<Item> = BuiltInRegistries.ITEM
    override val resourceKey: ResourceKey<Registry<Item>> = Registries.ITEM

    val gems = mutableSetOf<Item>()
    val BLOOD_GEM = registerGemItem("blood_gem", "mossy_oubliette_ruins", "deserted_town_center_ruins", "hidden_bunker_ruins")
    val COSMIC_GEM = registerGemItem("cosmic_gem", "mossy_oubliette_ruins", "luna_henge_ruins")
    val CRYSTAL_GEM = registerGemItem("crystal_gem", "deserted_town_center_ruins", "hidden_bunker_ruins")
    val DIGITAL_GEM = registerGemItem("digital_gem", "deserted_town_center_ruins", "luna_henge_ruins")
    val ELDRITCH_GEM = registerGemItem("eldritch_gem", "sol_henge_ruins", "stonjourner_henge_ruins")
    val LIGHT_GEM = registerGemItem("light_gem", "sol_henge_ruins", "stonjourner_henge_ruins")
    val MYSTERY_GEM = registerGemItem("mystery_gem", "crumbling_arch_ruins", "deserted_house_ruins")
    val NUCLEAR_GEM = registerGemItem("nuclear_gem", "rooted_arch_ruins", "crumbling_arch_ruins", "hidden_bunker_ruins")
    val PLASTIC_GEM = registerGemItem("plastic_gem", "unstable_cave_ruins", "deserted_house_ruins")
    val SHADOW_GEM = registerGemItem("shadow_gem", "fallen_statue_ruins", "luna_henge_ruins")
    val SLIME_GEM = registerGemItem("slime_gem", "rooted_arch_ruins", "decaying_crypt_ruins")
    val SOUND_GEM = registerGemItem("sound_gem", "toppled_pillars_ruins", "fallen_statue_ruins", "decaying_crypt_ruins")
    val WIND_GEM = registerGemItem("wind_gem", "toppled_pillars_ruins", "fallen_statue_ruins")

    val plates = mutableSetOf<Item>()
    val BLOOD_PLATE = registerPlateItem("ichor_plate", "blood")
    val COSMIC_PLATE = registerPlateItem("galaxy_plate", "cosmic")
    val CRYSTAL_PLATE = registerPlateItem("larimar_plate", "crystal")
    val DIGITAL_PLATE = registerPlateItem("binary_plate", "digital")
    val ELDRITCH_PLATE = registerPlateItem("unearthly_plate", "eldritch")
    val LIGHT_PLATE = registerPlateItem("lumen_plate", "light")
    val MYSTERY_PLATE = registerPlateItem("mystery_plate", "mystery")
    val NUCLEAR_PLATE = registerPlateItem("fission_plate", "nuclear")
    val PLASTIC_PLATE = registerPlateItem("polymer_plate", "plastic")
    val SHADOW_PLATE = registerPlateItem("penumbra_plate", "shadow")
    val SLIM_PLATE = registerPlateItem("sticky_plate", "slime")
    val SOUND_PLATE = registerPlateItem("bass_plate", "sound")
    val WIND_PLATE = registerPlateItem("cyclone_plate", "wind")
    
    val zCrystals = mutableSetOf<Item>()
    val BLOODIUM_Z = registerZCrystalItem("bloodium_z", BLOOD_GEM, "blood")
    val COSMIUM_Z = registerZCrystalItem("cosmium_z", COSMIC_GEM, "cosmic")
    val CRYSTALIUM_Z = registerZCrystalItem("crystalium_z", CRYSTAL_GEM, "crystal")
    val DIGIUM_Z = registerZCrystalItem("digium_z", DIGITAL_GEM, "digital")
    val ELDRIUM_Z = registerZCrystalItem("eldrium_z", ELDRITCH_GEM, "eldritch")
    val LIGHTINIUM_Z = registerZCrystalItem("lightinium_z", LIGHT_GEM, "light")
    val MYSTERIUM_Z = registerZCrystalItem("mysterium_z", MYSTERY_GEM, "mystery")
    val NUCLIUM_Z = registerZCrystalItem("nuclium_z", NUCLEAR_GEM, "nuclear")
    val PLASTINIUM_Z = registerZCrystalItem("plastinium_z", PLASTIC_GEM, "plastic")
    val SHADIUM_Z = registerZCrystalItem("shadium_z", SHADOW_GEM, "shadow")
    val SLIMIUM_Z = registerZCrystalItem("slimium_z", SLIME_GEM, "slime")
    val SOUNDIUM_Z = registerZCrystalItem("soundium_z", SOUND_GEM, "sound")
    val WINDIUM_Z = registerZCrystalItem("windium_z", WIND_GEM, "wind")
    
    val memories = mutableSetOf<Item>()
    val BLOOD_MEMORY = registerMemoryItem("blood_memory")
    val COSMIC_MEMORY = registerMemoryItem("cosmic_memory")
    val CRYSTAL_MEMORY = registerMemoryItem("crystal_memory")
    val DIGITAL_MEMORY = registerMemoryItem("digital_memory")
    val ELDRITCH_MEMORY = registerMemoryItem("eldritch_memory")
    val LIGHT_MEMORY = registerMemoryItem("light_memory")
    val MYSTERY_MEMORY = registerMemoryItem("mystery_memory")
    val NUCLEAR_MEMORY = registerMemoryItem("nuclear_memory")
    val PLASTIC_MEMORY = registerMemoryItem("plastic_memory")
    val SHADOW_MEMORY = registerMemoryItem("shadow_memory")
    val SLIM_MEMORY = registerMemoryItem("slime_memory")
    val SOUND_MEMORY = registerMemoryItem("sound_memory")
    val WIND_MEMORY = registerMemoryItem("wind_memory")

    val teraShards = mutableSetOf<Item>()
    val BLOOD_TERA_SHARD = registerTeraShardItem("blood_tera_shard");
    val COSMIC_TERA_SHARD = registerTeraShardItem("cosmic_tera_shard");
    val CRYSTAL_TERA_SHARD = registerTeraShardItem("crystal_tera_shard");
    val DIGITAL_TERA_SHARD = registerTeraShardItem("digital_tera_shard");
    val ELDRITCH_TERA_SHARD = registerTeraShardItem("eldritch_tera_shard");
    val LIGHT_TERA_SHARD = registerTeraShardItem("light_tera_shard");
    val MYSTERY_TERA_SHARD = registerTeraShardItem("mystery_tera_shard");
    val NUCLEAR_TERA_SHARD = registerTeraShardItem("nuclear_tera_shard");
    val PLASTIC_TERA_SHARD = registerTeraShardItem("plastic_tera_shard");
    val SHADOW_TERA_SHARD = registerTeraShardItem("shadow_tera_shard");
    val SLIME_TERA_SHARD = registerTeraShardItem("slime_tera_shard");
    val SOUND_TERA_SHARD = registerTeraShardItem("sound_tera_shard");
    val WIND_TERA_SHARD = registerTeraShardItem("wind_tera_shard");
    
    val heldItems = mutableSetOf<Item>()
    val FROST_HEAL = create(gravelmonResource("frost_heal"), StatusCureItem("frost_heal", GravelmonStatus.FROSTBITE, block = GEBBlocks.FROST_HEAL));
    val POLARIZED_GLASS = heldItem("polarized_glass", Item(Item.Properties()))
    val TRAINING_WHEELS = heldItem("training_wheels", Item(Item.Properties()))
    val OLD_SHIELD = heldItem("old_shield", Item(Item.Properties()));
    val SHOCKING_ORB = heldItem("shocking_orb", Item(Item.Properties()));
    val EARMUFFS = heldItem("earmuffs", Item(Item.Properties()));
    val BOOK_OF_SIN = heldItem("book_of_sin", Item(Item.Properties()));
    val MIDNIGHT_SEED = heldItem("midnight_seed", Item(Item.Properties()));
    val SNOWY_SEED = heldItem("snowy_seed", Item(Item.Properties()));
    val SHINING_SEED = heldItem("shining_seed", Item(Item.Properties()));

    //TODO aprijuice items and pokedexes


    fun registerGemItem(name: String, vararg lootPoolResourceLocation: String): Item? {
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(name.replace("_gem".toRegex(), ""))) return null
        val item = heldItem(name)
        Moves
        gems.add(item)
        lootPoolResourceLocation.forEach { lootPool-> GEBLootPoolManager.addUncommonItemToLootPool(cobblemonResource("ruins/common/$lootPool"), item) }
        return item
    }

    fun registerZCrystalItem(name: String, gem: Item?, type: String): Item? {
        if(gem == null) return null
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(type)) return null
        val item = heldItem(name, GEBZCrystal(type))
        zCrystals.add(item)
        return item
    }

    fun registerPlateItem(name: String, type: String): Item? {
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(type)) return null
        val item = heldItem(name, GEBArceusPlateItem(type))
        plates.add(item)
        return item
    }

    fun registerMemoryItem(name: String): Item? {
        val type = name.replace("_memory".toRegex(), "")
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(type)) return null
        val item = heldItem(name, GEBMemoryItem(type))
        memories.add(item)
        return item
    }

    fun registerTeraShardItem(name: String): Item? {
        val type = name.replace("_tera_shard".toRegex(), "")
        if (!GravelsExtendedBattles.CONFIG.implementedTypes.contains(type)) return null
        val item = heldItem(name, GEBTeraShardItem(type))
        teraShards.add(item)
        teraShardsByType[type] = item
        return item
    }

    private fun heldItem(name: String): Item = heldItem(name, Item(Item.Properties()))

    private fun heldItem(name: String, item: Item): Item = create(gravelmonResource(name), item).also {
        CobblemonHeldItemManager.registerRemap(it, name.lowercase().replace("_",""))
    }
}
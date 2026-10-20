package drai.dev.gravelsextendedbattles.additions.types.tera

import com.cobblemon.mod.common.api.types.tera.TeraType
import com.cobblemon.mod.common.api.types.tera.TeraTypes
import com.cobblemon.mod.common.api.types.tera.elemental.ElementalTypeTeraType
import com.cobblemon.mod.common.util.cobblemonResource
import drai.dev.gravelsextendedbattles.additions.types.GravelmonElementalTypes
import drai.dev.gravelsextendedbattles.mixin.invokers.TeraTypesInvoker
import net.minecraft.resources.ResourceLocation

object GravelmonTeraTypes {
    val teraTypes = TeraTypes as TeraTypesInvoker

    @JvmStatic
    val COSMIC = this.createTeraType(cobblemonResource("cosmic"), ElementalTypeTeraType(GravelmonElementalTypes.COSMIC))

    @JvmStatic
    val CRYSTAL =
        this.createTeraType(cobblemonResource("crystal"), ElementalTypeTeraType(GravelmonElementalTypes.CRYSTAL))

    @JvmStatic
    val DIGITAL =
        this.createTeraType(cobblemonResource("digital"), ElementalTypeTeraType(GravelmonElementalTypes.DIGITAL))

    @JvmStatic
    val LIGHT = this.createTeraType(cobblemonResource("light"), ElementalTypeTeraType(GravelmonElementalTypes.LIGHT))

    @JvmStatic
    val NUCLEAR =
        this.createTeraType(cobblemonResource("nuclear"), ElementalTypeTeraType(GravelmonElementalTypes.NUCLEAR))

    @JvmStatic
    val PLASTIC =
        this.createTeraType(cobblemonResource("plastic"), ElementalTypeTeraType(GravelmonElementalTypes.PLASTIC))

    @JvmStatic
    val MYSTERY =
        this.createTeraType(cobblemonResource("mystery"), ElementalTypeTeraType(GravelmonElementalTypes.MYSTERY))

    @JvmStatic
    val SHADOW = this.createTeraType(cobblemonResource("shadow"), ElementalTypeTeraType(GravelmonElementalTypes.SHADOW))

    @JvmStatic
    val SLIME = this.createTeraType(cobblemonResource("slime"), ElementalTypeTeraType(GravelmonElementalTypes.SLIME))

    @JvmStatic
    val SOUND = this.createTeraType(cobblemonResource("sound"), ElementalTypeTeraType(GravelmonElementalTypes.SOUND))

    @JvmStatic
    val WIND = this.createTeraType(cobblemonResource("wind"), ElementalTypeTeraType(GravelmonElementalTypes.WIND))

    @JvmStatic
    val ELDRITCH =
        this.createTeraType(cobblemonResource("eldritch"), ElementalTypeTeraType(GravelmonElementalTypes.ELDRITCH))

    @JvmStatic
    val BLOOD = this.createTeraType(cobblemonResource("blood"), ElementalTypeTeraType(GravelmonElementalTypes.BLOOD))

    fun createTeraType(id: ResourceLocation, type: TeraType): TeraType {
        return teraTypes.invokeCreate(id, type)
    }

    @JvmStatic
    fun touch() {
        //do nothing except call clinit
    }
}
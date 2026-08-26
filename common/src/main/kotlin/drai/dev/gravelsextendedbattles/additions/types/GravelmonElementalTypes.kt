package drai.dev.gravelsextendedbattles.additions.types

import com.cobblemon.mod.common.api.types.ElementalType
import com.cobblemon.mod.common.api.types.ElementalTypes
import net.minecraft.network.chat.Component

object GravelmonElementalTypes {
    var TYPE_COUNT: Int = 18

    @JvmField
    val COSMIC = createType(
        name = "Cosmic",
        hue = 0x8832e5,
        primaryColor = 0xaf64ff,
        secondaryColor = 0xaf64ff
    )

    @JvmField
    val CRYSTAL = createType(
        name = "Crystal",
        hue = 0x35c3a0,
        primaryColor = 0x27a384,
        secondaryColor = 0x4aedd1
    )

    @JvmField
    val DIGITAL = createType(
        name = "Digital",
        hue = 0x305630,
        primaryColor = 0x1c381c,
        secondaryColor = 0x558d55
    )

    @JvmField
    val LIGHT = createType(
        name = "Light",
        hue = 0xdad360,
        primaryColor = 0xc3bc4b,
        secondaryColor = 0xf2ed96
    )

    @JvmField
    val NUCLEAR = createType(
        name = "Nuclear",
        hue = 0xa1d018,
        primaryColor = 0x5eb811,
        secondaryColor = 0xc3f531
    )

    @JvmField
    val PLASTIC = createType(
        name = "Plastic",
        hue = 0xc76e3d,
        primaryColor = 0xbb6131,
        secondaryColor = 0xf28245
    )

    @JvmField
    val MYSTERY = createType(
        name = "Mystery",
        hue = 0x5b8c9e,
        primaryColor = 0x79cca9,
        secondaryColor = 0xb7fae0
    )

    @JvmField
    val SHADOW = createType(
        name = "Shadow",
        hue = 0x222241,
        primaryColor = 0x15152a,
        secondaryColor = 0x35355a
    )

    @JvmField
    val SLIME = createType(
        name = "Slime",
        hue = 0x75e47b,
        primaryColor = 0x60b964,
        secondaryColor = 0xaff9b3
    )

    @JvmField
    val SOUND = createType(
        name = "Sound",
        hue = 0x64768e,
        primaryColor = 0x4a5b71,
        secondaryColor = 0x8392a6
    )

    @JvmField
    val WIND = createType(
        name = "Wind",
        hue = 0x98c1b0,
        primaryColor = 0x93ccd4,
        secondaryColor = 0xb9e7d4
    )

    @JvmField
    val ELDRITCH = createType(
        name = "Eldritch",
        hue = 0x962c46,
        primaryColor = 0x6c223e,
        secondaryColor = 0xb64b5a
    )

    @JvmField
    val BLOOD = createType(
        name = "Blood",
        hue = 0xFF7FE5,
        primaryColor = 0x540e08,
        secondaryColor = 0x9e271d
    )

    private fun createType(name: String, hue: Int, primaryColor: Int, secondaryColor: Int): ElementalType {
        val type = ElementalTypes.register(
            name, Component.translatable("cobblemon.type." + name.lowercase()),
            hue, TYPE_COUNT, primaryColor, secondaryColor
        )
        TYPE_COUNT++
        return type
    }
}
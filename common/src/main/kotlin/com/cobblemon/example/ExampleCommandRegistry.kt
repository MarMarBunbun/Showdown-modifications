package com.cobblemon.example

import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.mojang.brigadier.CommandDispatcher
import com.mojang.brigadier.context.CommandContext
import net.minecraft.commands.CommandBuildContext
import net.minecraft.commands.CommandSourceStack
import net.minecraft.commands.Commands
import net.minecraft.network.chat.Component
import net.minecraft.network.chat.Style
import net.minecraft.resources.ResourceLocation

object ExampleCommandRegistry {
    fun registerCommands(
        dispatcher: CommandDispatcher<CommandSourceStack?>,
        context: CommandBuildContext?,
        environment: Commands.CommandSelection?
    ) {
        dispatcher.register(
            Commands.literal("test").executes { ctx: CommandContext<CommandSourceStack?>? ->
                val species = PokemonSpecies.getByIdentifier(ResourceLocation.parse("cobblemon:bidoof"))
                ctx!!.getSource()!!.sendSystemMessage(
                    Component.literal("Got species: ")
                        .withStyle(Style.EMPTY.withColor(0x03e3fc))
                        .append(species!!.translatedName)
                )
                return@executes 0
            }
        )
    }
}
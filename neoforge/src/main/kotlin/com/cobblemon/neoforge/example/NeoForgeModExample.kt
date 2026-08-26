package com.cobblemon.neoforge.example

import com.cobblemon.example.ExampleCommandRegistry
import net.neoforged.bus.api.SubscribeEvent
import net.neoforged.fml.common.Mod
import net.neoforged.neoforge.event.RegisterCommandsEvent

@Mod("cobblemon_multiplatform_mdk")
object NeoForgeModExample {
    @SubscribeEvent
    fun onCommandRegistration(event: RegisterCommandsEvent) {
        ExampleCommandRegistry.registerCommands(
            event.dispatcher,
            event.buildContext,
            event.commandSelection
        )
    }
}
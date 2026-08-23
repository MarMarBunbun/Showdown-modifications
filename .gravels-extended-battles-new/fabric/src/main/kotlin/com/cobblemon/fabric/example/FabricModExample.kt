package com.cobblemon.fabric.example

import com.cobblemon.example.ExampleCommandRegistry
import net.fabricmc.api.ModInitializer
import net.fabricmc.fabric.api.command.v2.CommandRegistrationCallback

object FabricModExample: ModInitializer {
    override fun onInitialize() {
        CommandRegistrationCallback.EVENT.register(ExampleCommandRegistry::registerCommands)
    }
}
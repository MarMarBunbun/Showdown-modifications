plugins {
    id("org.jetbrains.kotlin.jvm")
    id("dev.architectury.loom")
    id("architectury-plugin")
}

architectury {
    common("neoforge", "fabric")
}

loom {
    silentMojangMappingsLicense()
}

dependencies {
    minecraft("com.mojang:minecraft:${property("minecraft_version")}")
    modImplementation("dev.architectury:architectury:${property("architectury_version")}")
    mappings(loom.officialMojangMappings())
    modImplementation("com.cobblemon:mod:${property("cobblemon_version")}") { isTransitive = false }

    testImplementation("org.junit.jupiter:junit-jupiter-api:${property("junit_version")}")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:${property("junit_version")}")

//    val midnightlib = "eu.midnightdust:midnightlib:${property("midnightlib_version")}-fabric"
    modImplementation("maven.modrinth:cobblemon-mega-showdown:${property("megashowdown_fabric")}")
//    modImplementation(midnightlib) {
//        exclude(
//            group = "com.terraformersmc",
//            module = "modmenu"
//        )
//    }
    // NightConfig - bundled into the mod
    implementation("com.electronwill.night-config:core:${property("nightConfigVersion")}")
    implementation("com.electronwill.night-config:toml:${property("nightConfigVersion")}")
}

tasks.test {
    useJUnitPlatform()
}

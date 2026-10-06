package drai.dev.gravelsextendedbattles.fabric.mixin;

import net.fabricmc.loader.api.FabricLoader;
import org.objectweb.asm.tree.*;
import org.spongepowered.asm.mixin.extensibility.*;

import java.util.*;

public class MegaShowdownMixinPlugin implements IMixinConfigPlugin {

    private static final Set<String> MEGA_SHOWDOWN_PACKAGES = Set.of(
            "drai.dev.gravelsextendedbattles.mixin.megashowdown.",
            "drai.dev.gravelsextendedbattles.fabric.mixin.mega_showdown."
    );

    @Override
    public void onLoad(String mixinPackage) {
    }

    @Override
    public String getRefMapperConfig() {
        return null;
    }

    @Override
    public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
        if (MEGA_SHOWDOWN_PACKAGES.stream().anyMatch(mixinClassName::startsWith)) {
            return FabricLoader.getInstance().isModLoaded("mega_showdown");
        }

        return true;
    }

    @Override
    public void acceptTargets(Set<String> myTargets, Set<String> otherTargets) {
    }

    @Override
    public List<String> getMixins() {
        return null;
    }

    @Override
    public void preApply(
            String targetClassName,
            ClassNode targetClass,
            String mixinClassName,
            IMixinInfo mixinInfo
    ) {
    }

    @Override
    public void postApply(
            String targetClassName,
            ClassNode targetClass,
            String mixinClassName,
            IMixinInfo mixinInfo
    ) {
    }
}
package drai.dev.gravelsextendedbattles.neoforge.mixin;

import com.google.common.collect.*;
import dev.architectury.platform.*;
import dev.architectury.platform.Platform;
import net.neoforged.fml.loading.*;
import org.objectweb.asm.tree.*;
import org.spongepowered.asm.mixin.extensibility.*;

import java.util.*;
import java.util.function.*;

public class MegaShowdownMixinPlugin implements IMixinConfigPlugin {
    private static final Supplier<Boolean> TRUE = () -> true;

    private static final Map<String, Supplier<Boolean>> CONDITIONS = ImmutableMap.of(
            "drai.dev.gravelmon.neoforge.mixin.megashowdown.TeraTypeHelperMixin", () -> isModLoaded("mega_showdown"),
            "drai.dev.gravelmon.neoforge.mixin.megashowdown.CobbleEventsHandlerMixin", () -> isModLoaded("mega_showdown")
    );

    @Override
    public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
        return CONDITIONS.getOrDefault(mixinClassName, TRUE).get();
    }

    public static boolean isModLoaded(String modid) {
        return LoadingModList.get().getMods().stream().anyMatch(mod -> modid.equals(mod.getModId()));
    }

    // Boilerplate

    @Override
    public void onLoad(String mixinPackage) {

    }

    @Override
    public String getRefMapperConfig() {
        return null;
    }

    @Override
    public void acceptTargets(Set<String> myTargets, Set<String> otherTargets) {

    }

    @Override
    public List<String> getMixins() {
        return null;
    }

    @Override
    public void preApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo) {

    }

    @Override
    public void postApply(String targetClassName, ClassNode targetClass, String mixinClassName, IMixinInfo mixinInfo) {

    }
}


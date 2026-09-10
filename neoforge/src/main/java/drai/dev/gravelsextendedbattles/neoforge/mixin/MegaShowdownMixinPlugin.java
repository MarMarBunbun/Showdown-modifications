package drai.dev.gravelsextendedbattles.neoforge.mixin;

import net.neoforged.fml.ModList;
import org.objectweb.asm.tree.ClassNode;
import org.spongepowered.asm.mixin.extensibility.IMixinConfigPlugin;
import org.spongepowered.asm.mixin.extensibility.IMixinInfo;

import java.util.List;
import java.util.Set;

public class MegaShowdownMixinPlugin implements IMixinConfigPlugin {

    private static final String MEGA_SHOWDOWN_PACKAGE =
            "drai.dev.gravelsextendedbattles.mixin.megashowdown.";
    private static final String MEGA_SHOWDOWN_ENTRYPOINT_RESOURCE =
            "com/github/yajatkaul/mega_showdown/MegaShowdown.class";

    @Override
    public void onLoad(String mixinPackage) {
    }

    @Override
    public String getRefMapperConfig() {
        return null;
    }

    @Override
    public boolean shouldApplyMixin(String targetClassName, String mixinClassName) {
        if (!mixinClassName.startsWith(MEGA_SHOWDOWN_PACKAGE)) {
            return true;
        }

        ModList modList = ModList.get();
        return modList != null
                ? modList.isLoaded("mega_showdown")
                : MegaShowdownMixinPlugin.class.getClassLoader()
                        .getResource(MEGA_SHOWDOWN_ENTRYPOINT_RESOURCE) != null;
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

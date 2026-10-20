package drai.dev.gravelsextendedbattles.fabric.mixin;

import drai.dev.gravelsextendedbattles.ondemand.OnDemandStartup;
import net.minecraft.server.packs.PackType;
import net.minecraft.server.packs.repository.FolderRepositorySource;
import net.minecraft.server.packs.repository.PackRepository;
import net.minecraft.server.packs.repository.RepositorySource;
import net.minecraft.server.packs.repository.ServerPacksSource;
import org.spongepowered.asm.mixin.Final;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Mutable;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Fabric has no public way to offer a loose folder as a pack, so the downloaded Pokemon pack is added to the repository's sources when
 * it is built. The kind of pack comes from the repository's own folder source (resource packs on a client, data packs for a world), the
 * way Fabric API tells them apart. NeoForge does this through {@code AddPackFindersEvent}.
 */
@Mixin(PackRepository.class)
public abstract class PackRepositoryMixin {
    private static final org.apache.logging.log4j.Logger LOGGER = org.apache.logging.log4j.LogManager.getLogger("GravelsExtendedBattles");

    @Mutable
    @Shadow
    @Final
    private Set<RepositorySource> sources;

    @Inject(method = "<init>", at = @At("RETURN"))
    private void gravelmon$addDownloadedPack(RepositorySource[] given, CallbackInfo ci) {
        PackType type = null;
        for (RepositorySource source : this.sources) {
            if (source instanceof FolderRepositorySource folder) {
                type = ((FolderRepositorySourceAccessor) folder).gravelmon$getPackType();
                break;
            }
        }
        if (type == null) {
            // The repository of the "create world" screen has no folder source (the world has no folder yet), only the vanilla data pack
            // source. It must offer the pack too, or the data of a new world is built without it.
            for (RepositorySource source : this.sources) {
                if (source instanceof ServerPacksSource) {
                    type = PackType.SERVER_DATA;
                    break;
                }
            }
        }
        if (type == null) {
            LOGGER.info("[on demand] a pack repository without a folder source ({} sources): the downloaded pack is not added", this.sources.size());
            return;
        }
        RepositorySource downloaded = OnDemandStartup.packSource(type);
        LOGGER.info("[on demand] adding the downloaded pack to a {} pack repository", type);
        Set<RepositorySource> all = new LinkedHashSet<>(this.sources);
        all.add(downloaded);
        this.sources = all;
    }
}

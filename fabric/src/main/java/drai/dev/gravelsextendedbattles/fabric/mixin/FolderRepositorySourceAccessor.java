package drai.dev.gravelsextendedbattles.fabric.mixin;

import net.minecraft.server.packs.PackType;
import net.minecraft.server.packs.repository.FolderRepositorySource;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Accessor;

/** Which kind of pack a folder source reads: it tells a resource pack repository from a data pack one. */
@Mixin(FolderRepositorySource.class)
public interface FolderRepositorySourceAccessor {
    @Accessor("packType")
    PackType gravelmon$getPackType();
}

package drai.dev.gravelsextendedbattles.mixin.accessors;

import com.cobblemon.mod.common.config.starter.*;
import com.cobblemon.mod.common.data.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

import java.util.*;

@Mixin(StarterDataLoader.class)
public interface StarterDataLoaderAccessor {
    @Mutable
    @Accessor("categories")
    static List<StarterCategory> getCategories() {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }

    @Mutable
    @Accessor("categories")
    static void setCategories(List<StarterCategory> categories) {
        throw new UnsupportedOperationException("Mixin accessor stub");
    }
}

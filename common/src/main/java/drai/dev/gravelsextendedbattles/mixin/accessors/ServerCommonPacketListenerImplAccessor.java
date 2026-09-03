package drai.dev.gravelsextendedbattles.mixin.accessors;

import net.minecraft.network.*;
import net.minecraft.server.network.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

@Mixin(ServerCommonPacketListenerImpl.class)
public interface ServerCommonPacketListenerImplAccessor {
    @Mutable
    @Accessor
    Connection getConnection();
}

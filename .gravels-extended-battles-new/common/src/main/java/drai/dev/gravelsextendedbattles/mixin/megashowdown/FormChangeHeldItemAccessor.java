package drai.dev.gravelsextendedbattles.mixin.megashowdown;

import com.github.yajatkaul.mega_showdown.item.custom.form_change.*;
import org.spongepowered.asm.mixin.*;
import org.spongepowered.asm.mixin.gen.*;

@Mixin(FormChangeHeldItem.class)
public interface FormChangeHeldItemAccessor {
    @Mutable
    @Accessor("applyAspect")
    String getApplyAspect();
}

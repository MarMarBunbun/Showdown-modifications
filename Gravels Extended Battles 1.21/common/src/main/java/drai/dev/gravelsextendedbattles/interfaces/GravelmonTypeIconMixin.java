package drai.dev.gravelsextendedbattles.interfaces;

import com.cobblemon.mod.common.api.types.*;
import com.cobblemon.mod.common.client.gui.*;
import net.minecraft.resources.*;

public interface GravelmonTypeIconMixin {
    boolean getSmall();

    boolean getCenteredX();

    ElementalType getSecondaryType();

    float getDoubleCenteredOffset();

    float getSecondaryOffset();

    ResourceLocation getSmallTypesResource();

    ResourceLocation getTypesResource();

    float getSCALE();

    float getOpacity();

    void setSmallTypesResource(ResourceLocation gravelmon);

    void setTypesResource(ResourceLocation gravelmon);

    TypeIcon getSelf();
}

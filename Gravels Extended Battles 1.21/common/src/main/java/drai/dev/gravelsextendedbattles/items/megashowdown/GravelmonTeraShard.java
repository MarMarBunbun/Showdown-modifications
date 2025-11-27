package drai.dev.gravelsextendedbattles.items.megashowdown;

import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.pokemon.*;
import com.github.yajatkaul.mega_showdown.advancement.*;
import com.github.yajatkaul.mega_showdown.config.*;
import com.github.yajatkaul.mega_showdown.item.*;
import com.github.yajatkaul.mega_showdown.item.custom.tera.*;
import com.github.yajatkaul.mega_showdown.utils.*;
import net.minecraft.network.chat.*;
import net.minecraft.server.level.*;
import net.minecraft.world.*;
import net.minecraft.world.item.*;
import org.jetbrains.annotations.*;

import java.util.function.*;

public class GravelmonTeraShard extends TeraShard {

    private final Supplier<TeraType> teraTypeSupplier;

    public GravelmonTeraShard(Properties settings, Supplier<TeraType> teraType) {
        super(settings, null);
        teraTypeSupplier=teraType;
    }

    @Override
    public @Nullable InteractionResultHolder<ItemStack> applyToPokemon(@NotNull ServerPlayer player, @NotNull ItemStack itemStack, @NotNull Pokemon pokemon) {
        final int required_shards = MegaShowdownConfig.teraShardRequired;

        if (itemStack.getCount() >= required_shards) {
            itemStack.consume(required_shards, player);

            if (itemStack.getItem() == MegaShowdownItems.STELLAR_TERA_SHARD.get()) {
                AdvancementHelper.grantAdvancement(pokemon.getOwnerPlayer(), "tera/change_tera_stellar");
            }

            if (pokemon.getEntity() != null) {
                ParticlesList.glowParticles.apply(pokemon.getEntity());

            }
            var teraType = teraTypeSupplier.get();
            pokemon.setTeraType(teraType);
            pokemon.setTeraType(teraType);
            AdvancementHelper.grantAdvancement(pokemon.getOwnerPlayer(), "tera/change_tera");
        } else {
            player.displayClientMessage(Component.translatable("message.mega_showdown.tera_requirements", required_shards)
                    .withColor(0xFF0000), true);
        }

        return InteractionResultHolder.success(itemStack);
    }
}
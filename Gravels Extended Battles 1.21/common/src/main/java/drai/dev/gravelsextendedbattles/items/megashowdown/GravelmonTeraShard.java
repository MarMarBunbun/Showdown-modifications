package drai.dev.gravelsextendedbattles.items.megashowdown;

import com.cobblemon.mod.common.api.types.tera.*;
import com.cobblemon.mod.common.entity.pokemon.*;
import com.cobblemon.mod.common.pokemon.*;
import com.github.yajatkaul.mega_showdown.advancement.*;
import com.github.yajatkaul.mega_showdown.config.*;
import com.github.yajatkaul.mega_showdown.item.*;
import com.github.yajatkaul.mega_showdown.item.custom.tera.*;
import com.github.yajatkaul.mega_showdown.utils.*;
import drai.dev.gravelsextendedbattles.mixin.megashowdown.*;
import net.minecraft.network.chat.*;
import net.minecraft.server.level.*;
import net.minecraft.world.*;
import net.minecraft.world.entity.*;
import net.minecraft.world.entity.player.*;
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
    public InteractionResult interactLivingEntity(ItemStack itemStack, Player player, @NotNull LivingEntity context, InteractionHand hand) {
        if (player.level().isClientSide || player.isCrouching()) {
            return InteractionResult.PASS;
        }

        if (context instanceof PokemonEntity pokemonEntity) {
            Pokemon pokemon = pokemonEntity.getPokemon();
            if (pokemon.getEntity() == null || pokemon.getEntity().isBattling() || pokemon.getOwnerPlayer() != player) {
                return InteractionResult.PASS;
            }

            if (pokemon.getSpecies().getName().equals("Ogerpon")
                    || pokemon.getSpecies().getName().equals("Terapagos")) {
                return InteractionResult.PASS;
            }

            final int required_shards = MegaShowdownConfig.teraShardRequired;
            var teraType = teraTypeSupplier.get();
            if (itemStack.getCount() >= required_shards) {
                if (pokemon.getTeraType() == teraType) {
                    player.displayClientMessage(Component.translatable("message.mega_showdown.same_tera")
                            .withColor(0xFF0000), true);
                    return InteractionResult.PASS;
                }
                itemStack.consume(required_shards, player);

                if (itemStack.getItem() == MegaShowdownItems.STELLAR_TERA_SHARD.get()) {
                    AdvancementHelper.grantAdvancement(pokemon.getOwnerPlayer(), "tera/change_tera_stellar");
                }

                ParticlesList.glowParticles.apply(pokemonEntity);
                pokemon.setTeraType(teraType);
                pokemon.setTeraType(teraType);
                AdvancementHelper.grantAdvancement(pokemon.getOwnerPlayer(), "tera/change_tera");
            } else {
                player.displayClientMessage(Component.translatable("message.mega_showdown.tera_requirements", required_shards)
                        .withColor(0xFF0000), true);
            }

            return InteractionResult.SUCCESS;
        }

        return InteractionResult.PASS;
    }
}

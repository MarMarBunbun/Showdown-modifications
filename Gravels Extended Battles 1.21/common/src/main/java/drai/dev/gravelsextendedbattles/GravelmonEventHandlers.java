package drai.dev.gravelsextendedbattles;

import com.cobblemon.mod.common.api.events.pokemon.*;
import com.cobblemon.mod.common.api.pokemon.feature.*;
import com.cobblemon.mod.common.entity.pokemon.*;
import com.cobblemon.mod.common.net.messages.client.animation.*;
import com.cobblemon.mod.common.pokemon.*;
import com.cobblemon.yajatkaul.mega_showdown.item.custom.*;
import dev.architectury.platform.*;
import drai.dev.gravelsextendedbattles.items.*;
import drai.dev.gravelsextendedbattles.registries.*;
import kotlin.*;
import net.minecraft.core.particles.*;
import net.minecraft.server.level.*;
import net.minecraft.sounds.*;
import net.minecraft.world.phys.*;

import java.util.*;

public class GravelmonEventHandlers {
    public static Unit onHeldItemChange(HeldItemEvent.Post post) {
        if (post.getReturned() == post.getReceived() || post.getPokemon().getOwnerPlayer() == null) {
            return Unit.INSTANCE;
        }

//        HeldItemChangeFormes.genesectChange(post);
        if(Platform.isModLoaded("mega_showdown")) {
            silvallyChange(post);
            arcuesChange(post);
        }
//        HeldItemChangeFormes.ultraEvent(post);
//        HeldItemChangeFormes.crownedEvent(post);
//        HeldItemChangeFormes.ogerponChange(post);
//        HeldItemChangeFormes.eternamaxChange(post);
//        HeldItemChangeFormes.originChange(post);
//        HeldItemChangeFormes.customEvents(post);
//
//        if (ShowdownConfig.battleModeOnly.get()) {
//            return Unit.INSTANCE;
//        }
//
//        HeldItemChangeFormes.megaEvent(post);

        return Unit.INSTANCE;
    }

    private static void silvallyChange(HeldItemEvent.Post post) {
        Pokemon pokemon = post.getPokemon();
        if (pokemon.getSpecies().getName().equals("Silvally")) {
            if (post.getReceived().getItem() instanceof MemoryItem typedItem) {
                playHeldItemFormeChange(pokemon.getEntity());
                new StringSpeciesFeature("rks_memory", typedItem.getType()).apply(pokemon);
            }
            if (!(post.getReceived().getItem() instanceof MemoryItem)) {
                playHeldItemFormeChange(pokemon.getEntity());
                new StringSpeciesFeature("multitype","normal").apply(pokemon);
            }
        }
    }

    private static void arcuesChange(HeldItemEvent.Post post) {
        Pokemon pokemon = post.getPokemon();
        if (pokemon.getSpecies().getName().equals("Arceus")) {
            if (post.getReceived().getItem() instanceof PlateItem typedItem) {
                playHeldItemFormeChange(pokemon.getEntity());
                new StringSpeciesFeature("multitype", typedItem.getType()).apply(pokemon);
            }
            if (post.getReceived().getItem() instanceof ZCrystalItem typedItem) {
                playHeldItemFormeChange(pokemon.getEntity());
                new StringSpeciesFeature("multitype", typedItem.getType()).apply(pokemon);
            }
            if (!(post.getReceived().getItem() instanceof ZCrystalItem)
                    && !(post.getReceived().getItem() instanceof PlateItem)) {
                playHeldItemFormeChange(pokemon.getEntity());
                new StringSpeciesFeature("multitype","normal").apply(pokemon);
            }
        }
    }

    private static void playHeldItemFormeChange(PokemonEntity entity) {
        var packet = new PlayPosableAnimationPacket(entity.getId(), Set.of("cry"), List.of());
        packet.sendToPlayersAround(entity.getX(), entity.getY(), entity.getZ(), 128.0, entity.level().dimension(), player-> player.is(entity.getOwner()));
        if (entity.level() instanceof ServerLevel serverWorld) {
            Vec3 entityPos = entity.position(); // Get entity position

            // Get entity's size
            double entityWidth = entity.getBbWidth();
            double entityHeight = entity.getBbHeight();

            // Play sound effect
            serverWorld.playSound(
                    null, entityPos.x, entityPos.y, entityPos.z,
                    SoundEvents.AMETHYST_BLOCK_CHIME, // Yarn mapping for BEACON_ACTIVATE
                    SoundSource.PLAYERS, 1.5f, 0.5f + (float) Math.random() * 0.5f
            );

            // Adjust particle effect based on entity size
            int particleCount = (int) (100 * entityWidth * entityHeight); // Scale particle amount
            double radius = entityWidth * 0.8; // Adjust radius based on width

            for (int i = 0; i < particleCount; i++) {
                double angle = Math.random() * 2 * Math.PI;
                double xOffset = Math.cos(angle) * radius;
                double zOffset = Math.sin(angle) * radius;
                double yOffset = Math.random() * entityHeight; // Spread particles vertically

                serverWorld.sendParticles(
                        ParticleTypes.END_ROD, // Same particle type
                        entityPos.x + xOffset,
                        entityPos.y + yOffset,
                        entityPos.z + zOffset,
                        1, // One particle per call for better spread
                        0, 0, 0, // No movement velocity
                        0.1 // Slight motion
                );
            }
        }
    }
}

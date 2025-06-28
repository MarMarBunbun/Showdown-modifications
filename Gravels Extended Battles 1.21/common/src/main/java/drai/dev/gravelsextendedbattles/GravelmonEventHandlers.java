package drai.dev.gravelsextendedbattles;

import com.cobblemon.mod.common.api.events.pokemon.*;
import com.cobblemon.mod.common.api.pokemon.feature.*;
import com.cobblemon.mod.common.entity.pokemon.*;
import com.cobblemon.mod.common.net.messages.client.animation.*;
import com.cobblemon.mod.common.pokemon.*;
import com.cobblemon.yajatkaul.mega_showdown.sound.*;
import com.cobblemon.yajatkaul.mega_showdown.utility.*;
import dev.architectury.platform.*;
import drai.dev.gravelmon.pokemon.attributes.*;
import drai.dev.gravelsextendedbattles.items.*;
import drai.dev.gravelsextendedbattles.registries.*;
import kotlin.*;
import net.minecraft.core.particles.*;
import net.minecraft.server.level.*;
import net.minecraft.sounds.*;
import net.minecraft.world.item.*;
import net.minecraft.world.phys.*;

import java.util.*;

public class GravelmonEventHandlers {
    public static Unit onHeldItemChange(HeldItemEvent.Post post) {
        if (post.getReturned() == post.getReceived() || post.getPokemon().getOwnerPlayer() == null) {
            return Unit.INSTANCE;
        }

        if(Platform.isModLoaded("mega_showdown")) {
            silvallyChange(post);
            arcuesChange(post);
        }

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
                new StringSpeciesFeature("rks_memory","normal").apply(pokemon);
            }
        }
    }

    private static void arcuesChange(HeldItemEvent.Post post) {
        Pokemon pokemon = post.getPokemon();
        if (pokemon.getSpecies().getName().equals("Arceus")) {
            var isMegaShowdownPlateItem = false;
            Item item = post.getReceived().getItem();
            if (Platform.isModLoaded("mega_showdown")) {
                isMegaShowdownPlateItem = MegaShowdownCompatItems.isArceusPlateItem(item);
            }
            if (item instanceof PlateItem || isMegaShowdownPlateItem) {
                changeArceusForm((HasType) item, pokemon);
            }
            if (item instanceof ZCrystalItem typedItem) {
                changeArceusForm(typedItem, pokemon);
            }

        }
    }

    private static void changeArceusForm(HasType typedItem, Pokemon pokemon) {
        var pokemonEntity = pokemon.getEntity();
        var entityPos = pokemonEntity.position();
        pokemon.getEntity().level().playSound(
                null, entityPos.x, entityPos.y, entityPos.z,
                ModSounds.ARCEUS_MULTITYPE,
                SoundSource.PLAYERS, 0.2f, 1.3f
        );
        pokemon.getEntity().getEntityData().set(PokemonEntity.getEVOLUTION_STARTED(), true);

        pokemon.getEntity().after(3F, () -> {
            new StringSpeciesFeature("multitype", typedItem.getType()).apply(pokemon);
            LazyLib.Companion.cryAnimation(pokemon.getEntity());
            pokemon.getEntity().getEntityData().set(PokemonEntity.getEVOLUTION_STARTED(), false);
            return Unit.INSTANCE;
        });
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

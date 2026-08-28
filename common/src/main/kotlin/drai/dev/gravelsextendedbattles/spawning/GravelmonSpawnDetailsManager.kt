package drai.dev.gravelsextendedbattles.spawning

import com.cobblemon.mod.common.api.pokemon.PokemonProperties
import com.cobblemon.mod.common.api.pokemon.PokemonSpecies
import com.cobblemon.mod.common.api.spawning.detail.PokemonSpawnDetail
import drai.dev.gravelsextendedbattles.BanListManager
import drai.dev.gravelsextendedbattles.GravelsExtendedBattles
import drai.dev.gravelsextendedbattles.config.GEBConfig
import drai.dev.gravelsextendedbattles.config.SpawnModifier
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable
import java.util.function.Consumer
import java.util.logging.Level

object GravelmonSpawnDetailsManager {
    private var notSuppressedYet = true
    fun modifySpawnDetail(spawnDetail: PokemonSpawnDetail) {
        val pokemon = spawnDetail.pokemon
        val boosts = getBoostsForSpecies(pokemon)
        if (boosts.isEmpty()) {
            return
        }
        boosts.sortWith(Comparator.comparingDouble { spawnModifier -> spawnModifier.modifier.toDouble() })
        boosts.stream().findFirst().ifPresent(Consumer { boost: SpawnModifier ->
            spawnDetail.weight *= boost.modifier
        })
    }

    private fun getBoostsForSpecies(properties: PokemonProperties): MutableList<SpawnModifier> {
        val labels = getLabelsFromProperties(properties)
        if (labels.isEmpty()) return mutableListOf()
        return ArrayList(GEBConfig.spawnModifiers.stream()
            .filter { spawnModifier -> labels.contains(spawnModifier.label) }.toList())
    }

    private fun getLabelsFromProperties(properties: PokemonProperties): Set<String> {
        return properties.asRenderablePokemon().form.labels
    }

    fun checkForBannedPokemon(spawnDetail: PokemonSpawnDetail, cir: CallbackInfoReturnable<Boolean?>) {
        val pokemon = spawnDetail.pokemon
        if (pokemon.species != null) {
//            var accesssor = (GravelmonPokemonSpeciesAccessor) (Object) PokemonSpecies.INSTANCE;
            val species = PokemonSpecies.getByName(pokemon.species!!)
            if (species == null) {
                cir.setReturnValue(false)
                cir.cancel()
                return
            }
            if (BanListManager.pokemonShouldBeRemoved(pokemon)) {
                cir.setReturnValue(false)
                cir.cancel()
                return
            }

            //            if(!pokemon.getAspects().isEmpty()){
//                var formData = species.getForm(pokemon.getAspects());
//                if(formData == species.getStandardForm()) {
//                    cir.setReturnValue(false);
//                    cir.cancel();
//                    return;
//                }
//            }
            /*for(var formData : species.getForms()){
                if(SpeciesManager.containsBannedLabels(formData.getLabels().stream().toList())){
                    cir.setReturnValue(false);
                    cir.cancel();
                    return;
                }
            }
            if(species.getForm().getName()!=)*/
        } else {
            if (notSuppressedYet) {
                notSuppressedYet = false
                GravelsExtendedBattles.LOGGER.log(org.apache.logging.log4j.Level.INFO ,"Suppressed invalid species spawn detail warnings")
            }
            cir.setReturnValue(false)
            cir.cancel()
        }
    }
}
package drai.dev.gravelsextendedbattles

object GEBLoadOrderManager {
    var msdLoaded = false;
    var cobblemonLoaded = false;

    fun loadFromMSD(){
        msdLoaded = true;
        loadGEB();
    }

    fun loadFromCobblemon(){
        cobblemonLoaded = true;
        loadGEB();
    }

    fun loadGEB(){
        if(cobblemonLoaded && msdLoaded){
            GravelsExtendedBattles.initialize();
        }
    }
}
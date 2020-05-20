import { OnResourcesLoaded } from './onResourcesLoaded.js';

function LoadingScreen( loadingManager, RESOURCES_LOADED, meshes, scene, mapW, models, fbxModels, tdsModels, map, defensiveCube, light ) {
    
    const progressbarElem = document.querySelector('#progressbar');
    loadingManager.onProgress = function( item, loaded, total){
      console.log( item, loaded, total ); 
      progressbarElem.style.width = `${loaded / total * 100 | 0}%`;; 
    };
    
    loadingManager.onLoad = function(){
        console.log( "loaded all resources" );
        RESOURCES_LOADED = true;
        // Runs when all resources are loaded
        OnResourcesLoaded( scene, mapW, meshes, models, fbxModels, tdsModels, map, defensiveCube);
        
        //Hide the loading bar
        const loadingElem = document.querySelector('#loading');
        loadingElem.style.display = 'none';
    };
}

export { LoadingScreen };
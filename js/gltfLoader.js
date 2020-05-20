function GltfLoader( loadingManager, gltfModels ){
    for( var _key in gltfModels ){
        (function( key ){
            
            var gltfLoader = new GLTFLoader( loadingManager );
            
            gltfLoader.load( gltfModels[ key ].gltf, function ( object ) {
                var mixer = new THREE.AnimationMixer( object );
        
                var action = mixer.clipAction( object.animations[ 0 ] );
                action.play();
            
                object.traverse( function( child ) {
            
                    if( child.isMesh ) {
                        child.castShadow = gltfModels[ key ].castShadow;
                        child.receiveShadow = true;
                        child.material.transparent = false;
                    }
                });
    
                gltfModels[ key ].mesh = object;
                mixers.push( mixer );
        
            });   
        })(_key);
    }
}
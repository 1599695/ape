function FbxLoader( loadingManager, fbxModels, FBXLoader, mixers ){
    
    for( var _key in fbxModels ){
        (function( key ){
            
            var fbxLoader = new FBXLoader( loadingManager );
            
            fbxLoader.load( fbxModels[ key ].fbx, function ( object ) {
                var mixer = new THREE.AnimationMixer( object );
        
                var action = mixer.clipAction( object.animations[ 1 ] );
                //actionDead = mixer.clipAction( object.animations[ 2 ] );
                action.play();
            
                object.traverse( function( child ) {
            
                    if( child.isMesh ) {
                        child.castShadow = fbxModels[ key ].castShadow;
                        child.receiveShadow = true;
                        child.material.transparent = false;
                    }
                });
    
                fbxModels[ key ].mesh = object;
                mixers.push( mixer );
        
            });   
        })(_key);
    }
}
export{ FbxLoader };
function TdsLoader( loadingManager, tdsModels, TDSLoader ) {
    for( var _key in tdsModels ){
        (function( key ){
            
            var tdsLoader = new TDSLoader( loadingManager );
            tdsLoader.setResourcePath( 'models/nature/trees/' );
            
            tdsLoader.load( tdsModels[ key ].tds, function ( object ) {
            
                object.traverse( function( child ) {
            
                    if( child.isMesh ) {
                        child.castShadow = tdsModels[ key ].castShadow;
                        child.receiveShadow = true;
                        child.material.transparent = false;
                    }
                });
                tdsModels[ key ].mesh = object;
        
            });   
        })(_key);
    }
}

export { TdsLoader };
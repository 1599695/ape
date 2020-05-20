function LoadModels( loadingManager, models ) {
    for( var _key in models ){
		(function( key ){
			
			var mtlLoader = new THREE.MTLLoader( loadingManager );
      
			mtlLoader.load( models[ key ].mtl, function( materials ) {
  
				materials.preload();
				
				var objLoader = new THREE.OBJLoader( loadingManager );
			
				objLoader.setMaterials( materials );
				objLoader.load( models[ key ].obj, function( mesh ) {
					
					mesh.traverse(function(node){
						if( node instanceof THREE.Mesh ){
							if('castShadow' in models[key])
								node.castShadow = models[key].castShadow;
							else
								node.castShadow = true;
							
							if('receiveShadow' in models[key])
								node.receiveShadow = models[key].receiveShadow;
							else
								node.receiveShadow = true;
						}
					});
					models[key].mesh = mesh;
					
				});
			});
			
		})(_key);
        
	}
                
}


export { LoadModels };
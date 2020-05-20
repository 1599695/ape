function Scene( scene ) {
    // Add elements to scene and camera
    
    // Adds skybox
    var geometry = new THREE.CubeGeometry(250, 280, 250);
    var cubeMaterials = [
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("models/skybox/front.png"), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("models/skybox/back.png"), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("models/skybox/up.png"), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("models/skybox/down.png"), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("models/skybox/left.png"), side: THREE.DoubleSide} ),
        new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load("models/skybox/right.png"), side: THREE.DoubleSide} )
    ];
    
    var cubeMaterial = new THREE.MeshFaceMaterial( cubeMaterials );
    var cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.position.set(0, 130, 0);
    scene.add( cube );
    
    /*var walls = new THREE.CubeGeometry(250, 250/3, 250);
    for(var i = 0; i < mapW; ++i){
        n = map[i][j].length;
        for(var j = 0; j < n; ++j){
            if(map[i][j] == 1){
                var wall = new THREE.Mesh(walls, );    
            }
            
        }
    }*/ 
    
    // Light source
    
    var directionalLight = new THREE.DirectionalLight( 0xF7EFBE, 0.1 );
	directionalLight.position.set( 0.5, 1, 0.5 );
    scene.add(directionalLight);
    
    var reflectiveLight = new THREE.DirectionalLight( 0xF7EFBE, 0.03 );
	reflectiveLight.position.set( -0.5, -1, -0.5 );
	scene.add( reflectiveLight );
    
    /*var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    scene.add( ambientLight );

    var light = new THREE.PointLight( 0xffffff, 0.8, 18 );
    light.position.set( -3, 6, -3 );
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add( light );*/
    
}
    
export { Scene };
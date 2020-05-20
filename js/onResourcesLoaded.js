function OnResourcesLoaded( scene, mapW, meshes, models, fbxModels, tdsModels, map, defensiveCube, light) {
    var UNITSIZE = 15, units = mapW;
    
    // Clone Models into Meshes
    meshes[ "pistol" ] = models.pistol.mesh.clone();
    meshes[ "flashLight" ] = models.flashLight.mesh.clone();
    meshes[ "apeDead" ] = fbxModels.apeDead.mesh;
    meshes[ "tree2" ] = models.tree2.mesh.clone();
    //meshes[ "pistol2" ] = fbxModels.pistol.mesh;
    
    // Repositin meshes in scene and add them
    meshes[ "pistol" ].position.set(0, 2, 0);
    meshes[ "pistol" ].scale.set(5,5,5);
    scene.add( meshes[ "pistol" ] );
    
    meshes[ "flashLight" ].position.set(0, 2, 0);
    //meshes[ "flashLight" ].rotation.set(Math.PI/4, 0, 0);
    meshes[ "flashLight" ].scale.set(0.001,0.001,0.001);
    scene.add( meshes[ "flashLight" ] );
    
    light.position.set( 0, 0.5, 0 );
    light.distance = 10;
    light.decay = 2;
    scene.add( light );
    
    meshes[ "apeDead" ].position.set(0, 0.5, 0);
    meshes[ "apeDead" ].scale.set(0.015,0.015,0.015);
    

    // add grass and tree according to the matrix outline
    for(var i = 0; i < mapW; ++i){
        var n = map[i].length;
        for(var j = 0; j < n; ++j){
            if(map[i][j] == 1){
                meshes[ "tree2" ] = models.tree2.mesh.clone();
                meshes[ "tree2" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0, 
                                                (j - units/2) * UNITSIZE
                                              );
                //meshes[ "tree2" ].rotation.set(337.7, 0, 0);
                meshes[ "tree2" ].scale.set(13, 13, 13);
                scene.add( meshes[ "tree2" ] );
            }
            
            if(map[i][j] == 2){
                meshes[ "treePine" ] = models.treePine.mesh.clone();
                meshes[ "treePine" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0, 
                                                (j - units/2) * UNITSIZE
                                              );
                //meshes[ "treePine" ].rotation.set(337.7, 0, 0);
                meshes[ "treePine" ].scale.set(13, 13, 13);
                scene.add( meshes[ "treePine" ] );
            }
            
            if(map[i][j] == 3){
                meshes[ "river" ] = models.river.mesh.clone();
                meshes[ "river" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "river" ].scale.set(10, 10, 15);
                scene.add( meshes[ "river" ] );
            }
            
            if(map[i][j] == 4){
                meshes[ "riverBend" ] = models.riverBend.mesh.clone();
                meshes[ "riverBend" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "riverBend" ].scale.set(10, 10, 15);
                scene.add( meshes[ "riverBend" ] );
            }
            
            if(map[i][j] == 5){
                meshes[ "riverRocks" ] = models.riverRocks.mesh.clone();
                meshes[ "riverRocks" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "riverRocks" ].rotation.set(0, 1.58, 0);
                meshes[ "riverRocks" ].scale.set(12, 10, 20);
                scene.add( meshes[ "riverRocks" ] );
            }
            
            if(map[i][j] == 6){
                meshes[ "ape" ] = fbxModels.ape.mesh;
                meshes[ "ape" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "ape" ].scale.set(0.015,0.015,0.015);
                scene.add( meshes[ "ape" ] );
            }
            
            if(map[i][j] == 7){
                meshes[ "ape2" ] = fbxModels.ape2.mesh;
                meshes[ "ape2" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "ape2" ].scale.set(0.015,0.015,0.015);
                scene.add( meshes[ "ape2" ] );
            }
            
            if(map[i][j] == 8){
                meshes[ "ape3" ] = fbxModels.ape3.mesh;
                meshes[ "ape3" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "ape3" ].scale.set(0.015,0.015,0.015);
                scene.add( meshes[ "ape3" ] );
            }
            
            if(map[i][j] == 8){
                meshes[ "ape4" ] = fbxModels.ape4.mesh;
                meshes[ "ape4" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "ape4" ].scale.set(0.015,0.015,0.015);
                scene.add( meshes[ "ape4" ] );
            }
            
            if(map[i][j] == 9){
                meshes[ "ape3" ] = fbxModels.ape3.mesh;
                meshes[ "ape3" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "ape3" ].scale.set(0.015,0.015,0.015);
                scene.add( meshes[ "ape3" ] );
            }
            
            if(map[i][j] == 10){
                meshes[ "crop" ] = models.crop.mesh.clone();
                meshes[ "crop" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "crop" ].scale.set(5,5,5);
                scene.add( meshes[ "crop" ] );
                
                meshes[ "crop" ] = models.crop.mesh.clone();
                meshes[ "crop" ].position.set(
                                                (i - units/2) * UNITSIZE +10, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE +10
                                              );
                meshes[ "crop" ].scale.set(5,5,5);
                scene.add( meshes[ "crop" ] );
                
                meshes[ "crop" ] = models.crop.mesh.clone();
                meshes[ "crop" ].position.set(
                                                (i - units/2) * UNITSIZE +5, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE +5
                                              );
                meshes[ "crop" ].scale.set(5,5,5);
                scene.add( meshes[ "crop" ] );
                
                meshes[ "crop" ] = models.crop.mesh.clone();
                meshes[ "crop" ].position.set(
                                                (i - units/2) * UNITSIZE +2, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE +2
                                              );
                meshes[ "crop" ].scale.set(5,5,5);
                scene.add( meshes[ "crop" ] );
                
                meshes[ "crop" ] = models.crop.mesh.clone();
                meshes[ "crop" ].position.set(
                                                (i - units/2) * UNITSIZE -10, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE -10
                                              );
                meshes[ "crop" ].scale.set(5,5,5);
                scene.add( meshes[ "crop" ] );
                
                meshes[ "crop" ] = models.crop.mesh.clone();
                meshes[ "crop" ].position.set(
                                                (i - units/2) * UNITSIZE -5, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE -5
                                              );
                meshes[ "crop" ].scale.set(5,5,5);
                scene.add( meshes[ "crop" ] );
            }
            
            if(map[i][j] == 11){
                meshes[ "rock" ] = models.rock.mesh.clone();
                meshes[ "rock" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "rock" ].scale.set(100, 100, 100);
                scene.add( meshes[ "rock" ] );
            }
            
            if(map[i][j] == 12){
                meshes[ "stone" ] = models.stone.mesh.clone();
                meshes[ "stone" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "stone" ].scale.set(5, 5, 5);
                scene.add( meshes[ "stone" ] );
            }
            
            if(map[i][j] == 13){
                meshes[ "treeOrange" ] = models.treeOrange.mesh.clone();
                meshes[ "treeOrange" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "treeOrange" ].scale.set(10, 10, 10);
                scene.add( meshes[ "treeOrange" ] );
            }
            
            if(map[i][j] == 14){
                meshes[ "treeOak" ] = models.treeOak.mesh.clone();
                meshes[ "treeOak" ].position.set(
                                                (i - units/2) * UNITSIZE, 
                                                0.5, 
                                                (j - units/2) * UNITSIZE
                                              );
                meshes[ "treeOak" ].scale.set(10, 10, 10);
                scene.add( meshes[ "treeOak" ] );
            }
            
            if(map[i][j] != 3 && map[i][j] != 4 && map[i][j] != 5){
                meshes[ "grass" ] = models.grass.mesh.clone();
                meshes[ "grass" ].position.set(
                    (i - units/2) * UNITSIZE, 
                    0, 
                    (j - units/2) * UNITSIZE
                );
                meshes[ "grass" ].scale.set(5, 5, 5);
                scene.add( meshes[ "grass" ] );
                
                meshes[ "ground_grass" ] = models.ground_grass.mesh.clone();
                meshes[ "ground_grass" ].position.set(
                    (i - units/2) * UNITSIZE, 
                    0, 
                    (j - units/2) * UNITSIZE
                );
                meshes[ "ground_grass" ].scale.set(20, 5, 20);
                scene.add( meshes[ "ground_grass" ] );   
            }
            
        }
    }

    defensiveCube.position.set(0, 0.5, 0);
    scene.add( defensiveCube );
    /*meshes[ "pistol2" ].position.set(0, 2, 0);
    meshes[ "pistol2" ].scale.set(0.015,0.015,0.015);
    scene.add( meshes[ "pistol2" ] );*/
}

export { OnResourcesLoaded };
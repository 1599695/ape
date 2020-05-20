function GameLoop( RESOURCES_LOADED, clock ) {
    
    if( RESOURCES_LOADED == false) {
        requestAnimationFrame(GameLoop);
        
        return;
    }
    
    requestAnimationFrame(GameLoop);
    
    // Game Logic
    Update( clock );
    render();
}

function Update( clock ) {
    
        var time = Date.now() * 0.0005;
        var delta = clock.getDelta();
    
        for ( var index = 0; index < mixers.length; index += 1 ) {
            if( mixers[index] === undefined ) continue;
            if ( mixers[index] ){
                mixers[index].update( delta ); 
            }     
        }
    
        
        for ( var index = 0; index < bullets.length; index += 1 ) {
            if( bullets[index] === undefined ) continue;
            if( bullets[index].alive == false ) {
                bullets.splice( index, 1 );
                continue;
            }
            
            bullets[ index ].position.add(bullets[ index ].velocity);
        }
    
        //Update bullets by moving backwards from the list, so that we can remove the items
        for(var i = bullets.length-1; i >= 0; i--){
            
            //Collision with Ape
            var collision = false;
            
            var v = defensiveCube.geometry.vertices[0];
            var x = Math.abs(v.x), z = Math.abs(v.z);
            
            if(bullets[i].position.x < defensiveCube.position.x + x && bullets[i].position.x > defensiveCube.position.x - x && bullets[i].position.z < defensiveCube.position.z + z && bullets[i].position.z > defensiveCube.position.z - z){
                scene.remove(bullets[i]);
                collision = true;
                bullets.splice(i,1);
                apeHealth -= 10;
                console.log( "GUNNED HIM" );
                
            }
        }
    
        //Check Ape Health
        if(apeHealth <= 0){
            console.log( "DEAD" );
            //actionDead.play();
            scene.remove(meshes[ "ape" ]);
            
            scene.add( meshes[ "apeDead" ] );
        }
        
        // Controls the movement of the player
        KeyBoard();
    
        if( player.canShoot > 0 ) player.canShoot -= 1;
        
        meshes[ "pistol" ].position.set(
            camera.position.x - Math.sin( camera.rotation.y + Math.PI/4 ) * 0.6,
            camera.position.y - 0.15 + Math.sin(time*4 + camera.position.x + camera.position.z)*0.01,
            camera.position.z + Math.cos( camera.rotation.y + Math.PI/4 ) * 0.6
        );
        meshes[ "pistol" ].rotation.set(
            camera.rotation.x,
            camera.rotation.y - Math.PI,
            camera.rotation.z
        );
}

export { GameLoop };
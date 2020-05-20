
function KeyBoard( keyboard, camera, player, bullets, scene, meshes, models ) {
    if( keyboard[87] ) {            // W key
            camera.position.x -= Math.sin( camera.rotation.y ) * player.speed;
            camera.position.z -= -Math.cos( camera.rotation.y ) * player.speed;
        }
        if( keyboard[83] ) {            // S key
            camera.position.x += Math.sin( camera.rotation.y ) * player.speed;
            camera.position.z += -Math.cos( camera.rotation.y ) * player.speed;
        }
        if( keyboard[65] ) {            // A key
            camera.position.x += Math.sin( camera.rotation.y + Math.PI/2) * player.speed;
            camera.position.z += -Math.cos( camera.rotation.y + Math.PI/2) * player.speed;
        }
        if( keyboard[68] ) {            // D key
            camera.position.x += Math.sin( camera.rotation.y - Math.PI/2) * player.speed;
            camera.position.z += -Math.cos( camera.rotation.y - Math.PI/2) * player.speed;
        }
        
        if( keyboard[37] ) {              // left arrow key
            camera.rotation.y -= player.turnSpeed;
        }
        if( keyboard[39] ) {              // right arrow key
            camera.rotation.y += player.turnSpeed;
        }
        
        if( keyboard[ 32 ] && player.canShoot <= 0 ) {             // space bar
            /*var bullet = new THREE.Mesh(
                                new THREE.SphereGeometry( 0.02, 8, 8 ),
                                new THREE.MeshBasicMaterial( { color: 0xffffff } )
                            );*/
            
            var bullet = models.bullet.mesh.clone();
            bullet.scale.set( 7, 7, 7 );
            bullet.rotation.set( 225, 0, 0 );
            
            
            bullet.position.set(
                meshes["pistol"].position.x,
                meshes["pistol"].position.y + 0.05,
                meshes["pistol"].position.z
            );
            
            bullet.velocity = new THREE.Vector3(
                -Math.sin( camera.rotation.y ),
                0,
                Math.cos( camera.rotation.y )
            );
            
            bullet.alive = true;
            setTimeout(function() {
                    bullet.alive = false;
                    scene.remove(bullet);
            }, 1000);
            
            bullets.push(bullet);
            scene.add( bullet );
            player.canShoot = 10;
        }
}

export { KeyBoard };
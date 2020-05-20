function Camera( camera, player ) {
    
    camera.position.set( 0, player.height, -5 );
    camera.lookAt( new THREE.Vector3( 0, player.height, 0 ) );
}

export { Camera };
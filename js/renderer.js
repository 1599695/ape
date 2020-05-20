function Renderer( renderer ) {
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    document.body.appendChild( renderer.domElement );
}

export { Renderer };
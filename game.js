import { FBXLoader } from './loaders/FBXLoader.js';

var renderer, scene, clock;
var player = { height: 2.8, speed: 0.2, turnSpeed: Math.PI * 0.02, canShoot: 0 };
var camera;

var map = [// 0  1  2  3  4  5  6  7  8  9
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 0
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 1
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 2
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 3
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 4
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 5
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 6
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 7
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 8
            [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],   // 9
            ];
var mapW = map.length, mapH = map[0].length;

var loadingScreen = {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera( 90, 1280/720, 0.1, 100 ),
        box: new THREE.Mesh(
            new THREE.BoxGeometry( 0.5, 0.5, 0.5 ),
            new THREE.MeshBasicMaterial( { color: 0x4444ff } )
        )
    };

var keyboard = {};

var loadingManager = null;

var RESOURCES_LOADED = false;

var mesh, meshFloor;

// Models Index
var models = {
        pistol: {
            obj: "models/guns/uziGold.obj",
            mtl: "models/guns/uziGold.mtl",
            mesh: null,
            castShadow: false
            },
        bullet: {
            obj: "models/guns/ammo_pistol.obj",
            mtl: "models/guns/ammo_pistol.mtl",
            mesh: null,
            castShadow: false
        }
    };
    
// Meshes Index
var meshes = {};

// Holds the guns bullets
var bullets = [];

var mixers = [];
var actionDead;

var apeHealth = 100;

var fbxModels = {
        ape: {
            fbx: 'models/actors/Death.fbx',
            mesh: null,
            castShadow: false
        }
        /*pistol: {
            fbx: 'models/guns/pistol.fbx',
            mesh: null,
            castShadow: false
        }*/
};

var defensiveCube;

// Initialisation function
function Game() {
    
    // Displays a loading screen while models are being loaded on the screen
    LoadingScreen();
    
    // Adds a mesh that acts as the floor
    Scene();
    
   
    
    // Helps with movement of player
    clock = new THREE.Clock();
    
    // Loads Models to the scene
    LoadModels();
    FbxLoader();
    
    // Camera is position in first person view
    Camera();
    
    // Rendering
    Renderer();

    GameLoop();
}

function LoadingScreen() {
    
    //loadingScreen.box.position.set( 0, 0, 5 );
    //loadingScreen.camera.lookAt( loadingScreen.box.position );
    //loadingScreen.scene.add( loadingScreen.box );
    
    loadingManager = new THREE.LoadingManager();
    
    const progressbarElem = document.querySelector('#progressbar');
    loadingManager.onProgress = function( item, loaded, total){
      console.log( item, loaded, total ); 
      progressbarElem.style.width = '${itemsLoaded / itemsTotal * 100 | 0}%'
    };
    
    loadingManager.onLoad = function(){
        console.log( "loaded all resources" );
        RESOURCES_LOADED = true;
        onResourcesLoaded();
        
        //Hide the loading bar
        const loadingElem = document.querySelector('#loading');
        loadingElem.style.display = 'none';
    };
}

// Runs when all resources are loaded
function onResourcesLoaded() {
    
    // Clone Models into Meshes
    meshes[ "pistol" ] = models.pistol.mesh.clone();
    meshes[ "ape" ] = fbxModels.ape.mesh;
    //meshes[ "pistol2" ] = fbxModels.pistol.mesh;
    
    // Repositin meshes in scene and add them
    meshes[ "pistol" ].position.set(0, 2, 0);
    meshes[ "pistol" ].scale.set(5,5,5);
    scene.add( meshes[ "pistol" ] );
    
    meshes[ "ape" ].position.set(0, 0.5, 0);
    meshes[ "ape" ].scale.set(0.015,0.015,0.015);
    scene.add( meshes[ "ape" ] );
    
    defensiveCube.position.set(0, 0.5, 0);
    scene.add( defensiveCube );
    /*meshes[ "pistol2" ].position.set(0, 2, 0);
    meshes[ "pistol2" ].scale.set(0.015,0.015,0.015);
    scene.add( meshes[ "pistol2" ] );*/
}

function Scene() {
    scene = new THREE.Scene();
    var UNITSIZE = 250, units = mapW;

    // Add elements to scene and camera

    meshFloor = new THREE.Mesh(
                    new THREE.CubeGeometry( units * UNITSIZE, 0, 100, units * UNITSIZE ),
                    new THREE.MeshPhongMaterial( {color: 0xffffff, wireframe: false } )
                );
    meshFloor.receiveShadow = true;
    scene.add( meshFloor );
    
    // Light source
    var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
    scene.add( ambientLight );

    var light = new THREE.PointLight( 0xffffff, 0.8, 18 );
    light.position.set( -3, 6, -3 );
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add( light );
    
}

function LoadModels() {
    
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
    
    defensiveCube = new THREE.Mesh(
                                    new THREE.CubeGeometry(1, 5.2, 1),
                                    new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } )
                    );
                
}

function FbxLoader(){
    
    for( var _key in fbxModels ){
        (function( key ){
            
            var fbxLoader = new FBXLoader( loadingManager );
            
            fbxLoader.load( fbxModels[ key ].fbx, function ( object ) {
                var mixer = new THREE.AnimationMixer( object );
        
                var action = mixer.clipAction( object.animations[ 0 ] );
                actionDead = mixer.clipAction( object.animations[ 1 ] );
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

function Camera() {
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    camera.position.set( 0, player.height, -5 );
    camera.lookAt( new THREE.Vector3( 0, player.height, 0 ) );
}

function Renderer() {
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    
    document.body.appendChild( renderer.domElement );
}

function KeyBoard() {
    
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

//function keys() {}
function keyDown( event ) {
    keyboard[event.keyCode] = true;
}

function keyUp( event ) {
    keyboard[event.keyCode] = false;
}

// Game Logic
function update() {
    
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
            
            actionDead.play();
            //scene.remove(meshes[ "ape" ]);
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
            
// Draws the Scene
function render() {
    renderer.render( scene, camera );        
}
            
// Runs the game loop (update, render, repeat)
function GameLoop() {
    
    if( RESOURCES_LOADED == false) {
        requestAnimationFrame(GameLoop);
        
        loadingScreen.box.position.x -= 0.05;
        if( loadingScreen.box.position.x < -10 ) loadingScreen.box.position.x = 10;
        loadingScreen.box.position.y = Math.sin( loadingScreen.box.position.x );
        
        renderer.render( loadingScreen.scene, loadingScreen.camera );
        return;
    }
    
    
    
    requestAnimationFrame(GameLoop);
    
    update();
    render();
}

window.addEventListener( 'keydown', keyDown );
window.addEventListener( 'keyup', keyUp );

window.onload = Game;
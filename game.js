import { FBXLoader } from './loaders/FBXLoader.js';
import { GLTFLoader } from './loaders/GLTFLoader.js';
import { TDSLoader } from './loaders/TDSLoader.js';
import { Scene } from './js/scene.js';
import { LoadModels } from './js/loadModels.js';
import { FbxLoader } from './js/fbxLoader.js';
import { TdsLoader } from './js/tdsLoader.js';
import { Camera } from './js/camera.js';
import { Renderer } from './js/renderer.js';
import { KeyBoard } from './js/keyBoard.js';
import { OnResourcesLoaded } from './js/onResourcesLoaded.js';
import { MiniMap } from './js/miniMap.js';
//import { GameLoop } from './js/gameLoop.js';

var renderer = new THREE.WebGLRenderer(), 
    scene = new THREE.Scene();

// Helps with movement of player
var clock = new THREE.Clock();

var player = { height: 2.8, speed: 0.2, turnSpeed: Math.PI * 0.02, canShoot: 0 };
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var map = [// 0  1  2  3  4  5  6  7  8  9
            [ 0, 0, 0, 0, 0, 0, 5, 0, 0, 0 ],   // 0
            [ 0, 11, 0, 0, 0, 2, 5, 2, 13, 0 ],   // 1
            [ 0, 0, 0, 12, 6, 14, 5, 14, 14, 0 ],   // 2
            [ 0, 0, 1, 0, 14, 0, 5, 12, 7, 0 ],   // 3
            [ 0, 0, 14, 13, 1, 14, 5, 0, 13, 12 ],   // 4
            [ 3, 3, 3, 3, 3, 3, 4, 14, 0, 0 ],   // 5
            [ 10, 10, 1, 10, 14, 13, 14, 1, 0, 0 ],   // 6
            [ 10, 8, 10, 10, 2, 12, 0, 0, 9, 0 ],   // 7
            [ 10, 10, 10, 10, 14, 0, 13, 14, 2, 0 ],   // 8
            [ 0, 0, 12, 0, 0, 0, 0, 0, 0, 0 ],   // 9
            ];
var mapW = map.length, mapH = map[0].length;

var keyboard = {};

var loadingManager = new THREE.LoadingManager();

var RESOURCES_LOADED = false;

var mesh, meshFloor;

// Models Index
var models = {
        pistol: {
            obj: "models/guns/uziGold.obj",
            mtl: "models/guns/uziGold.mtl",
            mesh: null,
            castShadow: true
            },
        bullet: {
            obj: "models/guns/ammo_pistol.obj",
            mtl: "models/guns/ammo_pistol.mtl",
            mesh: null,
            castShadow: true
            },
        tree2: {
            obj: "models/nature/trees/tree_detailed.obj",
            mtl: "models/nature/trees/tree_detailed.mtl",
            mesh: null,
            castShadow: true
        },
        treePine: {
            obj: "models/nature/trees/TreePine.obj",
            mtl: "models/nature/trees/TreePine.mtl",
            mesh: null,
            castShadow: true
        },
        grass: {
            obj: "models/nature/grass/grass_large.obj",
            mtl: "models/nature/grass/grass_large.mtl",
            mesh: null,
            castShadow: true
        },
        ground_grass: {
            obj: "models/nature/grass/ground_grass.obj",
            mtl: "models/nature/grass/ground_grass.mtl",
            mesh: null,
            castShadow: false
        },
        river: {
            obj: "models/nature/river/river.obj",
            mtl: "models/nature/river/river.mtl",
            mesh: null,
            castShadow: false
        },
        riverBend: {
            obj: "models/nature/river/riverBend.obj",
            mtl: "models/nature/river/riverBend.mtl",
            mesh: null,
            castShadow: false
        },
        riverRocks: {
            obj: "models/nature/river/riverRocks.obj",
            mtl: "models/nature/river/riverRocks.mtl",
            mesh: null,
            castShadow: false
        },
        flashLight: {
            obj: "models/items/flashLight.obj",
            mtl: "models/items/flashLight.mtl",
            mesh: null,
            castShadow: true
        },
        crop: {
            obj: "models/nature/grass/crop.obj",
            mtl: "models/nature/grass/crop.mtl",
            mesh: null,
            castShadow: true
        },
        rock: {
            obj: "models/nature/rock/rock.obj",
            mtl: "models/nature/rock/rock.mtl",
            mesh: null,
            castShadow: true
        },
        stone: {
            obj: "models/nature/rock/stone.obj",
            mtl: "models/nature/rock/stone.mtl",
            mesh: null,
            castShadow: true
        },
        treeOrange: {
            obj: "models/nature/trees/treeOrange.obj",
            mtl: "models/nature/trees/treeOrange.mtl",
            mesh: null,
            castShadow: true
        },
        treeOak: {
            obj: "models/nature/trees/treeOak.obj",
            mtl: "models/nature/trees/treeOak.mtl",
            mesh: null,
            castShadow: true
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
            fbx: 'models/actors/ape_aiming.fbx',
            mesh: null,
            castShadow: true
        },
        ape2: {
            fbx: 'models/actors/ape_aiming.fbx',
            mesh: null,
            castShadow: true
        },
        ape3: {
            fbx: 'models/actors/ape_aiming.fbx',
            mesh: null,
            castShadow: true
        },
        ape4: {
            fbx: 'models/actors/ape_aiming.fbx',
            mesh: null,
            castShadow: true
        },
        apeDead: {
            fbx: 'models/actors/ape_death.fbx',
            mesh: null,
            castShadow: true
        },
        pistol: {
            fbx: 'models/guns/glock.fbx',
            mesh: null,
            castShadow: true
        }
};

var gltfModels = {
    grass: {
            gltf: 'models/texture/grass/Grass.blend',
            mesh: null,
            castShadow: false
        }
};

var tdsModels = {
    tree1: {
            tds: 'models/nature/trees/trees9.3ds',
            mesh: null,
            castShadow: false
        }
};

var defensiveCube = defensiveCube = new THREE.Mesh(
                                    new THREE.CubeGeometry(1, 5.2, 1),
                                    new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0, transparent: true } )
                    );

var light = new THREE.PointLight( 0xF5FFFA, 2, 10 );

// Run when the document is ready
$(document).ready(function() {
    
    //$('body').append('<div id="intro">restart</div>');
    
    Game();
    
    //Creates Mini Map
    //MiniMap( mapW, map );
    
    // Runs the in game animations
    GameLoop();
    
});

// Initialisation function
function Game() {
    
    // Displays a loading screen while models are being loaded on the screen
    LoadingScreen( );
    
    // Adds objects in the world
    Scene( scene );
    
    // Loads Models to the scene
    LoadModels( loadingManager, models );
    FbxLoader( loadingManager, fbxModels, FBXLoader, mixers );
    //GltfLoader( loadingManager, gltfModels );
    TdsLoader( loadingManager, tdsModels, TDSLoader );
    
    // Camera is position in first person view
    Camera( camera, player );
    
    // Rendering
    Renderer( renderer );
    
}

function LoadingScreen( ) {
    
    const progressbarElem = document.querySelector('#progressbar');
    loadingManager.onProgress = function( item, loaded, total){
      console.log( item, loaded, total ); 
      progressbarElem.style.width = `${loaded / total * 100 | 0}%`;; 
    };
    
    loadingManager.onLoad = function(){
        console.log( "loaded all resources" );
        RESOURCES_LOADED = true;
        // Runs when all resources are loaded
        OnResourcesLoaded( scene, mapW, meshes, models, fbxModels, tdsModels, map, defensiveCube, light);
        
        //Hide the loading bar
        const loadingElem = document.querySelector('#loading');
        loadingElem.style.display = 'none';
    };
}
            
// Draws the Scene
function render() {
    renderer.render( scene, camera );        
}

function GameLoop() {
    
    if( RESOURCES_LOADED == false) {
        requestAnimationFrame(GameLoop);
        
        return;
    }
    
    requestAnimationFrame(GameLoop);
    
    // Game Logic
    Update( clock );
    render();
}

function Update() {
    
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
        KeyBoard( keyboard, camera, player, bullets, scene, meshes, models );
    
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
    
        meshes[ "flashLight" ].position.set(
            (camera.position.x - Math.sin( camera.rotation.y - Math.PI/6 ) * 0.3),
            (camera.position.y - 0.2 + Math.sin(time*4 + camera.position.x + camera.position.z)*0.01),
            (camera.position.z + Math.cos( camera.rotation.y - Math.PI/6 ) * 0.3)
        );
        meshes[ "flashLight" ].rotation.set(
            camera.rotation.x,
            camera.rotation.y + Math.PI/2,
            camera.rotation.z
        );
    
        light.position.set(
            (camera.position.x - Math.sin( camera.rotation.y - Math.PI/6 ) * 0.3),
            (camera.position.y - 0.2 + Math.sin(time*4 + camera.position.x + camera.position.z)*0.01),
            (camera.position.z + Math.cos( camera.rotation.y - Math.PI/6 ) * 0.3)
        );
        light.rotation.set(
            camera.rotation.x,
            camera.rotation.y  - Math.PI/4,
            camera.rotation.z
        );
}

//function keys() {}
function keyDown( event ) {
    keyboard[event.keyCode] = true;
}

function keyUp( event ) {
   keyboard[event.keyCode] = false;
}

window.addEventListener( 'keydown', keyDown );
window.addEventListener( 'keyup', keyUp );
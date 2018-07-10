var camera, scene, renderer, stats, controls, light;

var cube, sphere, cylindre, ring, truck;
init();
setObjectsInScene();
animate();

//initializers BEGIN

//helper
//to init the sound...
function initSound(){
    var listener = new THREE.AudioListener();
    camera.add( listener );

    var sound = new THREE.Audio( listener );

    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( 'assets/music/GROS-SON.mp3', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( true );
        sound.setVolume( 0.5 );
        sound.play();
    });
}

//...and the light ...
function initLight(){
    light = new THREE.DirectionalLight( 0xffffff, 1 );
    scene.add( light );
}

//...and the stats ...
function initStats(){
    stats = new Stats();
    stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
}

//...and the controls ...
function initControls(){
    controls = new THREE.TrackballControls( camera );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
}

//...and the camera ...
function initCamera(){
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
}

//...and the scene ...
function initScene(){
    scene = new THREE.Scene();
}

//...and the renderer ...
function initRenderer(){
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

//main init function, calling all the initializers, and setting function on window resize.

function init() {
    initStats();
    initCamera();
    initSound();
    initControls();
    initScene();
    initLight();
    initRenderer();

    window.addEventListener( 'resize', onWindowResize, false );
}

//actions to do when the window is resized

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

//initializers END

//addition of objects in the scene.

//helper function to create a single object
function getSingleObject(textureOrColor, geometryBuffer, isColor = false){
    var material;
    if (isColor){
        material = new THREE.MeshPhongMaterial( { color: textureOrColor, shininess: 0.07} );
    }else{
        material = new THREE.MeshBasicMaterial( { map: textureOrColor } );
    }
    return new THREE.Mesh( geometryBuffer, material );
}

//helper to create the cube
function createCube(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );

    ret = getSingleObject(texture, geometry, false);

    scene.add(ret);
    return ret;
}

//helper to create the sphere
function createSphere(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.SphereGeometry( 10, 32, 32);

    var ret = getSingleObject(texture, geometry, false);
    ret.position.x = -700;

    scene.add(ret);
    return ret;
}

//helper to create the cylinder
function createCylinder(){
    var color = "#ff0000";
    var geometry = new THREE.CylinderGeometry( 150, 150, 200 );

    var ret = getSingleObject(color, geometry, true);
    ret.position.x = -300;

    scene.add(ret);
    return ret;
}

//helper to create the ring
function createRing(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.TorusBufferGeometry( 15, 4, 80, 160 );

    ret =  getSingleObject(texture, geometry, false);

    ret.position.x = 200;

    scene.add(ret);

    return ret;
}

//helper to create the truck
function loadTruck(){
    var loader = new THREE.STLLoader();
    //loader.setPath( 'assets/textures/' );
    loader.load( 'assets/model/toy-truck10-v2a.stl', function ( geometry ) {
        var material = new THREE.MeshPhongMaterial( { color: 0x0000ff, specular: 0x111111, shininess: 200 } );
        truck = new THREE.Mesh( geometry, material );
        truck.position.x = 300;
        truck.scale.set( 2, 2, 2 );
        truck.castShadow = true;
        truck.receiveShadow = true;
        scene.add( truck );
    });

}

//function calling the different helper to create the objects
function setObjectsInScene(){
    cube = createCube();
    cylindre = createCylinder();
    sphere = createSphere();
    ring = createRing();
    loadTruck();
}

//helper to make the rotation
function executeRotation(object){
    object.rotation.x += 0.005;
    object.rotation.y += 0.01;
}

//function to animate all the objects.
function animate() {
    requestAnimationFrame( animate );
    executeRotation(cube);
    executeRotation(cylindre);
    executeRotation(sphere);
    executeRotation(ring);
    if (truck !== undefined){
        executeRotation(truck);
    }
    controls.update();
    light.position.setFromMatrixPosition( camera.matrixWorld );
    renderer.render( scene, camera );
    stats.update();
}
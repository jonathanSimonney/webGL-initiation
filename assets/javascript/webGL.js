var camera, scene, renderer, stats, controls;
init();
setObjectsInScene();
animate();

//initializers BEGIN

//helper
function initStats(){
    stats = new Stats();
    stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
}

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

function initCamera(){
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;
}

function initScene(){
    scene = new THREE.Scene();
}

function initRenderer(){
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}

//main init function

function init() {
    initStats();
    initCamera();
    initControls();
    initScene();
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

function getSingleObject(texture, geometryBuffer){
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    return new THREE.Mesh( geometryBuffer, material );
}

function setObjectsInScene(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );
    //this before
    var cube = getSingleObject(texture, geometry);

    scene.add( cube );
}

function animate() {
    requestAnimationFrame( animate );
    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.01;
    controls.update();
    renderer.render( scene, camera );
    stats.update();
}
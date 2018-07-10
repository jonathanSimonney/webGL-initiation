var camera, scene, renderer, stats, controls, light;

var cube, sphere, cylindre, ring, cami;
init();
setObjectsInScene();
animate();

//initializers BEGIN

//helper

function initLight(){
    light = new THREE.DirectionalLight( 0xffffff, 1 );
    scene.add( light );
}
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

function getSingleObject(textureOrColor, geometryBuffer, isColor = false){
    var material;
    if (isColor){
        material = new THREE.MeshPhongMaterial( { color: textureOrColor, shininess: 0.07} );
    }else{
        material = new THREE.MeshBasicMaterial( { map: textureOrColor } );
    }
    return new THREE.Mesh( geometryBuffer, material );
}

function createCube(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );

    return getSingleObject(texture, geometry, false);
}

function createSphere(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.SphereGeometry( 10, 32, 32);

    var ret = getSingleObject(texture, geometry, false);
    ret.position.x = -700;
    return ret;
}

function createCylinder(){
    var color = "#ff0000";
    var geometry = new THREE.CylinderGeometry( 150, 150, 200 );

    var ret = getSingleObject(color, geometry, true);
    ret.position.x = -300;
    return ret;
}

function createRing(){
    var texture = new THREE.TextureLoader().load( 'assets/textures/crate.gif' );
    var geometry = new THREE.TorusBufferGeometry( 15, 4, 80, 160 );

    ret =  getSingleObject(texture, geometry, false);

    ret.position.x = 200;

    return ret;
}

function setObjectsInScene(){
    cube = createCube();
    cylindre = createCylinder();
    sphere = createSphere();
    ring = createRing();

    scene.add( cube );
    scene.add( cylindre );
    scene.add( sphere );
    scene.add(ring);
}

function executeRotation(object){
    object.rotation.x += 0.005;
    object.rotation.y += 0.01;
}

function animate() {
    requestAnimationFrame( animate );
    executeRotation(cube);
    executeRotation(cylindre);
    executeRotation(sphere);
    executeRotation(ring);
    controls.update();
    light.position.setFromMatrixPosition( camera.matrixWorld );
    renderer.render( scene, camera );
    stats.update();
}
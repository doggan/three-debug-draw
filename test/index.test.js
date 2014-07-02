var DbgDraw = require('./../index'),
    THREE = require('three');

var container, stats;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function doDrawing() {
    var i;

    // Some lines.
    for (i = 0; i < 10; i++) {
        DbgDraw.drawLine(new THREE.Vector3(-20 * i - 20, 20, 20), new THREE.Vector3(-20 * i - 20, 20, -20), 'red');
        DbgDraw.drawLine(new THREE.Vector3(-20 * i - 20, 0, 20), new THREE.Vector3(-20 * i - 20, 0, -20), 'green');
        DbgDraw.drawLine(new THREE.Vector3(-20 * i - 20, -20, 20), new THREE.Vector3(-20 * i - 20, -20, -20), 'blue');
    }

    // Line strip.
    // Change positions every frame to show that drawn objects are dynamic.
    var points = [];
    for (i = 0; i < 10; i++) {
        points.push(
            new THREE.Vector3(
                Math.random() * 100 + 10,
                Math.random() * 100 + 10,
                Math.random() * 100 + 10
        ));
    }
    DbgDraw.drawLineStrip(points, 'cyan');

    // X, Y, Z axes.
    DbgDraw.drawArrow(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(100, 0, 0),
        5,
        'red'
    );
    DbgDraw.drawArrow(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 100, 0),
        5,
        'green'
    );
    DbgDraw.drawArrow(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -100),
        5,
        'blue'
    );

    // Some boxes.
    DbgDraw.drawBoundingBox(
        new THREE.Vector3(-200, 50, 0),
        new THREE.Vector3(-150, 100, 50),
        'red');
    DbgDraw.drawBoundingBox(
        new THREE.Vector3(-190, 60, 10),
        new THREE.Vector3(-160, 90, 40),
        'green');
    DbgDraw.drawBoundingBox(
        new THREE.Vector3(-180, 70, 20),
        new THREE.Vector3(-170, 80, 30),
        'blue');

    // Spheres.
    DbgDraw.drawSphere(
        new THREE.Vector3(0, 0, 0),
        10,
        'black');
    DbgDraw.drawSphere(
        new THREE.Vector3(-100, 80, 0),
        30,
        'red');
    DbgDraw.drawSphere(
        new THREE.Vector3(-50, 80, 0),
        15,
        'green');
    DbgDraw.drawSphere(
        new THREE.Vector3(-20, 80, 0),
        7.5,
        'blue');
}

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 0, 100, 400 );

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {
	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function onDocumentTouchMove( event ) {
	if ( event.touches.length === 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
	}
}

function animate() {
    requestAnimationFrame( animate );

    doDrawing();

    render();
    stats.update();
}

function render() {
	camera.position.x += ( mouseX - camera.position.x ) * 0.05;
	camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
	camera.lookAt( scene.position );

    // Update the debug drawer every frame.
    DbgDraw.render(scene);

    renderer.render(scene, camera);
}

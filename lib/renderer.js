var THREE = require('three');

var activePrimitives = [];
var activeMesh = null;

function Primitive() {
    this.vertices = [];
    this.color = { r: 0, g: 0, b: 0 };
}

function _addPrimitive(p) {
    activePrimitives.push(p);
}

function constructGeometry() {
    var positions = [];
    var colors = [];
    var indices = [];

    // Collect all primitives into geometry buffers.
    var i, j;
    var indexOffset = 0;
    for (i = 0; i < activePrimitives.length; i++) {
        var p = activePrimitives[i];

        // Vertices/colors.
        for (j = 0; j < p.vertices.length; j++) {
            var v = p.vertices[j];
            positions.push(v.x, v.y, v.z);
            colors.push(p.color.r, p.color.g, p.color.b);
        }

        // Indices.
        for (j = 0; j < p.vertices.length - 1; j++) {
            indices.push(indexOffset + j, indexOffset + j + 1);
        }
        indexOffset += (p.vertices.length - 1) * 2;
    }

    // Construct geometry.
    var indicesAttr = new THREE.Uint16Attribute(indices.length, 1);
        indicesAttr.set(indices);
    var positionsAttr = new THREE.Float32Attribute(positions.length / 3, 3);
        positionsAttr.set(positions);
    var colorsAttr = new THREE.Float32Attribute(colors.length / 3, 3);
        colorsAttr.set(colors);
        
    var geometry = new THREE.BufferGeometry();
    geometry.addAttribute( 'index', indicesAttr);
    geometry.addAttribute( 'position', positionsAttr);
    geometry.addAttribute( 'color', colorsAttr);
    geometry.computeBoundingSphere();
    return geometry;
}

function _update(scene) {
    if (activeMesh !== null) {
        scene.remove(activeMesh);
    }

    // Create geometry and add to scene.
    var geometry = constructGeometry();
    var material = new THREE.LineBasicMaterial({ vertexColors: true });
    activeMesh = new THREE.Line(geometry, material, THREE.LinePieces);
    scene.add(activeMesh);

    // Clear primitives from this frame.
    activePrimitives = [];
}

module.exports = {
    Primitive: Primitive,
    addPrimitive: _addPrimitive,
    update: _update
};

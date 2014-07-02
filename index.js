var THREE = require('three'),
    renderer = require('./lib/renderer'),
    Primitive = renderer.Primitive;

function stringToColor(str) {
    switch (str) {
    case 'red':
        return 0xFF0000;
    case 'green':
        return 0x00FF00;
    case 'blue':
        return 0x0000FF;
    case 'yellow':
        return 0xFFFF00;
    case 'magenta':
        return 0xFF00FF;
    case 'cyan':
        return 0x00FFFF;
    case 'white':
        return 0xFFFFFF;
    default:
        return 0x000000;
    }
}

function toColor(arg) {
    if (typeof arg == 'string') {
        return stringToColor(arg);
    } else {
        return arg;
    }
}

/**
 * Draws a single line from v0 to v1 with the given color.
 *
 * Each point is a THREE.Vector3 object.
 */
function _drawLine(v0, v1, color) {
    var p = new Primitive();

    p.vertices = [v0, v1];
    p.color = toColor(color);

    renderer.addPrimitive(p);
}

/**
 * Draws a strip of connected lines using the specified points[].
 *
 * Each point is a THREE.Vector3 object.
 */
function _drawLineStrip(points, color) {
    if (points.length < 2) {
        console.error('Line strips must have at least 2 points.');
        return;
    }

    var p = new Primitive();

    p.vertices = points;
    p.color = toColor(color);

    renderer.addPrimitive(p);
}

/**
 * Draws a bounding box defined by the min/max coordinates.
 *
 * min/max are THREE.Vector3 objects.
 */
function _drawBoundingBox(min, max, color) {
    var p = new Primitive();
    p.color = toColor(color);

    var halfExtents = new THREE.Vector3();
    halfExtents.subVectors(max, min);
    halfExtents.multiplyScalar(0.5);
    var center = new THREE.Vector3();
    center.addVectors(max, min);
    center.multiplyScalar(0.5);

    var edgeCoord = [1, 1, 1];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            var pa = new THREE.Vector3(
                edgeCoord[0] * halfExtents.x,
                edgeCoord[1] * halfExtents.y,
                edgeCoord[2] * halfExtents.z);
            pa.add(center);

            var otherCoord = j % 3;
            edgeCoord[otherCoord] = edgeCoord[otherCoord] * -1;
            var pb = new THREE.Vector3(
                edgeCoord[0] * halfExtents.x,
                edgeCoord[1] * halfExtents.y,
                edgeCoord[2] * halfExtents.z);
            pb.add(center);

            p.vertices.push(pa, pb);
        }

        edgeCoord = [-1, -1, -1];

        if (i < 3) {
            edgeCoord[i] = edgeCoord[i] * -1;
        }
    }

    renderer.addPrimitive(p);
}

/**
 * Render all objects drawn this frame into the scene.
 */
function _render(scene) {
    renderer.update(scene);
}

module.exports = {
    // drawPoint: _drawPoint,
    drawLine: _drawLine,
    drawLineStrip: _drawLineStrip,
    // drawArrow: _drawArrow,
    drawBoundingBox: _drawBoundingBox,
    // drawSphere: _drawSphere,
    render: _render
};

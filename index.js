var renderer = require('./lib/renderer'),
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

function _drawLine(v0, v1, color) {
    var p = new Primitive();

    p.vertices = [v0, v1];
    p.color = toColor(color);
    
    renderer.addPrimitive(p);
}

function _render(scene) {
    renderer.update(scene);
}

module.exports = {
    // drawPoint: _drawPoint,
    drawLine: _drawLine,
    // drawArrow: _drawArrow,
    // drawBoundingBox: _drawBoundingBox,
    // drawSphere: _drawSphere,
    render: _render
};

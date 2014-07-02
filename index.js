var renderer = require('./lib/renderer'),
    Primitive = renderer.Primitive;

function _drawLine(v0, v1) {
    var p = new Primitive();
    p.vertices = [v0, v1];
    p.color = { r: 0xFF, g: 0, b: 0 };
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

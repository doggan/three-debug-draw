three-debug-draw
================

three-debug-draw is a browserify-friendly plugin for three.js to aid in the drawing of simple shapes.

Quickly and easily draw shapes from anywhere in your code to help debug and visualize.

Currently supported shapes are:
 * Line
 * Line Strip
 * Directional Arrow
 * Axis-Aligned Bounding Box
 * Sphere

Some usage examples are:
 * Visualize the player facing direction with arrows.
 * Display enemy pathfinding information with lines and spheres.
 * Display collision volumes with a bounding box.

## Installation
``` bash
npm install three-debug-draw
```

## Usage

```javascript
// 1). Require the package.
var DbgDraw = require('three-debug-draw');

function render() {
    // 2). Update the debug drawer.
    DbgDraw.render(scene);

    renderer.render(scene, camera);    // (three.js rendering)
}

// 3). Draw shapes from anywhere in your code.
DbgDraw.drawLine(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(10, 10, 10),
    'red');

```

## Example

Run the example online: [View Example](http://doggan.github.io/three-debug-draw/example/index.html)

![Alt text](/../screenshots/example01.png?raw=true "Example")

For the complete example code, see `test/index.test.js`, or open `example/index.html` to see the browserified results.

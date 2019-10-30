// HTML5 Canvas Globals
let WIDTH;
let HEIGHT;
let ctx;

let MOUSE_POS;

// Create Canvas element and place inside of html file inside of <div id="canvasArea"> </div>
function createCanvas(x, y, context = '2d') {
    let canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = x;
    canvas.height = y;
    canvas.style.border = '1px solid black';
    document.getElementById('canvasArea').appendChild(canvas);

    WIDTH = canvas.width;
    HEIGHT = canvas.height;
    ctx = canvas.getContext(context);

    // Event for finding mouse position on click
    canvas.addEventListener("mousemove", function (evt) {
        MOUSE_POS = mousePos(canvas, evt);
        //alert(MOUSE_POS.x + ',' + MOUSE_POS.y);
    }, false);
}

// Clear HTML5 Canvas
function clear(colour = 'black') {
    ctx.fillStyle = colour;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
}

// Clear a certain part of the HTML5 Canvas
function clearPart(colour, x1, y1, x2, y2) {
    ctx.fillStyle = colour;
    ctx.fillRect(x1, y1, x2, y2);
}

// Move the coordinate system
function translate(x, y) {
    ctx.translate(x, y);
}

// Rotate the cordinate system
function rotate(x) {
    ctx.rotate(x);
}

// Convert Degress to radian
function toRadian(x) {
    return (x * Math.PI) / 180;
}

// Save current Transformation
function push() {
    ctx.save();
}

// Pop current Transformation from the array
function pop() {
    ctx.restore();
}

// Reset Transformation
function resetTransform() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

// Draw line from T(x1, y1) to P(x2, y2)
function line(x1, y1, x2, y2, colour = 'white', width = 1) {
    ctx.strokeStyle = colour;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Draw a filled rectangle at T(x, y) with width, height and a fillcolour
function drawFillRect(x, y, w, h, colour = 'white') {
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w, h);
}

// Draw an arc at S(x, y) that goes from sAngle to eAngle in radians
function drawArc(sx, sy, r, sAngle, eAngle, colour = 'white', width = 1) {
    ctx.strokeStyle = colour;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.arc(sx, sy, r, sAngle, eAngle);
    ctx.stroke();
}

// Draw filled Text at T(x, y) with a fontSize, colour
function drawFillText(text, x, y, fontSize, colour = 'white', font = 'Arial') {
    ctx.font = fontSize + 'px ' + font;
    ctx.fillStyle = colour;
    ctx.fillText(text, x, y);
}

// Draw stroked Text at T(x, y) with a fontSize
function drawStrokeText(text, x, y, fontSize, font = 'Arial') {
    ctx.font = fontSize + 'px ' + font;
    ctx.strokeText(text, x, y);
}

// Get mouse position in the HTML5 Canvas function
function mousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// Maps values from one range to another
function map(s, a1, a2, b1, b2) {
    return b1 + ((s - a1) * (b2 - b1)) / (a2 - a1);
}

// Takes a value and returns an int
function toInt(value) {
    return Number.parseInt(value.toString());
}

// Takes a string and returns an int
function toBoolean(string) {
    return (string == "true");
}

// Takes in array that contains an object with x and y and connect those points into one line
function lineStrip(array, colour = 'white', corner = 'round') {
    ctx.beginPath();
    ctx.strokeStyle = colour;
    ctx.lineJoin = corner;

    ctx.moveTo(array[0].x, array[0].y);

    for (let i = 1; i < array.length; i++) {
        ctx.lineTo(array[i].x, array[i].y);
    }

    ctx.stroke();
}
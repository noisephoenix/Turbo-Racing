const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

var KeyHeld_Accelerate = false;
var KeyHeld_Reverse = false;
var KeyHeld_TurnLeft = false;
var KeyHeld_TurnRight = false;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);
}

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollTop;

    // cheat to test car in any position
    /*
    carX = mouseX;
    carY = mouseY;
    carSpeedX = 4;
    carSpeedY = -4;
    */
}

function keyPressed(evt) {
    //console.log("Key pressed: " +evt.keyCode);
    if (evt.keyCode == KEY_A) {
        KeyHeld_TurnLeft = true;
    }
    if (evt.keyCode == KEY_D) {
        KeyHeld_TurnRight = true;
    }
    if (evt.keyCode == KEY_W) {
        KeyHeld_Accelerate = true;
    }
    if (evt.keyCode == KEY_S) {
        KeyHeld_Reverse = true;
    }
}

function keyReleased(evt) {
    //console.log("Key released: " +evt.keyCode);
    if (evt.keyCode == KEY_A) {
        KeyHeld_TurnLeft = false;
    }
    if (evt.keyCode == KEY_D) {
        KeyHeld_TurnRight = false;
    }
    if (evt.keyCode == KEY_W) {
        KeyHeld_Accelerate = false;
    }
    if (evt.keyCode == KEY_S) {
        KeyHeld_Reverse = false;
    }
}
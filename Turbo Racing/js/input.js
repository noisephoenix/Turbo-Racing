const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;

const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_RIGHT = 39;

//37, 38, 40, 39


var mouseX = 0;
var mouseY = 0;

function setupInput() {
    canvas.addEventListener('mousemove', updateMousePos);

    document.addEventListener('keydown', keyPressed);
    document.addEventListener('keyup', keyReleased);

    blueCar.setupInput(KEY_W, KEY_A, KEY_S, KEY_D);
    greenCar.setupInput(KEY_UP, KEY_LEFT, KEY_DOWN, KEY_RIGHT);
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

function keySet(keyEvent, whichCar, setTo) {
    if (keyEvent.keyCode == whichCar.controlKeyUp) {
        whichCar.KeyHeld_Accelerate = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyLeft) {
        whichCar.KeyHeld_TurnLeft = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyDown) {
        whichCar.KeyHeld_Reverse = setTo;
    }
    if (keyEvent.keyCode == whichCar.controlKeyRight) {
        whichCar.KeyHeld_TurnRight = setTo;
    }
}

function keyPressed(evt) {
    //console.log("Key pressed: " +evt.keyCode);
    keySet(evt, blueCar, true);
    keySet(evt, greenCar, true);
}

function keyReleased(evt) {
    //console.log("Key released: " +evt.keyCode);
    keySet(evt, blueCar, false);
    keySet(evt, greenCar, false);
}
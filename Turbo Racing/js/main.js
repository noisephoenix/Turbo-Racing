
var carPic = document.createElement("img");
var carPicLoaded = false;


var carX = 75;
var carY = 75;
var carAng = 0;
var carSpeed = 2;

const TRACK_W = 40;
const TRACK_H = 40;
const TRACK_GAP = 2;
const TRACK_COLS = 20;
const TRACK_ROWS = 15
var trackGrid =    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                    1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1,
                    1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1,
                    1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1,
                    1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1,
                    1, 0, 2, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

var canvas, canvasContext;

var mouseX = 0;
var mouseY = 0;

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

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    canvas.addEventListener('mousemove', updateMousePos);

    carPic.onload = function () {
        carPicLoaded = true;
    }
    carPic.src = "images/player1.png";
    
    carReset();
}

function carReset() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {
            var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);
            if (trackGrid[arrayIndex] == 2) {
                trackGrid[arrayIndex] = 0;
                carX = eachCol * TRACK_W + TRACK_W/2;
                carY = eachRow * TRACK_H + TRACK_H/2;
            }
        }
    }
}

function updateAll() {
    moveAll();
    drawAll();
}

function carMove() {
    carX += Math.cos(carAng) * carSpeed;
    carY += Math.sin(carAng) * carSpeed;

    carAng += 0.02;
    
}

function isTrackAtColRow(col, row) {
    if (col >= 0 && col < TRACK_COLS &&
        row >= 0 && row < TRACK_ROWS) {
        var trackIndexUnderCoord = rowColtoArrayIndex(col, row);
        return (trackGrid[trackIndexUnderCoord] == 1);
    } else {
        return false;
    }
}

function carTrackHandling() {
    var carTrackCol = Math.floor(carX / TRACK_W);
    var carTrackRow = Math.floor(carY / TRACK_H);
    var trackIndexUnderCar = rowColtoArrayIndex(carTrackCol, carTrackRow);

    // colourText(mouseTrackCol+","+mouseTrackRow+":"+trackIndexUnderMouse, mouseX, mouseY, 'yellow');

    if (carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
        carTrackRow >= 0 && carTrackRow < TRACK_ROWS) {

        if (isTrackAtColRow(carTrackCol, carTrackRow)) {
            carSpeed *= -1;

        } // end of track found
    } // end of valid col and row
} // end of carTrackHandling func

function moveAll() {
    carMove();
    carTrackHandling();
}

function rowColtoArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks() {
    for (var eachRow = 0; eachRow < TRACK_ROWS; eachRow++) {
        for (var eachCol = 0; eachCol < TRACK_COLS; eachCol++) {

            var arrayIndex = rowColtoArrayIndex(eachCol, eachRow);

            if (trackGrid[arrayIndex] == 1) {
                colourRect(TRACK_W * eachCol, TRACK_H * eachRow, TRACK_W - TRACK_GAP, TRACK_H - TRACK_GAP, 'blue');
            } // end of this track here
        } // end of for each track
    }
} // end of drawTracks func

function drawAll() {
    colourRect(0, 0, canvas.width, canvas.height, 'black'); //clear screen
    //colourCircle(carX, carY, 10, 'white'); //draw car
    if (carPicLoaded) {
        drawBitmapCenteredWithRotation(carPic, carX , carY, carAng);
    }
    drawTracks();

}

function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng) {
    canvasContext.save();
    canvasContext.translate(atX, atY);
    canvasContext.rotate(withAng);
    canvasContext.drawImage(useBitmap, -useBitmap.width / 2, -useBitmap.height / 2);
    canvasContext.restore();
}

function colourRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColour) {
    canvasContext.fillStyle = fillColour;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colourCircle(centerX, centerY, radius, fillColour) {
    canvasContext.fillStyle = fillColour;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function colourText(showWords, textX, textY, fillColour) {
    canvasContext.fillStyle = fillColour;
    canvasContext.fillText(showWords, textX, textY);
}
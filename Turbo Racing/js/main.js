var canvas, canvasContext;

var blueCar = new carClass();
var greenCar = new carClass();


window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    //colourRect(0, 0, canvas.width, canvas.height, 'red');
    //colourText("LOADING IMAGES")

    loadImges();
}

function imageLoadingDoneSoStartGame() {
    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    setupInput();

    loadLevel(levelList[levelNow]);
}

function nextLevel() {
    levelNow++;
    if (levelNow >= levelList.length) {
        levelNow = 0;
    }
    loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {
    trackGrid = whichLevel.slice();
    blueCar.reset(carPic, "Blue Storm");
    greenCar.reset(otherCarPic, "Green Machine");
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    blueCar.move();
    greenCar.move();
    
}

function drawAll() {
    drawTracks();
    blueCar.draw();
    greenCar.draw();
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
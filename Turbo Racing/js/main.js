﻿var canvas, canvasContext;

window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000 / framesPerSecond);

    trackLoadImages();
    setupInput();
    carImageLoad();
    carReset();
}

function updateAll() {
    moveAll();
    drawAll();
}

function moveAll() {
    carMove();
    carTrackHandling();
}

function drawAll() {
    drawTracks();
    carDraw();
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
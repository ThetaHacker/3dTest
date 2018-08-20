// @  3dTest Engine v1.0

// @author      : ThetaHacker
// @description : A javascript remake of 3D
// @help        : Standard 3D Controls


// Variables
var screen = {w:window.innerWidth, h:window.innerHeight};
var c = document.getElementById("screen");
var time = 0;

// Resize Canvas
c.width = screen.w
c.height = screen.h

// Setup
var ctx = c.getContext("2d");

// Main loop

var offset = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([4, 2]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10, 10, 100, 100);
}

function march() {
  offset++;
  if (offset > 16) {
    offset = 0;
  }
  draw();
  setTimeout(march, 20);
}

march();

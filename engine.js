// @  3dTest Engine v1.0

// @author      : ThetaHacker
// @description : A javascript remake of 3D
// @help        : Standard 3D Controls


// Variables
var screen = {w:window.innerWidth, h:window.innerHeight};
var c = document.getElementById("screen");

// Resize Canvas
c.width = screen.w
c.height = screen.h

// Setup
var ctx = c.getContext("2d");

ctx.textAlign="center";
ctx.font = "60px serif";
ctx.fillText("3D Experiment", screen.w/2, screen.h/2);

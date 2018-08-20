// Variables
var screen = {w:window.innerWidth, h:window.innerHeight};
var c = document.getElementById("screen");

// Resize Canvas
c.width = screen.w
c.height = screen.h

// Setup
var ctx = c.getContext("2d");

ctx.font = "30px Arial";
ctx.fillText("Hello World", screen.w/2, c.height = screen.h/2);

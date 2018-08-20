// @  3dTest Engine v1.0

// @author      : ThetaHacker
// @description : A javascript remake of 3D
// @help        : Standard 3D Controls


// Variables
var screen = {w:function() {window.innerWidth}, h:function() {window.innerHeight}};
var c = document.getElementById("screen");
var time = 0;
c.width = screen.w
c.height = screen.h
var ctx = c.getContext("2d");

 

function clearc() {
  ctx.clearRect(0, 0, screen.w, screen.h);
}
function linec(x,y,x2,y2) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function step() {
  clearc();
  linec(0,0,screen.w,screen.h);
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

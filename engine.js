// @  3dTest Engine v1.0

// @author      : ThetaHacker
// @description : A javascript remake of 3D
// @help        : Standard 3D Controls


// Variables

var c = document.getElementById("screen");
var time = 0;
var ctx = c.getContext("2d");
var screen;
var xa;
var ya;
var za;
var xb;
var yb;
var zb;
var xrot = 0;
var yrot = 0;

// Functions

function setupc() {
 screen = {w:window.innerWidth, h:window.innerHeight};
 c.width = screen.w
 c.height = screen.h
}
function xyz(xpos,ypos,zpos,xr,yr) {
 xa = xpos;
 ya = ypos;
 za = zpos;
 // X rot
 xb = (xa*Math.cos(xr)) - (za*Math.sin(xr));
 yb = ya;
 zb = (za*Math.cos(xr)) + (xa*Math.sin(xr));
 // Y rot
 xa = xb;
 ya = (yb*Math.cos(yr)) - (zb*Math.sin(yr));
 za = (zb*Math.cos(yr)) + (yb*Math.sin(yr));
 
 xa = (screen.w/2) + xa;
 ya = (screen.h/2) + ya;
}
function clearc() {
  ctx.clearRect(0, 0, screen.w, screen.h);
}
function linec(x,y,x2,y2) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
function line3d(xposa,yposa,zposa,xposb,yposb,zposb) {
 var xstore;
 var ystore;
 var zstore;
 xyz(xposa,yposa,zposa,xrot,yrot)
 xstore = xa;
 ystore = ya;
 zstore = za;
 xyz(xposb,yposb,zposb,xrot,yrot)
 linec(xa,ya,xstore,ystore)

}

// Main Loop

function step() {
  setupc();
  clearc();
  line3d(100,100,100,-100,100,100)
  line3d(100,-100,100,-100,-100,100)
  line3d(100,100,-100,-100,100,-100)
  line3d(100,-100,-100,-100,-100,-100)
  window.requestAnimationFrame(step);
  xrot += 0.1;
  yrot += 0.05;
}

window.requestAnimationFrame(step);

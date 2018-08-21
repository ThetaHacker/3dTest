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
var xrotsin;
var yrotsin;
var xrotcos;
var yrotcos;

// Functions

function mouseupdate(event) {
  xrot = event.clientX;
  yrot = event.clientY;
}
function setupc() {
 screen = {w:window.innerWidth, h:window.innerHeight};
 c.width = screen.w
 c.height = screen.h
}
function xyz(xpos,ypos,zpos,xr,yr) {
  xrotsin = Math.sin(xr)*(180 / Math.PI);
  yrotsin = Math.sin(yr)*(180 / Math.PI);
  xrotcos = Math.cos(xr)*(180 / Math.PI);
  yrotcos = Math.cos(yr)*(180 / Math.PI);
  xa = xpos;
  ya = ypos;
  za = zpos;
  // X rot
  xb = (xa*xrotcos) - (za*xrotsin);
  yb = ya;
  zb = (za*xrotcos) + (xa*xrotsin);
  // Y rot
  xa = xb;
  ya = (yb*yrotcos) - (zb*yrotsin);
  za = (zb*yrotcos) + (yb*yrotsin);
 
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
  
}

window.requestAnimationFrame(step);

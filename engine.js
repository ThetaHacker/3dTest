// @  3d Engine v1.0

// @author      : ThetaHacker
// @description : js3D a fast canvas 3D render
// @help        : An experiment by ThetaHacker


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
var xp;
var yp;
var xrot = 0;
var yrot = 0;
var xrotsin;
var yrotsin;
var xrotcos;
var yrotcos;
var debug = 1;

// Functions

function mouseupdate(event) {
  xrot = screen.w/2 + event.clientX;
  yrot = screen.h/2 + event.clientY;
}
function setupc() {
 screen = {w:window.innerWidth, h:window.innerHeight};
 c.width = screen.w
 c.height = screen.h
}
function debugc() {
  if (debug=1) {
    ctx.fillText("Screen Width: " + screen.w + "px",5,14);
    ctx.fillText("Screen Height: " + screen.h + "px",5,26);
  }
}
function perspective(xpos,ypos,zpos) {
  xp = xpos/(zpos/140)
  yp = ypos/(zpos/140)
}
function xyz(xpos,ypos,zpos,xr,yr) {
  xrotsin = Math.sin((xr/180)*Math.PI);
  yrotsin = Math.sin((yr/180)*Math.PI);
  xrotcos = Math.cos((xr/180)*Math.PI);
  yrotcos = Math.cos((yr/180)*Math.PI);
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
  var xstorea;
  var ystorea;
  var zstorea;
  var xstoreb;
  var ystoreb;
  var zstoreb;
  xyz(xposa,yposa,zposa,xrot,yrot)
  xstorea = xa;
  ystorea = ya;
  zstorea = za;
  xyz(xposb,yposb,zposb,xrot,yrot)
  xstoreb = xa;
  ystoreb = ya;
  zstoreb = za;
  // Perspective
  perspective(xstorea,ystorea,zstorea)
  xstorea = xp; ystorea = yp;
  perspective(xstoreb,ystoreb,zstoreb)
  xstoreb = xp; ystoreb = yp;
  
  linec(xstorea + screen.w/2,ystorea + screen.h/2,xstoreb + screen.w/2,ystoreb + screen.h/2)
  
  if (debug == 1) {
    
    // Postion
    ctx.fillText(xposa + ", " + yposa + ", " + zposa,xstorea + 7 + screen.w/2,ystorea + screen.h/2);
    ctx.fillText(xposb + ", " + yposb + ", " + zposb,xstoreb + 7 + screen.w/2,ystoreb + screen.h/2);
    // Nodes
    ctx.rect(xstorea-4 + screen.w/2, ystorea-4 + screen.h/2, 8, 8);
    ctx.fill();
    ctx.rect(xstoreb-4 + screen.w/2, ystoreb-4 + screen.h/2, 8, 8);
    ctx.fill();
  }

}
function cube() {
  
  // Render Cube Test
  
  line3d(100,100,100 + 250,-100,100,100 + 250)
  line3d(100,-100,100 + 250,-100,-100,100 + 250)
  line3d(100,100,-100 + 250,-100,100,-100 + 250)
  line3d(100,-100,-100 + 250,-100,-100,-100 + 250)
  
  line3d(100,-100,100 + 250,100,100,100 + 250)
  line3d(-100,-100,100 + 250,-100,100,100 + 250)
  line3d(100,-100,-100 + 250,100,100,-100 + 250)
  line3d(-100,-100,-100 + 250,-100,100,-100 + 250)
  
  line3d(100,100,-100 + 250,100,100,100 + 250)
  line3d(-100,100,-100 + 250,-100,100,100 + 250)
  line3d(100,-100,-100 + 250,100,-100,100 + 250)
  line3d(-100,-100,-100 + 250,-100,-100,100 + 250)
  
}
// Main Loop

ctx.font = "10px Arial";
function step() {
  setupc();
  clearc();
  
  cube();
  
  debugc();
  // Recursive
  window.requestAnimationFrame(step);
  
}

window.requestAnimationFrame(step);

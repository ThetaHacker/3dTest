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
var shapesrendered = 0;
var debug = 1;
var player = {x:0,y:0,z:0}

var perspective = 2; // 1 = first person, 2 = Orthographic

// Controls

function controls3d() {
  var x = event.key;
  if (x == "w") {
    player.z += 5
  }
  if (x == "s") {
    player.z += -5
  }
}

document.body.addEventListener("keypress", controls3d);

// Functions


function calctrig() {
  xrotsin = Math.sin((xrot/180)*Math.PI);
  yrotsin = Math.sin((yrot/180)*Math.PI);
  xrotcos = Math.cos((xrot/180)*Math.PI);
  yrotcos = Math.cos((yrot/180)*Math.PI);
}
function mouseupdate(event) {
  xrot = event.clientX-screen.w/2;
  yrot = event.clientY-screen.h/2;
}
function setupc() {
 screen = {w:window.innerWidth, h:window.innerHeight};
 c.width = screen.w
 c.height = screen.h
}
function debugc() {
  if (debug=1) {
    ctx.fillText("Screen Width: " + screen.w + "px",5,64);
    ctx.fillText("Screen Height: " + screen.h + "px",5,76);
    ctx.fillText("Shapes/Text Rendered: " + shapesrendered,5,88);
    shapesrendered = 0;
  }
}
function perspectivecalc(xpos,ypos,zpos) {
  if (perspective == 1) {
    xp = xpos/(((zpos+200)/250) + 0.5)
    yp = ypos/(((zpos+200)/250) + 0.5)
  }
  if (perspective == 2) {
    // Orthographic
    xp = xpos
    yp = ypos
  }
}
function xyz(xpos,ypos,zpos,xr,yr) {
  
  xa = xpos - player.x;
  ya = ypos - player.y;
  za = zpos - player.z;
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
  // Draw
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.lineWidth=0;
}
function line3d(xposa,yposa,zposa,xposb,yposb,zposb) {
  var xstorea;
  var ystorea;
  var zstorea;
  var xstoreb;
  var ystoreb;
  var zstoreb;
  if (perspective == 1) {
    xyz(xposa,yposa,zposa + 200,xrot,yrot)
  } else {
    xyz(xposa,yposa,zposa,xrot,yrot)
  }
  xstorea = xa;
  ystorea = ya;
  zstorea = za;
  if (perspective == 1) {
    xyz(xposb,yposb,zposb + 200,xrot,yrot)
  } else {
    xyz(xposb,yposb,zposb,xrot,yrot)
  }
  xstoreb = xa;
  ystoreb = ya;
  zstoreb = za;
  // Perspective
  perspectivecalc(xstorea,ystorea,zstorea)
  xstorea = xp; ystorea = yp;
  perspectivecalc(xstoreb,ystoreb,zstoreb)
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
    shapesrendered +=5;
  }

}
function cube() {
  
  // Render Cube Test
  
  line3d(100,100,100,-100,100,100)
  line3d(100,-100,100,-100,-100,100)
  line3d(100,100,-100,-100,100,-100)
  line3d(100,-100,-100,-100,-100,-100)
  
  line3d(100,-100,100,100,100,100)
  line3d(-100,-100,100,-100,100,100)
  line3d(100,-100,-100,100,100,-100)
  line3d(-100,-100,-100,-100,100,-100)
  
  line3d(100,100,-100,100,100,100)
  line3d(-100,100,-100,-100,100,100)
  line3d(100,-100,-100,100,-100,100)
  line3d(-100,-100,-100,-100,-100,100)
}
// Main Loop

ctx.font = "10px Arial";
function step() {
  setupc();
  clearc();
  calctrig();
  cube();
  
  debugc();
  // Recursive
  window.requestAnimationFrame(step);
  
}

window.requestAnimationFrame(step);

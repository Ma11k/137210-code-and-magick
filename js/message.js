var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.id = 'magesays';
canvas.style.position = 'absolute';
canvas.style.zIndex = 100;
var container = document.getElementsByTagName('header')[0];
var ctx = canvas.getContext('2d');
//ctx.strokeRect(0, 0, 100, 100);



/**
 * Draws a [rounded] rectangle
 * @param {number} width
 * @param {number} height
 * @param {number} [radius] border radius
 * @param {number} [startX] left position
 * @param {number} [startY] top position
 * @param {string} [backC] background color
 * @param {number} [borderW] border width
 * @param {string} [borderC] border color
 */
function drawrect(width, height, radius, startX, startY, backC, borderW, borderC) {
  ctx.clearRect(0,0,400,400);
  var borderW = borderW || 0;
  var borderC = borderW ? (borderC || "transparent") : "transparent";
  var startX = startX + borderW || 0;
  var startY = startY + borderW || 0;
  var width = width +  startX + (borderW || 0) || width;
  var height = height + startY + (borderW || 0) || height;
  var radius = radius || 0;
  ctx.lineWidth = borderW || 0;
  ctx.strokeStyle = borderC || 'transparent';
  ctx.fillStyle = backC || '#FFFFFF';
  ctx.beginPath();

//слева направо
  ctx.moveTo(startX + radius,  startY || 0);
  ctx.lineTo(width, startY || 0);
  ctx.arc(width, radius + (startY || 0), radius, 1.5 * Math.PI, 0 * Math.PI, false);
  //сверху вниз
  ctx.lineTo(width + radius, height);
  ctx.arc(width, height, radius, 0 * Math.PI, 0.5 * Math.PI, false);
  //справа налево
  ctx.lineTo((startX || 0) + radius, height + radius);
  ctx.arc(radius + (startX || 0), height, radius, 0.5 * Math.PI, 1 * Math.PI, false);
  //снизу вверх
  ctx.lineTo((startX || 0), height);
  ctx.arc(radius + (startX || 0), radius + (startY || 0), radius, 1 * Math.PI, 1.5 * Math.PI, false);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.fill();
}
//drawrect(120, 50, 5, 30, 30);
//drawrect(320, 20, 10, 10, 30);

setTimeout(function () {drawrect(200, 100, 20, 0, 0, 'white', 0);}, 0);
setTimeout(function () {drawrect(220, 120, 20, 0, 0, 'white', 0);}, 100);
setTimeout(function () {drawrect(240, 140, 20, 0, 0, 'white', 0);}, 200);
setTimeout(function () {drawrect(280, 180, 20, 0, 0, 'white', 0);}, 300);
setTimeout(function () {drawrect(300, 200, 20, 0, 0, 'white', 0);}, 500);


setTimeout(function () {
  ctx.font = '44px Arial';
  // Create gradient
  var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // Fill with gradient
  ctx.fillStyle=gradient;
  ctx.fillText('Привет!', 30, 80);
}, 500);




//document.getElementsByTagName('body')[0].appendChild(canvas);
container.insertBefore(canvas, container.firstChild);

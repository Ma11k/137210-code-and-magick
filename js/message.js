// var canvas = document.createElement('canvas');
// canvas.width = 400;
// canvas.height = 400;
// canvas.id = 'magesays';
// canvas.style.position = 'absolute';
// canvas.style.zIndex = 100;
// var container = document.getElementsByTagName('header')[0];
// var ctx = canvas.getContext('2d');
// //whereToDraw.ctx.strokeRect(0, 0, 100, 100);



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
function drawRect(whereToDraw, width, height, radius, startX, startY, backC, borderW, borderC) {
  //whereToDraw.ctx.clearRect(0,0,400,400);
  var borderW = borderW || 0;
  var borderC = borderW ? (borderC || "transparent") : "transparent";
  var startX = startX + borderW || 0;
  var startY = startY + borderW || 0;
  var width = width +  startX + (borderW || 0) || width;
  var height = height + startY + (borderW || 0) || height;
  var radius = radius || 0;
  whereToDraw.ctx.lineWidth = borderW || 0;
  whereToDraw.ctx.strokeStyle = borderC || 'transparent';
  whereToDraw.ctx.fillStyle = backC || '#FFFFFF';
  whereToDraw.ctx.beginPath();

//слева направо
  whereToDraw.ctx.moveTo(startX + radius,  startY || 0);
  whereToDraw.ctx.lineTo(width, startY || 0);
  whereToDraw.ctx.arc(width, radius + (startY || 0), radius, 1.5 * Math.PI, 0 * Math.PI, false);
  //сверху вниз
  whereToDraw.ctx.lineTo(width + radius, height);
  whereToDraw.ctx.arc(width, height, radius, 0 * Math.PI, 0.5 * Math.PI, false);
  //справа налево
  whereToDraw.ctx.lineTo((startX || 0) + radius, height + radius);
  whereToDraw.ctx.arc(radius + (startX || 0), height, radius, 0.5 * Math.PI, 1 * Math.PI, false);
  //снизу вверх
  whereToDraw.ctx.lineTo((startX || 0), height);
  whereToDraw.ctx.arc(radius + (startX || 0), radius + (startY || 0), radius, 1 * Math.PI, 1.5 * Math.PI, false);
  whereToDraw.ctx.stroke();
  whereToDraw.ctx.fillStyle = 'rgba(255,255,255,0.8)'
  whereToDraw.ctx.fill();
}
//drawRect(120, 50, 5, 30, 30);
//drawRect(320, 20, 10, 10, 30);

//setTimeout(function () {drawRect(200, 100, 20, 0, 0, 'white', 0);}, 0);
//setTimeout(function () {drawRect(220, 120, 20, 0, 0, 'white', 0);}, 100);
//setTimeout(function () {drawRect(240, 140, 20, 0, 0, 'white', 0);}, 200);
//setTimeout(function () {drawRect(280, 180, 20, 0, 0, 'white', 0);}, 300);
//setTimeout(function () {drawRect(300, 200, 20, 0, 0, 'white', 0);}, 500);


function drawText(whereToDraw, text, startX, startY, txtColor, txtFont) {
    whereToDraw.ctx.font = txtFont || '44px Arial';
    whereToDraw.ctx.fillStyle = txtColor || 'black';
    whereToDraw.ctx.fillText((text || 'Привет!'), (startX || 0), (startY || 0));
}

// drawRect(300, 250, 5, 30, 30);
// whereToDraw.ctx.font = '44px Arial';
// whereToDraw.ctx.fillStyle = 'black';
// whereToDraw.ctx.fillText( 'Привет!', 20, 20);

//drawText('Привет!', 'red', 29, 19);

//document.getElementsByTagName('body')[0].appendChild(canvas);
//container.insertBefore(canvas, container.firstChild);

var canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 400;
canvas.id = 'magesays';
canvas.style.position = 'absolute'
var container = document.getElementsByTagName('header')[0];
var ctx = canvas.getContext('2d');

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
  ctx.fill();
}



//ctx.strokeRect(0, 0, 100, 100);
//ctx.font = '14px Arial';
//ctx.fillText('Привет!');
//document.getElementsByTagName('body')[0].appendChild(canvas);
container.insertBefore(canvas, container.firstChild);



//drawrect(120, 50, 5, 30, 30);
drawrect(300, 200, 20, 0, 0, 'white', 0);
//drawrect(320, 20, 10, 10, 30);

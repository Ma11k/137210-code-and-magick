var canvas = document.createElement('canvas');
canvas.id = 'magesays';


var ctx = canvas.getContext('2d');
// ctx.strokeRect(0, 0, 100, 100);
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = 'red';
//ctx.lineWidth = 4;
//ctx.font = '14px Arial';
//ctx.fillText('Привет!');


function drawrect(width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  //слева направо
  ctx.lineTo(width, 0);
  ctx.arc(width, radius, radius, 1.5 * Math.PI, 0 * Math.PI, false);
  //сверху вниз
  ctx.lineTo(width + radius, height);
  ctx.arc(width, height, radius, 0 * Math.PI, 0.5 * Math.PI, false);
  //справа налево
  ctx.lineTo(height/2, height+radius);
  ctx.arc(radius, height, radius, 0.5 * Math.PI, 1 * Math.PI, false);
  //снизу вверх
  ctx.lineTo(0, height/2);
  ctx.arc(radius, radius, radius, 1 * Math.PI, 1.5 * Math.PI, false);

  ctx.stroke();
  ctx.fill();
}
drawrect(120, 100, 50);




document.getElementsByTagName('body')[0].appendChild(canvas);

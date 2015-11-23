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
 * Example: drawRect(200, 100, 20, 0, 0, 'white', 0);
 * @param {=number} width
 * @param {=number} height
 * @param {?number} radius border radius
 * @param {?number} startX left position
 * @param {?number} startY top position
 * @param {?string} bgColor background color
 * @param {?number} borderW border width
 * @param {?string} borderC border color
 */
function drawRect(whereToDraw, width, height, radius, startX, startY, bgColor, borderW, borderC) {
  //whereToDraw.ctx.clearRect(0,0,400,400);
  var borderW = borderW || 0;
  var borderC = borderW ? (borderC || 'transparent') : 'transparent';
  var startX = startX + borderW || 0;
  var startY = startY + borderW || 0;
  var width = width +  startX + (borderW || 0) - (radius || 0) || width;
  var height = height + startY + (borderW || 0) - (radius || 0) || height;
  var radius = radius || 0;
  whereToDraw.ctx.lineWidth = borderW || 0;
  whereToDraw.ctx.strokeStyle = borderC || 'transparent';
  whereToDraw.ctx.fillStyle = bgColor || '#FFFFFF';
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
  whereToDraw.ctx.fill();
}


/**
 * Outputs styled line of text
 * Example: drawText(this, 'Игра на паузе!', 300, 50, 'black', '16px PT Mono', start);
 * @param {Object} whereToDraw
 * @param {string} text
 * @param {number} [startX]
 * @param {number} [startY]
 * @param {string} [txtColor]
 * @param {string} [txtFont]
 * @param {string} [txtAlign]
 */
function drawText(whereToDraw, text, startX, startY, txtColor, txtFont, txtAlign) {
  whereToDraw.ctx.font = txtFont || '44px Arial';
  whereToDraw.ctx.textAlign = txtAlign || 'start';
  whereToDraw.ctx.fillStyle = txtColor || 'black';
  whereToDraw.ctx.fillText((text || 'Привет!'), (startX || 0), (startY || 0));

}


function multiLineTxt(whereToDraw, text, textwidth, txtFont) {
  console.log( "textwidth = " + textwidth );
  var wordsArray = text.split(' ')
  console.log( 'wordsArray = ' + wordsArray );
  var linesArray = [''];
  whereToDraw.ctx.font = txtFont;
  var u = 0;
  for (var i = 0; i < wordsArray.length; i++) {
    var prevWordWidth = whereToDraw.ctx.measureText(linesArray[u]).width;
    var newWordWidth = whereToDraw.ctx.measureText(wordsArray[i] + ' ').width;
    if ( prevWordWidth + newWordWidth < textwidth) {
      linesArray[u] += wordsArray[i] + ' ';
    } else {
      linesArray.push((wordsArray[i]+ ' '));
      u++;
    }
  }
  return linesArray;


}


function drawMultiLineTxt(whereToDraw, text, textwidth, lineHeight, startX, startY, txtColor, txtFont, bgColor, bgRadius) {

  var textLines = multiLineTxt(whereToDraw, text, textwidth, txtFont);
  var startY = startY || 0;
  //Рисуем подложку
  var rectHeight = lineHeight * textLines.length;

  drawRect(whereToDraw, textwidth + 10, rectHeight + 30, (bgRadius || 20), startX - 10, startY - 25, 'rgba(0, 0, 0, 0.7)');
  drawRect(whereToDraw, textwidth + 20, rectHeight + 30, (bgRadius || 20), startX - 15, startY - 30, bgColor);

  //Рисуем текст
  for (var i = 0; i < textLines.length; i++) {
      drawText(whereToDraw, textLines[i], startX, startY, txtColor, txtFont);
      startY = startY + lineHeight;
  }

}

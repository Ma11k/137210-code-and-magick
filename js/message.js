'use strict';

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
  borderW = borderW || 0;
  borderC = borderW ? (borderC || 'transparent') : 'transparent';
  startX = startX + borderW || 0;
  startY = startY + borderW || 0;
  width = width + startX + (borderW || 0) - (radius || 0) || width;
  height = height + startY + (borderW || 0) - (radius || 0) || height;
  console.log( 'radius = ' + radius );
  radius = radius || 0;
  whereToDraw.ctx.lineWidth = borderW || 0;
  whereToDraw.ctx.strokeStyle = borderC || 'transparent';
  whereToDraw.ctx.fillStyle = bgColor || '#FFFFFF';
  whereToDraw.ctx.beginPath();
  //слева направо
  whereToDraw.ctx.moveTo(startX + radius, startY || 0);
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
 * Example: drawText(this, 'Игра на паузе!', 300, 50, 'black', '16px PT Mono', 'center');
 * @param {Object} whereToDraw
 * @param {string} text
 * @param {?number} startX
 * @param {?number} startY
 * @param {?string} txtColor
 * @param {?string} txtFont
 * @param {?string} txtAlign
 */
function drawText(whereToDraw, text, startX, startY, txtColor, txtFont, txtAlign) {
  whereToDraw.ctx.font = txtFont || '44px Arial';
  whereToDraw.ctx.textAlign = txtAlign || 'start';
  whereToDraw.ctx.fillStyle = txtColor || 'black';
  whereToDraw.ctx.fillText((text || 'Привет!'), (startX || 0), (startY || 0));
}

/**
 * Breaks string to lines
 * Example: multiLineTxt(this, 'Many many words in line', 220, '16px Arial');
 * @param {Object} whereToDraw
 * @param {string} text
 * @param {number} textWidth
 * @param {string} txtFont
 * @return {Array}
 */
function multiLineTxt(whereToDraw, text, textWidth, txtFont) {
  var wordsArray = text.split(' ')
  var linesArray = [];
  whereToDraw.ctx.font = txtFont;
  var u = 0;
  for (var i = 0; i < wordsArray.length; i++) {
    var prevWordWidth = whereToDraw.ctx.measureText(linesArray[u]).width; //померить сразу два слова
    var newWordWidth = whereToDraw.ctx.measureText(wordsArray[i]).width;
    if (prevWordWidth + newWordWidth < textWidth) {
      linesArray[u] = linesArray[u] ? linesArray[u] : '';
      linesArray[u] += wordsArray[i] + ' ';
    } else {
      linesArray.push(wordsArray[i] + ' ');
      u++;
    }
  }
  return linesArray;
}

/**
 * Draws multi lines of text on a rectangle with shadow
 * Example: drawMultiLineTxt(this, 'Many many words', 320, 20, 0, 0, 'black', '14px Arial', 'white', 20);
 * @param {Object} whereToDraw
 * @param {string} text
 * @param {number} textWidth
 * @param {string} txtFont
 * @param {?number} startX
 * @param {?number} startY
 * @param {?string} txtColor
 * @param {?string} bgColor
 * @param {?number} bgRadius
 */
function drawMultiLineTxt(whereToDraw, text, textWidth, txtFont, txtColor, startX, startY, bgColor, bgRadius) {
  var textLines = multiLineTxt(whereToDraw, text, textWidth, txtFont);
  startX = startX || 0;
  startY = startY || 0;
  var lineHeight = parseInt(txtFont.split(' ')[0]) + 6;
  //Рисуем подложку
  var rectHeight = lineHeight * textLines.length;
  drawRect(whereToDraw, textWidth + 10, rectHeight + 30, (bgRadius || 0), startX - 10, startY - 25, 'rgba(0, 0, 0, 0.7)');
  drawRect(whereToDraw, textWidth + 20, rectHeight + 30, (bgRadius || 0), startX - 15, startY - 30, bgColor);
  //Рисуем текст
  for (var i = 0; i < textLines.length; i++) {
      drawText(whereToDraw, textLines[i], startX, startY, txtColor, txtFont);
      //startY = startY + lineHeight[0];
      startY = startY + lineHeight;
  }
}

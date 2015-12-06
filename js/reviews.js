'use strict';

/* global reviews:true */

/**
 * @param {Object} data
 * @return {Element}
 */
function getElementFromTemplate(data) {
  var template = document.querySelector('#review-template');

  if ('content' in template) {
    var element = template.content.children[0].cloneNode(true);
  } else {
    var element = template.children[0].cloneNode(true);
  }

  element.querySelector('.review-text').textContent = data.description;
  console.log('element = ', element);

  // var backgroundImage = new Image();
  // backgroundImage.onload = function() {
  //   element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
  // }
  //
  // backgroundImage.src = '/img/' + data.picture;

  return element;
}

function parse() {
  var container = document.querySelector('.reviews-list');

  var element = reviews.forEach(function(item, i, reviews) {
    var element = getElementFromTemplate(item);
    container.appendChild(element);
  });


};
parse();

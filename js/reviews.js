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

  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    backgroundImage.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
  }
  backgroundImage.onerror = function() {
    element.classList.add('review-load-failure');
  }
  backgroundImage.src = '/' + data.author.picture;
  backgroundImage.classList.add('review-author');
  backgroundImage.style.width = '124px';
  backgroundImage.style.height = '124px';
  backgroundImage.title = data.author.name;
  backgroundImage.alt = data.author.name;

  element.replaceChild(backgroundImage, element.querySelector('.review-author'))


  return element;
}


(function() {
  var container = document.querySelector('.reviews-list');

  var element = reviews.forEach(function(item, i, reviews) {
    var element = getElementFromTemplate(item);
    container.appendChild(element);
  });

})();

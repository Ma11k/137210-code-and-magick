'use strict';
/* global reviews:true */

/**
 * @param {Object} data
 * @return {Element}
 */
function getElementFromTemplate(data) {
  var template = document.querySelector('#review-template');
  var element;
  if ('content' in template) {
    element = template.content.children[0].cloneNode(true);
  } else {
    element = template.children[0].cloneNode(true);
  }

  element.querySelector('.review-text').textContent = data.description;

  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    backgroundImage.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
  };
  backgroundImage.onerror = function() {
    element.classList.add('review-load-failure');
  };
  backgroundImage.src = '/' + data.author.picture;
  backgroundImage.classList.add('review-author');
  backgroundImage.style.width = '124px';
  backgroundImage.style.height = '124px';
  backgroundImage.title = data.author.name;
  backgroundImage.alt = data.author.name;
  element.replaceChild(backgroundImage, element.querySelector('.review-author'));
  return element;
}

(function() {
  document.querySelector('.reviews-filter').classList.add('invisible');
  var container = document.querySelector('.reviews-list');
  reviews.forEach(function(item) {
    var element = getElementFromTemplate(item);
    container.appendChild(element);
  });
})();

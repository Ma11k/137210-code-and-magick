'use strict';
/* global reviews:true */

var template = document.querySelector('#review-template');
var ratingArr = ['one', 'two', 'three', 'four', 'five'];
var templateContent = (template.content || template).children[0];

/**
 * @param {Object} data
 * @return {Element}
 */
function getElementFromTemplate(data) {
  var element;
  element = templateContent.cloneNode(true);
  //Text
  element.querySelector('.review-text').textContent = data.description;
  //Image
  var backgroundImage = new Image(124, 124);
  backgroundImage.onload = function() {
    backgroundImage.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
  };
  backgroundImage.onerror = function() {
    element.classList.add('review-load-failure');
  };
  backgroundImage.src = data.author.picture;
  backgroundImage.classList.add('review-author');
  backgroundImage.title = data.author.name;
  backgroundImage.alt = data.author.name;
  element.replaceChild(backgroundImage, element.querySelector('.review-author'));
  //Rating
  element.querySelector('.review-rating').classList.add('review-rating-' + ratingArr[data.rating - 1]);
  return element;
}

(function() {
  if (!reviews.length) {
    document.querySelector('.reviews-filter').classList.add('invisible');
  }
  var container = document.querySelector('.reviews-list');
  reviews.forEach(function(item) {
    var oneReview = getElementFromTemplate(item);
    container.appendChild(oneReview);
  });
})();

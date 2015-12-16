'use strict';

var reviews = null;
var xhr = new XMLHttpRequest();
/**
 * @param {string} method
 * @param {string} URL
 * @param {boolean} async
*/
xhr.open('GET', 'data/reviews.json');
xhr.timeout = 10000;

/**
 * @param {Event} evt
*/
xhr.onload = function(evt) {
  reviewsContainer.classList.remove('reviews-list-loading');
  reviews = JSON.parse(evt.srcElement.response);
  renderReviews(reviews);
};
xhr.onerror = function() {
  reviewsContainer.classList.remove('reviews-list-loading');
  reviewsContainer.classList.add('reviews-load-failure');
};
xhr.send();

var template = document.querySelector('#review-template');
var ratingArr = ['one', 'two', 'three', 'four', 'five'];
var timplateContent = (template.content || template).children[0];
var reviewsContainer = document.querySelector('.reviews');
var filtersAll = document.querySelector('.reviews-filter');
/**
 * @param {Object} data
 * @return {Element}
 */
function getElementFromTemplate(data) {
  var element;
  element = timplateContent.cloneNode(true);
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

/**
 * @param {Object} data
*/
function renderReviews(reviewsToRender) {
  if (!reviewsToRender.length) {
    filtersAll.classList.add('invisible');
  }
  var container = document.querySelector('.reviews-list');
  reviewsToRender.forEach(function(item) {
    var oneReview = getElementFromTemplate(item);
    container.appendChild(oneReview);
  });
}

var activeFilter = 'reviews-all';
function setFilter(id) {
  if (activeFilter === id) {
    return;
  }
  filtersAll[activeFilter].checked = false;
  filtersAll[id].checked = true;
  var filteredReviews = reviews.slice(0);
  switch (id) {
    case 'reviews-all':

      break;
    case 'reviews-recent':

      break;
    case 'reviews-good':

      break;
    case 'reviews-bad':

      break;
    case 'reviews-popular':

      break;
    default:

  }
  renderReviews(filteredReviews);
}

(function() {
  reviewsContainer.classList.add('reviews-list-loading');
  Array.prototype.slice.call(filtersAll.children).forEach(function(item) {
    item.onclick = function(evt) {
      var filterID = evt.target.id;
      setFilter(filterID);
    };
  });

})();

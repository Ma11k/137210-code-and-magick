'use strict';

var reviews = null;
var filteredReviews;
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data/reviews.json');
xhr.timeout = 10000;
/**
 * @param {Event} evt
*/
xhr.onload = function(evt) {
  reviewsContainer.classList.remove('reviews-list-loading');
  reviews = JSON.parse(evt.srcElement.response);
  filteredReviews = reviews;
  renderReviews(reviews, 0);
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
var container = reviewsContainer.querySelector('.reviews-list');
var showMore = reviewsContainer.querySelector('.reviews-controls-more');
var filtersAll = reviewsContainer.querySelector('.reviews-filter');
var REV_PER_PAGE = 3;
var pageNumber = 0;
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
 * @param {boolean} redraw
*/
function renderReviews(reviewsToRender, redraw) {
  if (redraw) {
    container.innerHTML = '';
  }
  if (reviewsToRender.length) {
    filtersAll.classList.remove('invisible');
  }
  var from = pageNumber * REV_PER_PAGE;
  var to = from + REV_PER_PAGE;
  var pageReviews = reviewsToRender.slice(from, to);
  var fragment = document.createDocumentFragment();
  pageReviews.forEach(function(item) {
    var oneReview = getElementFromTemplate(item);
    fragment.appendChild(oneReview);
  });
  container.appendChild(fragment);
  if (container.children.length < reviewsToRender.length) {
    showMore.classList.remove('invisible');
  } else {
    showMore.classList.add('invisible');
  }
}

/**
 * @param {string} id of active filter
*/
function setFilter(id) {
  filteredReviews = reviews.slice(0);
  switch (id) {
    case 'reviews-all':
      break;
    case 'reviews-recent':
      filteredReviews.sort(function(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      break;
    case 'reviews-good':
      filteredReviews = filteredReviews.filter(function(el) {
        return el.rating > 2;
      }).sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      filteredReviews = filteredReviews.filter(function(el) {
        return el.rating < 3;
      }).sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      filteredReviews.sort(function(a, b) {
        return a['review-rating'] - b['review-rating'];
      });
      break;
  }
  renderReviews(filteredReviews, true);
}

(function() {
  filtersAll.classList.add('invisible');
  reviewsContainer.classList.add('reviews-list-loading');
  reviewsContainer.addEventListener('click', function(evt) {
    var clicked = evt.target;
    if (clicked.classList.contains('reviews-filter-item') && !filtersAll[clicked.htmlFor].checked) {
      pageNumber = 0;
      setFilter(clicked.htmlFor);
    }
    if (clicked.classList.contains('reviews-controls-more')) {
      pageNumber++;
      renderReviews(filteredReviews, false);
    }
  });
})();

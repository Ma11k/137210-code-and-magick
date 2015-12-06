'use strict';
/**
 * @param {Object} data
 * @return {Element}
 */
function getElementFromTemplate(data) {
  var template = document.querySelector('#review-template');
  var element = template.content.children[0].cloneNode(true);

  element.querySelector('.review-text').textContent = data.description;


  return element;
}

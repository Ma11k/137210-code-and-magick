'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();


//Форма и поля ввода
// var formElement = document.forms['review-form'];
// var formMark = formElement['review-form-group-mark'];
// var formName = formElement['review-name'];
// var formText = formElement['review-text'];
// var formSubmit = formElement['review-submit'];
// var formHint = formElement['review-fields'];

var formElement = document.querySelectorAll('form.review-form');

function validation() {

  formName.onchange = function(){
    alert('1111');
  }
  formText.onchange = function(){
    alert('4544');
}

}
validation();

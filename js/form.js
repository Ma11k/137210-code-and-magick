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
var formElement = document.querySelector('form.review-form');
var formName = formElement.querySelector('.review-form-field-name');
var formMark = formElement.querySelector('.review-form-group-mark');
var formText = formElement.querySelector('.review-form-field-text');
var formSubmit = formElement.querySelector('.review-submit');
var formHint = formElement.querySelector('.review-fields');

var nameOK = false;
var markOK = false;
var textOK = false;

function submitEnabled() {
  console.log('markOK ! = ', markOK);
  console.log('nameOK ! = ', nameOK);
  if (markOK && nameOK && textOK) {
    formSubmit.disabled = false;
  } else {
    console.log(' фигня ');
    formSubmit.disabled = true;
  }
}

function checkMark() {
  var arr = formMark.querySelectorAll('input');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].checked  && i > 1 && textOK) {
      return true;
    }
  }
  return false;
}

function checkName() {
  console.log('formName.value = ', formName.value);
  if (formName.value.length > 2) {
    return true;
  }
  return false;
}

function checkText() {
  if (formText.value != '') {
    return true;
  }
  return false;
}

(function validation() {

  markOK = checkMark();
  nameOK = checkName();
  textOK = true;
  if(!markOK) {textOK = false};
  submitEnabled();


  formText.onchange = function(){

  }

  formMark.onchange = function(){
    markOK = checkMark();
    console.log('markOK = ', markOK);
    submitEnabled();
  }

  formName.oninput = function(){
    nameOK = checkName();
    submitEnabled();
  }
})();

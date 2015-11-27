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

var MINUMUM = 3;
var nameOK = false;
var markOK = false;
var textOK = false;

function submitEnabled() {
  checkText();
  checkMark();
  checkName();
  console.log('markOK ! = ', markOK);
  console.log('nameOK ! = ', nameOK);
  console.log('textOK ! = ', textOK);
  if (nameOK && (markOK || textOK)) {
    formSubmit.disabled = false;
  } else {
    console.log(' фигня ');
    formSubmit.disabled = true;
  }
}

function checkMark() {
  var arr = formMark.querySelectorAll('input');
  console.log('textOK в марке = ', textOK);
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].checked && i > 1) {
      //return true;
      markOK = true;
      break;
      console.log('markO = ', markOK);
    } else {
      markOK = false;
      console.log('mark1 = ', markOK);
    }
  }
  //return false;

}

function checkName() {
  if (formName.value.length >= MINUMUM) {
    //return true;
    nameOK = true
  } else {
    nameOK = false;
  }
  //return false;
}

function checkText() {
  if (formText.value.length >= MINUMUM) {
    //return true;
    textOK = true;
  } else {
    textOK = false;
  }
  //return false;
}

(function validation() {
  // markOK = checkMark();
  // nameOK = checkName();
  // textOK = checkText();
  submitEnabled();

  formText.oninput = function(){
    //textOK = checkText();
    //checkText();
    console.log('textOK = ', textOK);
    submitEnabled();
  }

  formMark.onchange = function(){
    //markOK = checkMark();
    //checkMark();
    console.log('markOK = ', markOK);
    submitEnabled();
  }

  formName.oninput = function(){
    //nameOK = checkName();
    submitEnabled();
  }
})();

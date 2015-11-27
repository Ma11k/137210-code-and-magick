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
var formHintName = formHint.querySelector('.review-fields-name');
var formHintText = formHint.querySelector('.review-fields-text');

/**
 * @const минимальное кол-во валидных символов
 * @type {number}
 */
var MINUMUM = 3;

var nameOK = false;
var markOK = false;
var textOK = false;

/**
 * Проверяет поля и блокирует/разблокирует кнопку,
 * а также скрывает/показывает хинт
*/
function submitEnabled() {
  checkMark();
  checkText();
  checkName();
  if (nameOK && (markOK || textOK)) {
    formSubmit.disabled = false;
    formHint.style.display = 'none';
  } else {
    formSubmit.disabled = true;
    formHint.style.display = 'inline-block';
  }
}

/**
 * Проверяет текущее значение оценки
*/
function checkMark() {
  var arr = formMark.querySelectorAll('input');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].checked && i > 1) {
      markOK = true;
      break;
    } else {
      markOK = false;
    }
  }
}

/**
 * Проверяет валидность поля Имя
*/
function checkName() {
  if (formName.value.length >= MINUMUM) {
    nameOK = true;
    formHintName.classList.add('invisible')
  } else {
    nameOK = false;
    formHintName.classList.remove('invisible')
  }
}

/**
 * Проверяет валидность поля Текст
*/
function checkText() {
  if (formText.value.length >= MINUMUM) {
    textOK = true;
    if (markOK || textOK) {
      formHintText.classList.add('invisible')
    }
  } else {
    textOK = false;
    if (markOK) {
      formHintText.classList.add('invisible')
    } else {
      formHintText.classList.remove('invisible')
    }
  }
}

/**
 * Присваивает слушателей
*/
(function validation() {
  submitEnabled();
  formText.oninput = function() {
    submitEnabled();
  };
  formMark.onchange = function() {
    submitEnabled();
  };
  formName.oninput = function() {
    submitEnabled();
  };
})();

/*global getCookie, setCookie*/
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

/**
 * @const срок жизник куки по заданию
 * @type {number}
 */
var COOKIELIFE = Date.now() - Date.parse(1983, 5, 26);

var nameOK = false;
var markOK = false;
var textOK = false;
var markVal = MINUMUM;

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
    formHint.classList.add('invisible');
    setCookie('userMark', markVal, {expires: COOKIELIFE});
    setCookie('userName', formName.value, {expires: COOKIELIFE});
  } else {
    formSubmit.disabled = true;
    formHint.classList.remove('invisible');
  }
}

/**
 * Проверяет текущее значение оценки
*/
function checkMark() {
  var arr = Array.prototype.slice.call(formMark.querySelectorAll('input'));
  markOK = arr.some(function(item) {
    if (item.checked) {
      markVal = item.value;
    }
    return item.checked && item.value >= 3;
  });
}

/**
 * Проверяет валидность поля Имя
*/
function checkName() {
  if (formName.value.length >= MINUMUM) {
    nameOK = true;
    formHintName.classList.add('invisible');
  } else {
    nameOK = false;
    formHintName.classList.remove('invisible');
  }
}

/**
 * Проверяет валидность поля Текст
*/
function checkText() {
  if (formText.value.length >= MINUMUM) {
    textOK = true;
    if (markOK || textOK) {
      formHintText.classList.add('invisible');
    }
  } else {
    textOK = false;
    if (markOK) {
      formHintText.classList.add('invisible');
    } else {
      formHintText.classList.remove('invisible');
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

  formName.value = getCookie('userName') || '';
  if (getCookie('userMark')) {
    formMark.querySelector('#review-mark-' + getCookie('userMark')).checked = true;
  }
})();

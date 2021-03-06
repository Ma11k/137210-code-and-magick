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
 * @const {number}
 */
var MINUMUM = 3;

var markVal = MINUMUM;
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
    formHint.classList.add('invisible');
    var now = Date.now();
    var birthDay = new Date(+now);
    birthDay.setMonth(4);
    birthDay.setDate(26);
    if (now < birthDay.getTime()) {
      birthDay.setFullYear(birthDay.getFullYear() - 1);
    }
    var timeDelta = (now - birthDay.getTime()) / 1000; //т. к. cookies.js работает с сек.
    setCookie('userMark', markVal, {expires: timeDelta});
    setCookie('userName', formName.value, {expires: timeDelta});
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

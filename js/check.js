/**
 * Gives correct Russian plurals
 * @param {number} numbers How many
 * @param {Array.<string>} rusWords Three Russian conjugations of the needed word
 * @returns {string}
*/
function pluralizeRussian(numbers, rusWords) {
  var lastDigit = numbers % 10;
  var twoLastDigits = numbers % 100;
  if ((lastDigit > 0 && lastDigit < 2) && (twoLastDigits < 10 || twoLastDigits > 20)) {
    return rusWords[0];
  }
  if ((lastDigit > 1 && lastDigit < 5) && (twoLastDigits < 11 || twoLastDigits > 21)) {
    return rusWords[1];
  }
  if ((lastDigit > 4 && lastDigit < 11) || (twoLastDigits > 10 || twoLastDigits < 21)) {
    return rusWords[2];
  }
  throw new Error('Bad number');
}


/**
 * Outputs mage's message
 * @param {boolean|number|Object} a
 * @param {boolean|number|Object=} b
 * @returns {string}
 */
function getMessage(a, b) {
  if (a === true) {
    return 'Я попал в ' + b;
  }
  if (a === false) {
    return 'Я никуда не попал';
  }
  if (typeof a === 'number') {
    return 'Я прыгнул на ' + (a * 100) + ' ' + pluralizeRussian(a * 100, ['сантиметр', 'сантиметра', 'сантиметров']);
  }
  if (typeof a === 'object' && typeof b !== 'object') {
    var steps = 0;
    for (var i = 0; i < a.length; i++) {
      steps += a[i];
    }
    return 'Я прошёл ' + steps + ' ' + pluralizeRussian(steps, ['шаг', 'шага', 'шагов']);
  }
  if (typeof a === 'object' && typeof b === 'object') {
    var steps = 0;
    for (var i = 0; i < a.length; i++) {
      steps += a[i] * (b[i] || 0);
    }
    return 'Я прошёл ' + steps + ' ' + pluralizeRussian(steps, ['метр', 'метрa', 'метров']);
  }
}

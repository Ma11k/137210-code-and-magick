//Функция возвращает правильные русские склонения. Сам написал
function pluralizeRussian(numbers, rusWords) {
  var numLast = numbers.toString().slice(-1);
  var numTwoLastDigits = numTwoLastDigits % 100;
  if (numLast < 2 && (numTwoLastDigits < 10 || numTwoLastDigits > 20)) {
    return rusWords[0];
  }
  if ((numLast > 1 && numLast < 5) && (numTwoLastDigits < 11 || numTwoLastDigits > 21)) {
    return rusWords[1];
  }
  if ((numLast > 4 && numLast < 11) || (numTwoLastDigits > 10 || numTwoLastDigits < 21)) {
    return rusWords[2];
  }
}



function getMessage(a, b) {

  if (a === true) {
    return 'Я попал в ' + b;
  } else {
    return 'Я никуда не попал';
  }

  if (typeof a === 'number') {
    return 'Я прыгнул на ' + (a  * 100) + ' ' + pluralizeRussian(steps, ['сантиметр','сантиметра','сантиметров']);
  }

  if (typeof a === 'object' && typeof b != 'object') {
    var steps = 0;
    for (var i = 0; i < a.length; i++) {
      steps += a[i];
    }
    return 'Я прошёл ' + steps + ' ' + pluralizeRussian(steps, ['шаг','шага','шагов']);
  }

  if (typeof a === 'object' && typeof b === 'object') {
    var steps = 0;
    var arrLength = a.length;
    if (b.length > arrLength){
      arrLength = b.length;
    }
    for (var i = 0; i < arrLength; i++) {
      var aa = a[i] || 0;
      var bb = b[i] || 0;
      steps += aa + bb;
    }
    return 'Я прошёл ' + steps + ' ' + pluralizeRussian(steps, ['метр','метрa','метров']);
  }

}

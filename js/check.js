//Функция возвращает правильные русские склонения. Сам написал
function pluralize_russian(numbers, ruswords) {
  var numbers = numbers || 123;
  var ruswords = ruswords || ['шаг','шага','шагов'];

  var output;
  var numLast = numbers.toString().slice(-1);
  var numTwoLastDigits = Math.abs(numbers);
  if (numTwoLastDigits >= 100) {
    numTwoLastDigits = numTwoLastDigits.toString().slice(-2)
  };

  if ( numLast < 2 && ( numTwoLastDigits < 10 || numTwoLastDigits > 20 ) ) {
    output =  numbers + " " + ruswords[0];
  } else if ( ( numLast > 1 && numLast < 5 ) && ( numTwoLastDigits < 11 || numTwoLastDigits > 21 ) ) {
    output =  numbers + " " + ruswords[1];
  } else if ( ( numLast > 4 && numLast < 11 ) || ( numTwoLastDigits > 10 || numTwoLastDigits < 21 ) ) {
    output =  numbers + " " + ruswords[2];
  }
  return output;
}



function getMessage(a, b) {
  var output = '';

  if (typeof a === 'boolean') {
    if(a) {
      output = 'Я попал в ' + b;
    } else {
      output = 'Я никуда не попал';
    };
  } else if (typeof a === 'number') {
    output = 'Я прыгнул на ' + (a  * 100) + ' сантиметров';
  } else if (typeof a === 'object' && typeof b != 'object') {

    var steps = 0;
    for (var i = 0; i < a.length; i++) {
      steps += a[i];
    };
    output = 'Я прошёл ' + pluralize_russian(steps, ['шаг','шага','шагов']);

  } else if (typeof a === 'object' && typeof b === 'object') {
    var steps = 0;
    var arrlength = a.length;
    if (b.length > arrlength){
      arrlength = b.length;
    }
    for (var i = 0; i < arrlength; i++) {
      var aa = a[i] || 0;
      var bb = b[i] || 0;
      steps += aa + bb;
    };
    output = 'Я прошёл ' + pluralize_russian(steps, ['метр','метрa','метров']);

  }
  return output;

}

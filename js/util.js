'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var fragment = document.createDocumentFragment(); // создаем пустой фрагмент для вывода

  // функция выбора рендомного числа
  function getRandomInt(min, max) {
    min = Math.ceil(min); // округление в большую сторону
    max = Math.floor(max); // округление в меньшую сторону
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // функция выбора нескольких рендомных значений
  var createRandArrayMany = function (array) {
    var numberArray = getRandomInt(0, array.length); // выбор значений из массива от 0 до числа длины массива
    var newArray = []; // новый массив
    for (var i = 0; i < numberArray; i++) { // выбираем столько элементов, сколько отобралось рендомно
      newArray.push(array[i]); // складываем элементы в массив newArray
    }
    return newArray; // возвращаем наполненный массив newArray
  };

  // функция выбора одного рендомного значения
  var createRandArrayOne = function (array) {
    var newElement = getRandomInt(0, array.length); // выбираем 1 рендомное число от 0 до длины массива
    return newElement; // возвращаем выбранное рендомно число
  };

  window.util = {
    ENTER_KEY: ENTER_KEY,
    ESC_KEY: ESC_KEY,
    fragment: fragment,
    getRandomInt: getRandomInt,
    createRandArrayMany: createRandArrayMany,
    createRandArrayOne: createRandArrayOne
  };
})();

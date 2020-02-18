'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo']; // типы жилья
var CHECKIN = ['12:00', '13:00', '14:00']; // время заезда
var CHECKOUT = ['12:00', '13:00', '14:00']; // время выезда
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // удобства
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // фото жилья

// Получаем элементы с классом map
var MAPS = document.querySelector('.map'); // находим класс map
MAPS.classList.remove('map--faded'); // удаляем у map класс map--faded

// функция выбора рендомного числа
var intRand = function getRandomInt(min, max) {
  min = Math.ceil(min); // округление в большую сторону
  max = Math.floor(max); // округление в меньшую сторону
  return Math.floor(Math.random() * (max - min)) + min;
};

// функция выбора нескольких рендомных значений
var createRamdArrayMany = function (array) {
  var numberArray = intRand(0, array.length); // выбор значений из массива от 0 до числа длины массива
  var newArray = []; // новый массив
  for (var i = 0; i < numberArray; i++) { // выбираем столько элементов, сколько отоболось рендомно
    newArray.push(array[i]); // складываем элементы в массив newArray
  }
  return newArray; // возвращаем наполненный массив newArray
};

// функция выбора одного рендомного значения
var createRamdArrayOne = function (array) {
  var newElement = intRand(0, array.length); // выбираем 1 рендомное число от 0 до длины массива
  return newElement; // возвращаем выбранное рендомно число
};

var data = []; // создаем пустой массив

// создание 8-ми элементов
var createDataMoke = function () {
  for (var i = 0; i < 8; i++) {
    data.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок ' + i,
        address: '600, 350',
        price: 0,
        type: createRamdArrayOne(TYPE),
        rooms: 4,
        guests: 10,
        checkin: createRamdArrayOne(CHECKIN),
        checkout: createRamdArrayOne(CHECKOUT),
        features: createRamdArrayMany(FEATURES),
        description: 'Строка с описанием' + i,
        photos: createRamdArrayMany(PHOTOS)
      },
      location: {
        x: intRand(0, 1200),
        y: intRand(130, 630)
      }
    });
  }
  return data;
};

createDataMoke();

var pinElement = document.querySelector('.map__pins'); // находим класс в котором будут выводится точки на карте
var pinTamplate = document.querySelector('#pin').content; // находим id шаблона в верстке и получаем его содержимое
var fragment = document.createDocumentFragment(); // создаем пустой фрагмент

for (var i = 0; i < data.length; i++) {
  // заполняем аватарку
  var renderAvatar = function () {
    var pinBtnTamplate = pinTamplate.querySelector('button').cloneNode(true); // клонируем весь шаблон button
    pinTamplate.querySelector('.map__pin').style = 'left: ' + data[i].location.x + 'px; top: ' + data[i].location.y + 'px;'; // в шаблоне button находим атрибут style и задаем новое значение
    pinBtnTamplate.querySelector('img').src = data[i].author.avatar; // находим изображение аватарки и задаем значение атрибуту src
    pinBtnTamplate.querySelector('img').alt = data[i].offer.title; // находим изображения аватарки и задаем значение атрибуду alt

    return pinBtnTamplate;
  };

  renderAvatar();
  fragment.appendChild(renderAvatar(data)); // добавляем в фрагмент аватарку
  pinElement.appendChild(fragment); // выводим фрагмент в верстку
}


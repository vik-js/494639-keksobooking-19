'use strict';

// {
//   "author": {
//   "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
//       },
//   "offer": {
//   "title": строка, заголовок предложения
//   "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
//   "price": число, стоимость
//   "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
//   "rooms": число, количество комнат
//   "guests": число, количество гостей, которое можно разместить
//   "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
//   "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
//   "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
//   "description": строка с описанием,
//   "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
//   },

//   "location": {
//   "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
//   "y": случайное число, координата y метки на карте от 130 до 630.
//   }
// }
var type = ['palace', 'flat', 'house', 'bungalo'];
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var intRand = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var createRamdArrayMany = function (array) {
  var numberArray = intRand(0, array.length);
  var newArray = [];
  for (var i = 0; i < numberArray; i++) {
    newArray.push(array[i]);
  }
  return newArray;
};

var createRamdArrayOne = function (array) {
  var newElement = intRand(0, array.length);
  return newElement;
};


var createDataMoke = function () {
  var data = [];
  for (var i = 0; i < 8; i++) {

    data.push({
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: '600, 350',
        price: 0,
        type: createRamdArrayOne(type),
        rooms: 4,
        guests: 10,
        checkin: createRamdArrayOne(checkin),
        checkout: createRamdArrayOne(checkout),
        features: createRamdArrayMany(features),
        description: 'Строка с описанием',
        photos: createRamdArrayMany(photos)
      },
      location: {
        x: intRand(0, 1200);,
        y: intRand(130, 630);
      }
    });
  }
  return data;
};
var cwvwv = createDataMoke();
console.log(cwvwv);

// Получаем элементы с классом map
var map = document.querySelector('.map');
map.classList.remove('map--faded');

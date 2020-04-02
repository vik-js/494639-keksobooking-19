'use strict';

(function () {
  var TYPE = ['palace', 'flat', 'house', 'bungalo']; // типы жилья
  var CHECKIN = ['12:00', '13:00', '14:00']; // время заезда
  var CHECKOUT = ['12:00', '13:00', '14:00']; // время выезда
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']; // удобства
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']; // фото жилья

  // создание 8-ми элементов
  var createDataMoke = function () {
    var data = []; // создаем пустой массив
    for (var i = 0; i < 8; i++) {
      data.push({
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: 'Заголовок элемента ' + i,
          address: '600, 350',
          price: 1000,
          type: window.util.createRandArrayOne(TYPE),
          rooms: 4,
          guests: 10,
          checkin: window.util.createRandArrayOne(CHECKIN),
          checkout: window.util.createRandArrayOne(CHECKOUT),
          features: window.util.createRandArrayMany(FEATURES),
          description: 'Строка с описанием элемена ' + i,
          photos: window.util.createRandArrayMany(PHOTOS)
        },
        location: {
          x: window.util.getRandomInt(0, 1200),
          y: window.util.getRandomInt(130, 630)
        }
      });
    }
    return data;
  };
  window.data = {
    createDataMoke: createDataMoke(),
    CHECKIN: CHECKIN,
    CHECKOUT: CHECKOUT,
    PHOTOS: PHOTOS,
    TYPE: TYPE
  };
})();

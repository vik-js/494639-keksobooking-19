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
        type: createRandArrayOne(TYPE),
        rooms: 4,
        guests: 10,
        checkin: createRandArrayOne(CHECKIN),
        checkout: createRandArrayOne(CHECKOUT),
        features: createRandArrayMany(FEATURES),
        description: 'Строка с описанием элемена ' + i,
        photos: createRandArrayMany(PHOTOS)
      },
      location: {
        x: getRandomInt(0, 1200),
        y: getRandomInt(130, 630)
      }
    });
  }
  return data;
};

var pinElement = document.querySelector('.map__pins'); // находим класс в котором будут выводится точки на карте
var pinTemplate = document.querySelector('#pin').content; // находим id шаблона в верстке и получаем его содержимое

var fragment = document.createDocumentFragment(); // создаем пустой фрагмент для вывода

var renderAvatars = function (data) {
  for (var i = 0; i < data.length; i++) {
    // заполняем аватарку
    var renderAvatar = function () {
      var iconWidth = 50;
      var iconHeight = 70;
      var pinBtnTemplate = pinTemplate.querySelector('button').cloneNode(true); // клонируем весь шаблон button
      pinTemplate.querySelector('.map__pin').style = 'left: ' + (data[i].location.x + iconWidth / 2) + 'px; top: ' + (data[i].location.y + iconHeight) + 'px;'; // в шаблоне button находим атрибут style и задаем новое значение
      pinBtnTemplate.querySelector('img').src = data[i].author.avatar; // находим изображение аватарки и задаем значение атрибуту src
      pinBtnTemplate.querySelector('img').alt = data[i].offer.title; // находим изображения аватарки и задаем значение атрибуду alt
      return pinBtnTemplate;
    };

    fragment.appendChild(renderAvatar(data[i])); // добавляем в фрагмент аватарки
    pinElement.appendChild(fragment); // выводим фрагмент в верстку
  }
};

renderAvatars(createDataMoke());

var cardTemplate = document.querySelector('#card').content; // находим id шаблона объявления в верстке и получаем его содержимое

var renderCards = function (data) {
  // for (var i = 0; i < data.length; i++) { // вывод всех объявлений, пусть тут будет
  var renderCard = function () {
    var cardElementTemplate = cardTemplate.querySelector('article').cloneNode(true); // клонируем весь шаблон article
    var cardAvatarImg = cardElementTemplate.querySelector('.popup__avatar');
    var cardTitle = cardElementTemplate.querySelector('.popup__title');
    var cardType = cardElementTemplate.querySelector('.popup__type');
    var cardFeatures = cardElementTemplate.querySelector('.popup__features');
    var cardDescription = cardElementTemplate.querySelector('.popup__description');
    var cardAddress = cardElementTemplate.querySelector('.popup__text--address');
    var cardPrice = cardElementTemplate.querySelector('.popup__text--price');
    var cardCapacity = cardElementTemplate.querySelector('.popup__text--capacity');
    var cardАrrivalTime = cardElementTemplate.querySelector('.popup__text--time');
    var cardPhotos = cardElementTemplate.querySelector('.popup__photos');
    var cardPhotoImg = cardElementTemplate.querySelector('.popup__photo');
    // заполняем объявление
    cardAvatarImg.src = data[0].author.avatar; // аватарка
    cardTitle.textContent = data[0].offer.title; // заголовок
    cardType.textContent = TYPE[data[0].offer.type]; // тип жилья
    cardFeatures.textContent = data[0].offer.features; // удобства
    cardDescription.textContent = data[0].offer.description; // описание
    cardAddress.textContent = data[0].offer.address; // адрес
    cardPrice.textContent = data[0].offer.price + '₽/ночь'; // цена
    cardCapacity.textContent = data[0].offer.rooms + ' комнаты для ' + data[0].offer.guests + ' гостей'; // количество гостей и комнат
    cardАrrivalTime.textContent = 'Заезд после ' + CHECKIN[data[0].offer.checkin] + ', выезд до ' + CHECKOUT[data[0].offer.checkout]; // время заезда и выезда

    if (data[0].offer.photos.length !== 0) {
      cardPhotoImg.src = data[0].offer.photos[0]; // фотки
    } else {
      cardPhotos.style.display = 'none';
    }

    return cardElementTemplate;
  };

  fragment.appendChild(renderCard(data[0])); // добавляем в фрагмент объявления
  var addBefore = MAPS.querySelector('.map__filters-container'); // находим элемент, перед которым надо вывести объявления
  MAPS.insertBefore(fragment, addBefore); // выводим фрагменты в верстку
  // }
};
renderCards(createDataMoke());

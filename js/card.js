'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content; // находим id шаблона объявления в верстке и получаем его содержимое

  var renderCards = function (data) {
    for (var i = 0; i < data.length; i++) { // вывод всех объявлений, пусть тут будет
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
        var cardCloseBtn = cardElementTemplate.querySelector('.popup__close');
        // заполняем объявление
        cardAvatarImg.src = data[i].author.avatar; // аватарка
        cardTitle.textContent = data[i].offer.title; // заголовок
        cardType.textContent = window.data.TYPE[data[i].offer.type]; // тип жилья
        cardFeatures.textContent = data[i].offer.features; // удобства
        cardDescription.textContent = data[i].offer.description; // описание
        cardAddress.textContent = data[i].offer.address; // адрес
        cardPrice.textContent = data[i].offer.price + '₽/ночь'; // цена
        cardCapacity.textContent = data[i].offer.rooms + ' комнаты для ' + data[i].offer.guests + ' гостей'; // количество гостей и комнат
        cardАrrivalTime.textContent = 'Заезд после ' + window.data.CHECKIN[data[i].offer.checkin] + ', выезд до ' + window.data.CHECKOUT[data[i].offer.checkout]; // время заезда и выезда

        if (data[i].offer.photos.length !== 0) {
          for (var j = 0; j < data[i].offer.photos.length; j++) {
            cardPhotoImg.src = data[i].offer.photos[j]; // фотки
          }
        } else {
          cardPhotos.style.display = 'none';
        }

        return cardElementTemplate;

      };

      window.util.fragment.appendChild(renderCard(data[i])); // добавляем в фрагмент объявления
      var addBefore = window.map.MAPS.querySelector('.map__filters-container'); // находим элемент, перед которым надо вывести объявления
      window.map.MAPS.insertBefore(window.util.fragment, addBefore); // выводим фрагменты в верстку
    }

  };

  var pinElement = window.map.MAPS.querySelectorAll('.map__pin:not(.map__pin--main)'); // находим все метки с классом map__pin, кроме map__pin--main

  // активация карточки после нажатия левой кнопки мыши
  for (var k = 0; k < pinElement.length; k++) {
    // console.log(pinElement[k]);
    pinElement[k].addEventListener('mousedown', function (evt) {
      if (evt.which === 1) {
        renderCards(window.data.createDataMoke);
      }
    });
  }

  // активация карточки после нажатия клавиши Enter
  // pinElement.addEventListener('keydown', function (evt) {
  //   if (evt.key === window.util.ENTER_KEY) {
  //     renderCards(window.data.createDataMoke);

  //   }
  // });

  // var mapCardElement = window.map.MAPS.querySelector('.map__card');

  // закрыть карточку после клика левой кнопки мыши
  // cardCloseBtn.addEventListener('mousedown', function (evt) {
  //   if (evt.which === 1) {
  //     renderCards(window.data.createDataMoke) == null;
  //   }
  // });
  // закрыть карточку после нажатия клавиши ESC
  // cardCloseBtn.addEventListener('keydown', function (evt) {
  //   if (evt.key === window.util.ENTER_ESC) {
  //     renderCards(window.data.createDataMoke) == null;
  //   }
  // });

})();

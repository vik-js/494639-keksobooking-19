'use strict';

(function () {
  var pinElements = window.map.MAPS.querySelector('.map__pins'); // находим класс в котором будут выводится точки на карте
  var pinTemplate = document.querySelector('#pin').content; // находим id шаблона в верстке и получаем его содержимое

  var renderAvatars = function (data) {
    for (var i = 0; i < data.length; i++) {
      // заполняем аватарку
      var renderAvatar = function () {
        var iconWhidth = 50;
        var iconHeight = 70;
        var pinBtnTemplate = pinTemplate.querySelector('button').cloneNode(true); // клонируем весь шаблон button
        pinTemplate.querySelector('.map__pin').style = 'left: ' + (data[i].location.x + iconWhidth / 2) + 'px; top: ' + (data[i].location.y + iconHeight) + 'px;'; // в шаблоне button находим атрибут style и задаем новое значение
        pinBtnTemplate.querySelector('img').src = data[i].author.avatar; // находим изображение аватарки и задаем значение атрибуту src
        pinBtnTemplate.querySelector('img').alt = data[i].offer.title; // находим изображения аватарки и задаем значение атрибуду alt
        return pinBtnTemplate;
      };

      window.util.fragment.appendChild(renderAvatar(data[i])); // добавляем в фрагмент аватарки
      pinElements.appendChild(window.util.fragment); // выводим фрагмент в верстку
    }
  };

  renderAvatars(window.data.createDataMoke);

})();


'use strict';

(function () {
  var MAPS_WIDTH = 1200; // ширина поля карты
  var MAPS_HEIGHT = 750; // высота поля карты
  var MAIN_PIN_WIDTH = 62; // ширина основной метки
  var MAIN_PIN_HEIGHT = 84; // высота основной метки

  // Получаем элементы с классом map
  var MAPS = document.querySelector('.map'); // находим класс map
  var mainPin = MAPS.querySelector('.map__pin--main'); // находим метку с классом map__pin--main
  var mainPinX = MAPS_WIDTH / 2 - MAIN_PIN_WIDTH / 2; // находим положение основной метки по горизонтали с учетом ее ширины
  var mainPinY = MAPS_HEIGHT / 2; // находим положение основной метки по вертикали

  // активация карты
  var mapActivation = function () {
    MAPS.classList.remove('map--faded'); // удаляем у map класс map--faded
    window.form.noticeForm.classList.remove('ad-form--disabled'); // удаляем у формы класс ad-form--disabled
    for (var k = 0; k < window.form.formAllFieldset.length; k++) {
      window.form.formAllFieldset[k].removeAttribute('disabled');
    }
  };
  // активация карты после нажатия клавиши Enter
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      mapActivation();
    }
  });
  // активация карты после нажатия левой кнопки мыши и запись в поле адреса координат клика
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      mapActivation();
      window.form.formAddressInput.value = (evt.x - (MAIN_PIN_WIDTH / 2)) + ', ' + (evt.y + MAIN_PIN_HEIGHT);
    }
  });

  window.map = {
    MAPS: MAPS,
    mainPinX: mainPinX,
    mainPinY: mainPinY
  };
})();

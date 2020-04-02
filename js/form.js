'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form'); // находим форму с классом ad-form
  var formAvatarInput = noticeForm.querySelector('#avatar'); // input аватарка
  var formTitleInput = noticeForm.querySelector('#title'); // input заголовка объявления
  var formAddressInput = noticeForm.querySelector('#address'); // input адреса объявления
  var formTypeSelect = noticeForm.querySelector('#type'); // select тип жилья объявления
  var formPriceInput = noticeForm.querySelector('#price'); // input цена за ночь
  var formTimeInSelect = noticeForm.querySelector('#timein'); // select время заезда
  var formTimeOutSelect = noticeForm.querySelector('#timeout'); // select время выезда
  var formRoomSelect = noticeForm.querySelector('#room_number'); // select количества комнат
  var formCapacitySelect = noticeForm.querySelector('#capacity'); // select количества гостей
  var formPhotoInput = noticeForm.querySelector('#images'); // input фотографии жилья
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  formAvatarInput.setAttribute('accept', 'image/png, image/jpeg');
  formTitleInput.setAttribute('required', 'required');
  formTitleInput.setAttribute('minlength', MIN_TITLE_LENGTH);
  formTitleInput.setAttribute('maxlength', MAX_TITLE_LENGTH);
  formPriceInput.setAttribute('required', 'required');
  formPriceInput.setAttribute('type', 'number');
  formPriceInput.setAttribute('min', MIN_PRICE_FLAT); // устанавливаем минимальное значение для квартиры
  formPriceInput.setAttribute('max', MAX_PRICE);
  formPhotoInput.setAttribute('accept', 'image/png, image/jpeg');
  // находим поле с адресом и задаем ему значение положения основной метки после загрузки страницы
  formAddressInput.value = window.map.mainPinX + ', ' + window.map.mainPinY;
  formAddressInput.setAttribute('readonly', 'readonly');

  // находим все fieldset в форме .ad-form и добавляем им disabled
  var formAllFieldset = noticeForm.querySelectorAll('fieldset');
  for (var i = 0; i < formAllFieldset.length; i++) {
    formAllFieldset[i].setAttribute('disabled', 'disabled');
  }

  var inputMinPriceObject = {
    'bungalo': MIN_PRICE_BUNGALO,
    'flat': MIN_PRICE_FLAT,
    'house': MIN_PRICE_HOUSE,
    'palace': MIN_PRICE_PALACE
  };

  // выбор типа жилья
  formTypeSelect.addEventListener('change', function () {
    for (var j = 0; j < formTypeSelect.length; j++) {
      if (formTypeSelect.options[j].selected === true) {
        var itemTypeSelected = inputMinPriceObject[formTypeSelect.options[j].value];
        formPriceInput.placeholder = itemTypeSelected;
        formPriceInput.setAttribute('min', itemTypeSelected);
      }
    }
  });

  // выбор времени заезда
  formTimeInSelect.addEventListener('change', function () {
    formTimeOutSelect.value = formTimeInSelect.options[formTimeInSelect.selectedIndex].value;
  });
  // выбор времени выезда
  formTimeOutSelect.addEventListener('change', function () {
    formTimeInSelect.value = formTimeOutSelect.options[formTimeOutSelect.selectedIndex].value;
  });
  // выбор количества комнат/мест
  formRoomSelect.addEventListener('change', function () {
    if (formRoomSelect.options[formRoomSelect.selectedIndex].value === '100') {
      formCapacitySelect.value = 0;
    } else {
      formCapacitySelect.value = formRoomSelect.options[formRoomSelect.selectedIndex].value;
    }
  });

  var selectTypeObject = {
    '1 комната': ['для 1 гостя'],
    '2 комнаты': ['для 1 гостя', 'для 2 гостей'],
    '3 комнаты': ['для 1 гостя', 'для 2 гостей', 'для 3 гостей'],
    '100 комнат': ['не для гостей']
  };

  // ошибки при отправке формы
  function showError() {
    if (formTitleInput.validity.tooShort) {
      formTitleInput.setCustomValidity('Заголовок должен состоять минимум из ' + MIN_TITLE_LENGTH + ' символов');
    } else if (formTitleInput.validity.tooLong) {
      formTitleInput.setCustomValidity('Заголовок не должен превышать ' + MAX_TITLE_LENGTH + ' символов');
    } else if (formTitleInput.validity.valueMissing) {
      formTitleInput.setCustomValidity('Обязательно поле');
    } else {
      formTitleInput.setCustomValidity('');
    }
    // значение выбранного количесва комнат
    var roomSelectOptionValue = formRoomSelect.options[formRoomSelect.selectedIndex].text;

    if (selectTypeObject[roomSelectOptionValue]) {
      formCapacitySelect.setCustomValidity(selectTypeObject[roomSelectOptionValue]);
    } else {
      formCapacitySelect.setCustomValidity('');
    }
    // if (roomSelectOptionValue === '1 комната') {
    //   formCapacitySelect.setCustomValidity('1 комната только для 1 гостя');
    // } else if (roomSelectOptionValue === '2 комнаты') {
    //   formCapacitySelect.setCustomValidity('2 комнаты только для 1 или 2 гостей');
    // } else if (roomSelectOptionValue === '3 комнаты') {
    //   formCapacitySelect.setCustomValidity('3 комнаты только для 1, 2 или 3 гостей');
    // } else if (roomSelectOptionValue === '100 комнат') {
    //   formCapacitySelect.setCustomValidity('Не для гостей');
    // }
  }

  var formSubmitBtn = noticeForm.querySelector('.ad-form__submit'); // кнопка "Опубликовать"
  // Добавляем обработчик клика на кнопку отправки формы
  formSubmitBtn.addEventListener('click', function () {
    // evt.preventDefault();
    showError();
  });

  window.form = {
    noticeForm: noticeForm,
    formAddressInput: formAddressInput,
    formAllFieldset: formAllFieldset
  };
})();

'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };
  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    if (textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      imgUploadOverlay.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onPopupEscPress);
      uploadFile.value = '';
    }
  };
  uploadFile.addEventListener('change', function () {
    openPopup();
  });
  uploadFile.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });
  uploadCancel.addEventListener('click', function () {
    closePopup();
  });
  uploadCancel.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });
  textDescription.addEventListener('input', function () {
    var MAX_LENGTH = 140;
    var valueLength = textDescription.value.length;
    if (valueLength === MAX_LENGTH) {
      textDescription.setCustomValidity('Вы ввели максимальное количество символов');
    } if (valueLength > MAX_LENGTH) {
      textDescription.setCustomValidity('Удалите лишние ' + (valueLength - MAX_LENGTH) + ' симв.');
    } else {
      textDescription.setCustomValidity('');
    }
  });
  var checkTags = function () {
    var arrTags = textHashtags.value.split(' ');
    var uniqueTags = window.utils.unique(arrTags);
    var MIN_LENGTH = 2;
    var MAX_LENGTH = 20;
    var TAGS_AMOUNT = 5;
    var re = /^#[a-zа-яA-ZА-Я0-9]*$/;
    for (var j = 0; j < arrTags.length; j++) {
      for (var i = 0; i < arrTags.length; i++) {
        if (re.test(arrTags[i]) && arrTags.length <= TAGS_AMOUNT && arrTags[i].length >= MIN_LENGTH && arrTags[i].length <= MAX_LENGTH && arrTags.length === uniqueTags.length) {
          textHashtags.setCustomValidity('');
        }
      }
      for (i = 0; i < arrTags.length; i++) {
        if (arrTags.length > TAGS_AMOUNT) {
          textHashtags.setCustomValidity('Вы можете добавить не более 5 хэштэгов');
        }
      }
      for (i = 0; i < arrTags.length; i++) {
        if (arrTags[i].length < MIN_LENGTH) {
          textHashtags.setCustomValidity('Хэштэг должен содержать не менее 1 символа, начинаться с #');
        }
      }
      for (i = 0; i < arrTags.length; i++) {
        if (arrTags[i].length > MAX_LENGTH) {
          textHashtags.setCustomValidity('Хэштэг должен содержать не более 20 символов, включая #');
        }
      }
      for (i = 0; i < arrTags.length; i++) {
        if (arrTags.length !== uniqueTags.length) {
          textHashtags.setCustomValidity('Хэштэги не должны повторяться');
        }
      }
      for (i = 0; i < arrTags.length; i++) {
        if (!re.test(arrTags[i])) {
          textHashtags.setCustomValidity('Хэштэг должен содержать только буквы или цифры, начинаться с #. Пишите хэштэги через пробел.');
        }
      }
    }
  };
  textHashtags.addEventListener('input', checkTags);
})();



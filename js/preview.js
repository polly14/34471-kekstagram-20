'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };
  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    scaleControlValue.value = '100%';
    imgUploadPreview.style = '';
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

})();

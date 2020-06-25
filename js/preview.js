'use strict';
(function () {
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var defaultPreviewThumb = document.querySelector('.effects__radio[value="none"]');
  var uploadCancel = document.querySelector('#upload-cancel');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var form = document.querySelector('.img-upload__form');

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };
  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    scaleControlValue.value = '100%';
    imgUploadEffectLevel.classList.add('hidden');
  };

  var closePopup = function () {
    if (textHashtags !== document.activeElement && textDescription !== document.activeElement) {
      imgUploadOverlay.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
      document.removeEventListener('keydown', onPopupEscPress);
      uploadFile.value = '';
      textDescription.value = '';
      textHashtags.value = '';
      imgUploadPreview.style = '';
      imgUploadPreview.classList = '';
      defaultPreviewThumb.checked = true;
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

  form.addEventListener('submit', function (evt) {
    window.backend.sendForm(new FormData(form), function () {
      closePopup();
      window.messages.openSuccessMessage();
    }, function () {
      closePopup();
      window.messages.openErrorMessage();
    });
    evt.preventDefault();
  });

})();
